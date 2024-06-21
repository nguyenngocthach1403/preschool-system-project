const express = require("express");

const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/teacher" });
const fs = require("fs");
const teacherService = require("./teacher.service");
const checkService = require("../config/check.service");
const config = require("../config/config");
router.get("/", getTeacher);
router.get("/total", getTotalTeacher);
router.get("/search", getTeacherSearch);
router.post("/duplicate", isDuplicate);
router.post("/create", upload.array("files"), createTeacher);
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

  res.status(200).json({
    success: true,
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
  const { name, gender, birthday, phone, email, address, status, experience } =
    req.body;

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
    status: status,
    experience: experience,
    avatar: url || undefined,
  });

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
    message: "Tạo học sinh thành công.",
  });
}
module.exports = router;
