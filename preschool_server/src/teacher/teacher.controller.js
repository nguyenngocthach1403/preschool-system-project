const express = require("express");

const router = express.Router();

const teacherService = require("./teacher.service");
const checkService = require("../config/check.service");

router.get("/", getTeacher);

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

module.exports = router;
