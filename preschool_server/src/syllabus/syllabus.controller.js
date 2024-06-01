const express = require("express");

const router = express.Router();

const syllabusService = require("../syllabus/syllabus.service");

router.get("/", getSyllabus);

async function getSyllabus(req, res) {
  const result = await syllabusService.getSyllabus();

  if (result.code) {
    return res.status(200).json({
      success: false,
      error: result.error,
    });
  }

  res.status(200).json({
    success: true,
    data: result,
  });
}

module.exports = router;
