const express = require("express");

const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/teacher" });
const fs = require("fs");
const accountService = require("../account/account.service");
const teacherService = require("./teacher.service");
const teacherSpecializationService = require("../teacher_specialization/teacher_specialization.service");
const checkService = require("../config/check.service");
const config = require("../config/config");
router.get("/", getTeacher);
router.get("/get/id/:id", getTeacherById);
router.get("/total", getTotalTeacher);
router.get("/search", getTeacherSearch);
router.post("/duplicate", isDuplicate);
router.post("/create", upload.array("files"), createTeacher);
router.post("/update/:id", upload.array("files"), updateTeacher);
router.get("/add/account/:id", addAccountForTeacher);
router.get("/delete", deleteTeacher);
router.get("/get/classCurrent/:id", getClassCurrent);
router.get("/get/classHistory/:id", getClassHistory);
async function getTeacher(req, res) {
  const { limit, offset } = req.query;

  if (checkService.isEmpty(limit) || checkService.isEmpty(offset)) {
    return res.status(400).json({
      success: false,
      error: "Vui lòng nhập limit và offset",
    });
  }

  if (!checkService.isNumber(limit) || !checkService.isNumber(offset)) {
    return res.status(400).json({
      success: false,
      error: "Limit và Offset không phải là số.",
    });
  }

  const result = await teacherService.getTeacher(limit, offset);

  if (result.code) {
    return res.status(400).json({
      success: false,
      error: result.error,
    });
  }

  for (let index = 0; index < result.length; index++) {
    const element = result[index];
    const classManaged = await teacherService.getClassManagedByTeacher(
      element.id
    );
    element.class_managed = classManaged.code ? [] : classManaged;
  }
  for (let index = 0; index < result.length; index++) {
    const element = result[index];
    const specialization = await teacherService.getSpecializationByTeacher(
      element.id
    );
    element.specialization_managed = specialization.code ? [] : specialization;
  }
  for (let index = 0; index < result.length; index++) {
    const element = result[index];
    const certificate = await teacherService.getCertificateByTeacher(
      element.id
    );
    element.certificate_managed = certificate.code ? [] : certificate;
  }

  res.status(200).json({
    success: true,
    data: result,
  });
}
async function getTeacherById(req, res) {
  const id = req.params.id;

  const isExistTeacher = await teacherService.isExistTeacher(id);

  if (!isExistTeacher)
    return res.status(200).json({
      success: false,
      message: "Giáo viên không tồn tại.",
    });

  const result = await teacherService.getByID(id);

  if (result.code) {
    return res.status(200).json({
      success: false,
      error: result.error,
    });
  }

  if (result.length == 0) {
    return res.status(200).json({
      success: false,
      error: "Không tìm thấy giáo viên",
    });
  }

  res.status(200).json({
    success: true,
    message: "Succesful.",
    data: result,
  });
}
async function getTotalTeacher(req, res, next) {
  console.log("Get total teacher in database");

  const countTeacher = await teacherService.countTeacher();

  res.send(
    JSON.stringify({
      status: 200,
      message: "Successful",
      data: countTeacher[0]["total"],
    })
  );
}
async function getTeacherSearch(req, res, next) {
  const totalResult = await teacherService.countSearchTeacher(req.query.text);
  if (totalResult[0]["total"] == 0) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Not found any teacher",
      })
    );
    return;
  }
  const resultTeacherSearch = await teacherService.searchTeacher(
    req.query.text,
    req.query.page,
    req.query.limit
  );
  res.send({
    status: 200,
    message: "Successful",
    total: totalResult[0]["total"],
    data: resultTeacherSearch,
  });
}

async function isDuplicate(req, res, next) {
  try {
    const { email, phone } = req.body;
    const duplicateTeacher = await teacherService.isDuplicate(email, phone);
    if (duplicateTeacher) {
      res.json({
        status: 400,
        message: "Email or phone or account already exists.",
      });
    } else {
      res.json({
        status: 200,
        message: "Email, phone and account are unique.",
      });
    }
  } catch (error) {
    next(error);
  }
}
async function createTeacher(req, res, next) {
  const {
    name,
    gender,
    birthday,
    phone,
    email,
    address,
    status,
    experience,
    seniority,
    spec,
    cer,
  } = req.body;

  //Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    var url =
      config.baseUrl + "/image/teacher/" + req.files[0].filename + ".jpg";
  }

  const duplicateTeacher = await teacherService.isDuplicate(email, phone);
  if (duplicateTeacher) {
    return res.status(200).json({
      status: 400,
      success: false,
      message: "Email hoặc số điện thoại đã tồn tại.",
    });
  }

  const result = await teacherService.createTeacher({
    name: name,
    gender: gender,
    birthday: birthday,
    phone: phone,
    email: email,
    address: address,
    status: 1,
    experience: experience,
    seniority: seniority,
    avatar: url || undefined,
  });
  const teacherId = result.data.insertId;
  // console.log(result.data.insertId);
  // console.log(spec);
  const specializationIds = Array.isArray(spec) ? spec : [spec];
  for (const specializationId of specializationIds) {
    const specializationResult =
      await teacherService.createTeacherSpecialization({
        specialization_id: specializationId,
        teacher_id: teacherId,
      });
    if (!specializationResult.success) {
      return res.status(500).json({
        success: false,
        error:
          specializationResult.error ||
          "Lỗi khi thêm dữ liệu chuyên môn của giáo viên.",
      });
    }
  }
  const CertificateIds = Array.isArray(cer) ? cer : [cer];
  for (const certificateId of CertificateIds) {
    const certificateResult = await teacherService.createTeacherCertificate({
      certificate_id: certificateId,
      teacher_id: teacherId,
    });
    if (!certificateResult.success) {
      return res.status(500).json({
        success: false,
        error: certificateResult.error || "Lỗi khi thêm dữ lieu.",
      });
    }
  }
  if (result.code) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/teacher/none");
    }
    return res.status(500).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/teacher/none");
    }
    return res.status(200).json({
      success: false,
      error: result.message,
    });
  }
  res.status(200).json({
    status: 200,
    success: true,
    message: "Tạo giáo viên thành công.",
  });
}
async function addAccountForTeacher(req, res) {
  const id = req.params.id;
  const username = req.query.username;

  //Kiểm tra giao vien có tồn tại hay chưa
  if (!(await teacherService.isExistTeacher(id))) {
    return res.status(200).json({
      success: false,
      message: "Giáo viên không tồn tại.",
    });
  }

  //Kiểm tra account có tồn tại hay không
  if (!(await accountService.isExistAccountByUsername(username))) {
    return res.status(200).json({
      success: false,
      message: "Tài khoản chưa tồn tại.",
    });
  }

  //Lấy account id
  const accountId = await accountService.getAccountByUsername(username);

  const result = await teacherService.updateTeacher(id, {
    account_id: accountId !== undefined ? accountId.id : undefined,
  });

  if (result.code) {
    return res.status(200).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    return res.status(200).json({
      success: false,
      error: result.message,
    });
  }

  res.status(200).json({
    success: true,
    error: result.message,
  });
}
async function updateTeacher(req, res) {
  const teacherId = req.params.id;

  const {
    name,
    gender,
    birthday,
    phone,
    email,
    address,
    status,
    experience,
    username,
    seniority,
  } = req.body;

  //Kiểm tra có giáo viên hay chưa.
  const isExistTeacher = await teacherService.isExistTeacher(teacherId);

  //Nếu kho tồn tại => out
  if (!isExistTeacher) {
    return res.status(200).json({
      success: false,
      message: "Không tìm thấy giáo viên.",
    });
  }

  //Giáo viên có tồn tại
  //Kiểm tra dữ liệu
  // => Nếu người dùng có sửa đổi tài khoản => Kiểm tra tồn tại của tài khoản
  if (!checkService.isEmpty(username)) {
    //Kiểm tra nếu có
    if (await accountService.isExistAccountByUsername(username)) {
      //Lấy account
      var account = await accountService.getAccountByUsername(username);
    } else {
      return res.status(200).json({
        success: false,
        message: "Tài khoản không tồn tại.",
      });
    }
  }

  //Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    var url =
      config.baseUrl + "/image/teacher/" + req.files[0].filename + ".jpg";
  }

  //Cập nhật giáo viên
  const result = await teacherService.updateTeacher(teacherId, {
    name: name,
    gender: gender,
    birthday: birthday,
    phone: phone,
    email: email,
    experience: experience,
    address: address,
    status: status,
    seniority: seniority,
    account_id: account != undefined ? account.id : undefined,
    avatar: url || undefined,
  });

  if (result.code) {
    return res.status(200).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    return res.status(200).json({
      success: false,
      error: result.message,
    });
  }

  res.status(200).json({
    success: true,
    error: result.message,
  });
}
async function deleteTeacher(req, res, next) {
  if (req.query.id === undefined) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Resouse not found",
      })
    );
    return;
  }

  const result = await teacherService.deleteTeacher(req.query.id);

  if (result === 0) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Resouse not found",
      })
    );
  } else {
    res.send(
      JSON.stringify({
        status: 200,
        message: "Resouse delete Successful",
      })
    );
  }
}
async function getClassCurrent(req, res) {
  const id = req.params.id;
  const result = await teacherService.getClassCurrent(id);
  // console.log(result);
  if (result.code) {
    return res.status(500).json({
      status: 500,
      error: result.code,
      message: result.message,
    });
  }
  res.status(200).json({
    status: 200,
    message: "Successful",
    data: result,
  });
}
async function getClassHistory(req, res) {
  const id = req.params.id;
  const result = await teacherService.getClassHistory(id);
  if (result.code) {
    return res.status(500).json({
      status: 500,
      error: result.code,
      message: result.message,
    });
  }
  res.status(200).json({
    status: 200,
    message: "Successful",
    data: result,
  });
}
module.exports = router;
