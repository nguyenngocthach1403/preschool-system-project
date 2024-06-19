const express = require("express");

const router = express.Router();

const teacherService = require("./teacher.service");
const checkService = require("../config/check.service");

router.get("/", getTeacher);
router.get("/total", getTotalTeacher);
router.get("/search", getTeacherSearch);

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
module.exports = router;
