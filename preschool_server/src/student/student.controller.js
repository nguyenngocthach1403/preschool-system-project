const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/students" });
const fs = require("fs");

const studentService = require("./student.service");
const parentService = require("../parent/parent_service");
const classService = require("../class/class.service");

const { error } = require("console");
const config = require("../config/config");

router.get("/", getAll);
// router.get("/:id", getByID);
router.get("/total", getTotalStudent);

router.get("/search", getStudentSearch);

router.get("/delete", deleteStudent);

router.post("/create", upload.array("files"), createStudent);

router.get("/:id", getStudentById);

router.post("/update/:id", upload.array("files"), updateStudent);

async function getStudentById(req, res) {
  const id = req.params.id;

  const isExist = await studentService.isExistStudent(id);

  if (!isExist) {
    return res.status(200).json({
      success: false,
      message: "Không tìm thấy học sinh.",
    });
  }

  const result = await studentService.getStudentByID(id);

  if (result.code) {
    return res.status(200).json({
      success: false,
      message: result.message,
      error: result.error,
    });
  }

  res.status(200).json({
    success: true,
    message: "Thành công.",
    data: result[0],
  });
}
async function updateStudent(req, res) {
  const id = req.params.id;

  //Kiểm tra học sinh có tồn tại không.
  const isExitsStudent = await studentService.isExistStudent(id);

  if (!isExitsStudent) {
    return res.status(500).json({
      status: 500,
      error: "Học sinh không tồn tại.",
    });
  }

  const {
    name,
    classId,
    gender,
    birthday,
    placeOfOrigin,
    fork,
    nation,
    address,
    placeOfbirth,
    status,
  } = req.body;

  //Kiểm tra tên
  if (gender != undefined) {
    if (gender == "" || (gender != "0" && gender != "1")) {
      return res.status(500).json({
        status: 500,
        error: "Sai định dạng dữ liệu giới tính.",
      });
    }
  }

  if (status !== undefined) {
    if (
      status == "" ||
      (status != "0" && status != "1" && status != "2" && status != "3")
    ) {
      return res.status(500).json({
        status: 500,
        error: "Sai định dạng dữ liệu trạng thái.",
      });
    }
  }

  if (birthday !== undefined) {
    if (birthday == "") {
      return res.status(500).json({
        status: 500,
        error: "Sai định dạng dữ liệu ngày sinh.",
      });
    }
  }

  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    var url =
      config.baseUrl + "/image/students/" + req.files[0].filename + ".jpg";
  }
  if (classId !== undefined) {
    const isExistClass = await classService.isExistClass(classId);

    if (!isExistClass) {
      return res.status(500).json({
        status: 500,
        error: "Mã lớp không tồn tại",
      });
    }
  }

  const result = await studentService.updateStudent(id, {
    name: name,
    avatar: url,
    class_id: classId,
    address: address,
    gender: gender,
    birthday: birthday,
    place_of_origin: placeOfOrigin,
    place_Of_birth: placeOfbirth,
    fork: fork,
    nation: nation,
  });

  if (result.code) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/students/none");
    }
    return res.status(500).json({
      status: 500,
      error: result.error,
    });
  }
  if (!result) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/students/none");
    }
    return res.status(500).json({
      status: 500,
      error: "Cập nhật không thành công.",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Cập nhật thành công.",
  });
}

async function createStudent(req, res) {
  //Lấy dữ liệu từ form
  const {
    name,
    gender,
    birthday,
    classId,
    nation,
    placeOfBirth,
    fork,
    parentId,
    address,
    placeOfOrigin,
    status,
  } = req.body;

  //Kiểm tra tên
  if (name == undefined || name == "") {
    return res.status(200).json({
      status: 500,
      error: "Lỗi: Tên không được phép để trống.",
    });
  }

  //Tạo map để tạo học sinh
  const data = {
    name: name,
    gender: gender,
    birthday: birthday,
    class_id: classId,
    nation: nation,
    place_of_birth: placeOfBirth,
    fork: fork,
    address: address,
    place_of_origin: placeOfOrigin,
    status: status,
  };

  //Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    const url =
      config.baseUrl + "/image/students" + req.files[0].filename + ".jpg";

    data.avatar = url;
  }

  //Tạo học sinh
  const result = await studentService.createNewStudent(data);

  if (result.code) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/students/none");
    }
    return res.status(200).json({
      status: 404,
      error: result.message,
    });
  }

  //Kiểm tra thêm thành công
  if (!result) {
    return res.status(200).json({
      status: 500,
      error: "Lỗi khi đăng thêm dữ liệu.",
      message: "Tạo học sinh không thành công.",
    });
  }

  //Kiểm tra nếu người dùng có nhập phụ huynh
  if (parentId !== undefined) {
    //Lấy thông tin phụ huynh
    const parent = await parentService.getParentById(parentId);

    if (parent.code) {
      return res.status(200).json({
        status: 500,
        error: "Phụ huynh không tồn tại.",
      });
    }

    //Kiểm tra phụ huynh có tồn tại
    if (parent.length == 0) {
      return res.status(200).json({
        status: 500,
        error: "Phụ huynh không tồn tại.",
        message: "Chưa có phụ huynh trong hệ thống",
      });
    }

    //Tạo dữ liệu bảng relationship
    const relationship = {
      studentId: result.studentCreated,
      parentId: parent[0].id,
      relationship: parent[0].role,
    };

    const relationshipCreated = await studentService.createRelatioship(
      relationship
    );

    if (!relationshipCreated) {
      return res.status(200).json({
        status: 500,
        error: "Tạo Relationship thất bại",
      });
    }
  }

  res.status(200).json({
    status: 200,
    message: "Tạo học sinh thành công.",
  });
}

async function deleteStudent(req, res, next) {
  if (req.query.id === undefined) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Resouse not found",
      })
    );
    return;
  }

  const result = await studentService.deleteStudent(req.query.id);

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

async function getStudentSearch(req, res, next) {
  const { text, page, limit } = req.query;

  if (text == undefined || page == undefined || limit == undefined) {
    return res.status(200).json({
      status: 500,
      error: "Invalid: Value is undefined",
    });
  }

  if (page == "" || limit == "") {
    return res.status(200).json({
      status: 500,
      error: "Invalid: Value is empty",
    });
  }

  const totalResult = await studentService.countSearchStudent(req.query.text);
  if (totalResult[0]["total"] == 0) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Not found any student",
      })
    );
    return;
  }

  const resultStudentSearch = await studentService.searchStudent(
    req.query.text,
    req.query.page,
    req.query.limit
  );

  res.send({
    status: 200,
    message: "Successful",
    total: totalResult[0]["total"],
    data: resultStudentSearch,
  });
}

async function getTotalStudent(req, res, next) {
  console.log(" * Get total student in database");

  const countStudent = await studentService.countStudent();

  res.send(
    JSON.stringify({
      status: 200,
      message: "Successful",
      data: countStudent[0]["total"],
    })
  );
}

async function getAll(req, res, next) {
  const { limit, page } = req.query;
  if (limit === undefined || page === undefined) {
    return res.status(400).json({
      status: 400,
      error: "Invalid input: Querry must has limit and page",
    });
  }

  const result = await studentService.getStudent(page, limit);

  if (result.code) {
    return res.status(500).json({
      status: 500,
      code: result.code,
      error: result.message,
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Successful",
    data: result,
  });
}

function getByID(req, res, next) {
  studentService
    .getByID(req.params.id)
    .then((result) => res.send(result))
    .catch(next);
}

function getByPage(req, res, next) {
  studentService
    .getByID(req.params.id)
    .then((result) => res.send(result))
    .catch(next);
}

module.exports = router;
