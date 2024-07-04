const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/class" });
const fs = require("fs");
const router = express.Router();
//Sercvice
const classService = require("./class.service");
const studentService = require("../student/student.service");
const checkService = require("../config/check.service");
const teacherService = require("../teacher/teacher.service");
const managerRoleService = require("../class_manager_role/class_manager_role.service");
const config = require("../config/config");

//Router
router.get("/", getClass);
router.get("/search/in-comming", findOnGoingAndInCommingClass);
router.get("/search", findClass);
router.post("/add", upload.array("files"), createClass);
router.post("/update", upload.array("files"), updateClass);
router.get("/students/", getMembers);
router.post("/add-students", addStudentIntoClass);
router.get("/manager-roles", getManagerRoles);
router.get("/id", getClassById);
router.get("/add-management-position-for-class", updateClassManagerByClassId);

async function updateClassManagerByClassId(req, res) {
  const { classId, role, teacherId } = req.query;

  if (checkService.isEmpty(classId) || !checkService.isNumber(classId)) {
    return res.status(400).json({
      success: false,
      error: "ClassId is not valid",
    });
  }

  if (checkService.isEmpty(role) || !checkService.isNumber(role)) {
    return res.status(400).json({
      success: false,
      error: "Role is not valid",
    });
  }

  //Kiểm tra vai trò trong lớp có tồn tại
  const isExistRoles = await managerRoleService.isExistClassManagerRole(role);
  if (!isExistRoles) {
    return res.status(400).json({
      success: false,
      error: "Vị trí phân công không hợp lệ",
    });
  }

  //Kiểm tra lớp tồn tại
  const isExist = await classService.isExistClass(classId);

  if (!isExist) {
    return res.status(404).json({
      success: false,
      error: "Lớp học không tồn tại",
    });
  }

  //! Kiểm tra teacher có tồn tại không
  const isExistTeacher = await teacherService.isExistTeacherByID(teacherId);
  if (!isExistTeacher) {
    return res.status(404).json({
      success: false,
      error: "Giáo viên được phân công không tồn tại.",
    });
  }

  //Kiểm vị trí trong lớp đó đã tồn tại hay chưa
  const isExistRole = await classService.isExistManagementPosition(
    classId,
    role
  );
  if (isExistRole) {
    const resultUpdateMangerClass =
      await classService.updateClassManagerClassId(classId, role, teacherId);

    if (!resultUpdateMangerClass.success) {
      return res.status(400).json({
        success: false,
        error: resultUpdateMangerClass.error,
      });
    }

    res.status(200).json({
      success: true,
      error: resultUpdateMangerClass.message,
    });
  } else {
    const resultCreateMangerClass =
      await classService.createClassManagerByClassId({
        class_id: classId,
        teacher_id: teacherId,
        role: role,
      });

    if (!resultCreateMangerClass.success) {
      return res.status(400).json({
        success: false,
        error: resultCreateMangerClass.error,
      });
    }

    res.status(200).json({
      success: true,
      error: resultCreateMangerClass.message,
    });
  }
}

async function updateClass(req, res) {
  const { classId } = req.query;
  if (checkService.isEmpty(classId) || !checkService.isNumber(classId)) {
    return res.status(200).json({
      success: false,
      error: "Không tìm thấy lớp học!",
    });
  }
  //Valiable
  const {
    className,
    level,
    syllabus,
    startDate,
    endDate,
    limit,
    session,
    type,
    created_by,
  } = req.body;

  const data = {
    name: className,
    level_id: level,
    session: session,
    type: type,
    syllabus_id: syllabus,
    start_date: startDate,
    end_date: endDate,
    member_limit: limit || 30,
    created_by: created_by,
  };

  //Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    const url =
      config.baseUrl + "/image/class/" + req.files[0].filename + ".jpg";

    data.class_img = url;
  }

  const result = await classService.updateClass(classId, data);

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
    message: result.message,
  });
}

async function createClass(req, res) {
  //Valiable
  const {
    className,
    level,
    syllabus,
    startDate,
    endDate,
    limit,
    session,
    type,
    created_by,
  } = req.body;

  const data = {
    name: className,
    level_id: level,
    session: session,
    type: type,
    syllabus_id: syllabus,
    start_date: startDate,
    end_date: endDate,
    member_limit: limit || 30,
    created_by: created_by,
  };

  //Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    const url =
      config.baseUrl + "/image/class/" + req.files[0].filename + ".jpg";

    data.class_img = url;
  }

  const result = await classService.createClass(data);

  if (result.code) {
    return res.status(400).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    return res.status(200).json({
      success: false,
      message: result.message,
    });
  }

  res.status(200).json({
    success: true,
    message: result.message,
  });
}

async function addStudentIntoClass(req, res) {
  const { classID, accountID } = req.query;
  const students = req.body;

  if (checkService.isEmpty(classID) || !checkService.isNumber(classID)) {
    return res.status(400).json({
      success: false,
      error: "invalid Class_Id",
    });
  }

  if (students.length == undefined) {
    return res.status(400).json({
      success: false,
      error: "students must []",
    });
  }

  const studentEntered = [];

  for (const element of students) {
    try {
      const result = await classService.addStudentIntoClasses({
        class_id: classID,
        student_id: element.id,
        status: 0,
        created_by: accountID,
      });

      if (result.success) {
        console.log(element);
        studentEntered.push(element);
        await studentService.updateStudent(element.id, {
          class_id: classID,
          study_status: 1,
        });
      }
    } catch (error) {
      console.error(`Failed to process student with id ${element.id}:`, error);
    }
  }

  console.log(studentEntered);
  classService.updateClass(classID, { members: studentEntered.length });

  if (studentEntered.length == 0) {
    return res.status(400).json({
      success: false,
      error: "Không có học sinh vào được thêm vào",
    });
  }

  res.status(200).json({
    success: true,
    data: studentEntered,
  });
}

async function getManagerRoles(req, res) {
  const result = await classService.getClassManagerRoles();

  res.status(200).json({
    success: true,
    data: result || [],
  });
}

async function getMembers(req, res) {
  const class_id = req.query.classID;

  if (checkService.isEmpty(class_id) || !checkService.isNumber(class_id)) {
    return res.status(400).json({
      success: false,
      error: "invalid Class_Id",
    });
  }

  const result = await classService.getMembers(class_id);

  res.status(200).json({
    success: true,
    data: result,
  });
}

async function findOnGoingAndInCommingClass(req, res) {
  const { searchText, limit, offset } = req.query;

  if (checkService.isEmpty(limit) || checkService.isEmpty(offset)) {
    return res.status(500).json({
      status: 500,
      error: "Limit và offset không được phép để trống.",
    });
  }
  if (!checkService.isNumber(limit) || !checkService.isNumber(offset)) {
    return res.status(500).json({
      status: 500,
      error: "Limit và offset không đúng định dạng!",
    });
  }

  const count = await classService.countFindingUpcomingAndOngoingClasses(
    searchText
  );

  if (count.code) {
    return res.status(500).json({
      status: 500,
      error: count.error,
    });
  }

  if (!count.success) {
    return res.status(200).json({
      status: 400,
      message: count.message,
    });
  }

  const result = await classService.findUpcomingAndOngoingClasses(
    searchText,
    limit,
    offset
  );

  if (result.code) {
    return res.status(500).json({
      status: 500,
      error: result.error,
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Successfull",
    total: count.total,
    data: result,
  });
}

async function findClass(req, res) {
  const { searchText, session, status, limit, offset } = req.query;

  if (checkService.isEmpty(limit) || checkService.isEmpty(offset)) {
    return res.status(500).json({
      status: 500,
      error: "Limit và offset không được phép để trống.",
    });
  }
  if (!checkService.isNumber(limit) || !checkService.isNumber(offset)) {
    return res.status(500).json({
      status: 500,
      error: "Limit và offset không đúng định dạng!",
    });
  }

  if (checkService.isEmpty(session) && checkService.isEmpty(status)) {
    const count = await classService.countSearchClass(searchText, session);
    const result = await classService.searchClass(searchText, limit, offset);

    return res.status(200).json({
      success: true,
      total: count || 0,
      data: result || [],
    });
  }
  if (checkService.isEmpty(session)) {
    const count = await classService.countSearchClassWithStatus(
      searchText,
      status
    );

    const result = await classService.searchClassWithStatus(
      searchText,
      status,
      limit,
      offset
    );

    return res.status(200).json({
      status: 200,
      message: "Successfull",
      total: count || 0,
      data: result || [],
    });
  }

  if (checkService.isEmpty(status)) {
    const count = await classService.countSearchClassWithSession(
      searchText,
      session
    );

    const result = await classService.searchClassWithSession(
      searchText,
      session,
      limit,
      offset
    );

    return res.status(200).json({
      status: 200,
      message: "Successfull",
      total: count || 0,
      data: result || [],
    });
  }
  const count = await classService.countSearchClassWithStatusAndSession(
    searchText,
    status,
    session
  );

  const result = await classService.searchClassWithStatusAndSession(
    searchText,
    session,
    status,
    limit,
    offset
  );

  return res.status(200).json({
    status: 200,
    message: "Successfull",
    total: count || 0,
    data: result || [],
  });
}
async function getClass(req, res) {
  const { limit, offset } = req.query;
  if (
    limit === undefined ||
    offset === undefined ||
    limit == "" ||
    offset == ""
  ) {
    return res.status(400).json({
      status: 400,
      error: "Invalid input: query must be has limit and page.",
    });
  }
  const count = await classService.countTotalClass();
  const countClassStatus = await classService.countClassByStatus();
  const result = await classService.getClass(limit, offset);

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
    total: count || 0,
    total_status: countClassStatus || null,
    data: result,
  });
}
async function getClassById(req, res) {
  const { classId } = req.query;

  if (checkService.isEmpty(classId) || !checkService.isNumber(classId)) {
    return res.status(400).json({
      success: false,
      error: "Mã lớp không hợp lệ!",
    });
  }
  const isExist = await classService.isExistClass(classId);
  if (!isExist) {
    return res.status(404).json({
      success: false,
      error: "Lớp học không tồn tại.",
    });
  }

  const classs = await classService.getClassById(classId);

  if (!classs) {
    return res.status(400).json({
      success: false,
      error: "Đã xảy ra lỗi. Hãy thử lại.",
    });
  }

  return res.status(200).json({
    success: true,
    data: classs,
  });
}

module.exports = router;
