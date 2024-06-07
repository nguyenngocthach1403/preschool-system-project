const express = require("express");
const router = express.Router();
const relationshipService = require("./relationship.service");
const studentService = require("../student/student.service");
const parentService = require("../parent/parent_service");
const checkService = require("../config/check.service");
router.post("/add", createRelationship);

async function createRelationship(req, res) {
  const { studentId, parentId, relationship } = req.body;

  console.log(req.body);
  //Kiểm tra học sinh có tồn tạo không
  if (
    !(await studentService.isExistStudent(studentId)) ||
    !(await parentService.isExistParent(parentId))
  ) {
    return res.status(200).json({
      success: false,
      message: "Phụ huynh hoặc học sinh không tồn tại.",
    });
  }

  //Kiểm tra relationship
  if (checkService.isEmpty(relationship)) {
    return res.status(200).json({
      success: false,
      message: "Vui lòng nhập mối quan hệ.",
    });
  }

  //Kiểm tra mối quan hệ có tồn tại hay chưa
  if (
    await relationshipService.isExistRelationship(
      parentId,
      studentId,
      relationship
    )
  ) {
    return res.status(200).json({
      success: false,
      message: "Mối quan hệ đã tồn tại.",
    });
  }

  const result = await relationshipService.createRelationship({
    parentId: parentId,
    studentId: studentId,
    relationship: relationship,
  });

  if (result.code) {
    return res.status(500).json({
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

module.exports = router;
