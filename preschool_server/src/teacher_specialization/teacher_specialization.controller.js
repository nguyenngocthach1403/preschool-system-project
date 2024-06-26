const express = require("express");
const router = express.Router();
const teacherSpecializationService = require("../teacher_specialization/teacher_specialization.service");

router.post("/create", createTeacherSpecialization);

async function createTeacherSpecialization(req, res) {
  const { specialization_id, teacher_id } = req.body;

  const result = await teacherSpecializationService.createTeacherSpecialization(
    {
      specialization_id: specialization_id,
      teacher_id: teacher_id,
    }
  );
  if (result.code) {
    return res.status(500).json({
      status: 500,
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    return res.status(200).json({
      status: 400,
      success: false,
      error: result.message,
    });
  }
  res.status(200).json({
    status: 200,
    success: true,
    message: "Tạo thành công.",
  });
}

module.exports = router;
