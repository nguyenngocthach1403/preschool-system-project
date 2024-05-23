const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const db = require("../config/db");

const studentService = require("./student.service");
const parentService = require("../parent/parent_service");
const classService = require("../class/class.service");
const { error } = require("console");

router.get("/", getAll);
// router.get("/:id", getByID);
router.get("/total", getTotalStudent);

router.get("/search", getStudentSearch);

router.get("/delete", deleteStudent);

router.post("/create", upload.array("files"), createStudent);

router.post("/update/:id", upload.array("files"), updateStudent);

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
    parents,
    parentsRemove,
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

    var url = "http://localhost:9000/image/" + req.files[0].filename + ".jpg";
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

  if (parentsRemove !== undefined) {
    const parentToRemove = JSON.parse(parentsRemove);
    parentToRemove.forEach(async (element) => {
      const isExistRelationship = await studentService.isExistRelationship(
        id,
        element.id
      );
      if (isExistRelationship) {
        //Delete mối quan hệ
        const relationshipDeleted = await studentService.deleteRelationship(
          id,
          element.id
        );
        if (!relationshipDeleted) {
          return res.status(200).json({
            status: 500,
            error: "Xóa mối quan hệ thất bại.",
          });
        }
      }
    });
  }

  if (parents !== undefined) {
    const parentObj = JSON.parse(parents);

    //Kiểm tra mối quan hệ đã tồn tại
    parentObj.forEach(async (element) => {
      const isExistRelationship = await studentService.isExistRelationship(
        id,
        element.id
      );
      if (!isExistRelationship) {
        //Tạo mối quan hệ
        const relationshipCreated = await studentService.createRelatioship({
          parentId: element.id,
          studentId: id,
          relationship: element.relationship ?? 1,
        });

        if (relationshipCreated.code) {
          return res.status(500).json({
            status: 500,
            error: relationshipCreated.error,
          });
        }
        if (!relationshipCreated) {
          return res.status(200).json({
            status: 500,
            error: "Tạo mối quan hệ thất bại.",
          });
        }
      }
    });
  }

  const result = await studentService.updateStudent(id, {
    name: name,
    avatarPath: url,
    classID: classId,
    address: address,
    gender: gender,
    birthday: birthday,
    placeOfOrigin: placeOfOrigin,
    placeOfBirth: placeOfbirth,
    fork: fork,
    nation: nation,
  });

  if (result.code) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/none");
    }
    return res.status(500).json({
      status: 500,
      error: result.error,
    });
  }
  if (!result) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/none");
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
    classId: classId,
    nation: nation,
    placeOfBirth: placeOfBirth,
    fork: fork,
    address: address,
    placeOfOrigin: placeOfOrigin,
    status: status,
  };

  //Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    const url = "http://localhost:9000/image/" + req.files[0].filename + ".jpg";

    data.avatarPath = url;
  }

  //Tạo học sinh
  const result = await studentService.createNewStudent(data);

  if (result.code) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/none");
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

    console.log(parent);

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

    console.log(relationship);
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

  console.log(text, page, limit);

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

  console.log(result);

  return res.status(200).json({
    status: 200,
    message: "Successful",
    data: result,
  });
}

function getByID(req, res, next) {
  console.log(req.params.id);
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
