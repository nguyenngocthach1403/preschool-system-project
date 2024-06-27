const express = require("express");
const router = express.Router();
const teacherCertificateService = require("../teacher_certificate/teacher_certificate.service");

router.post("/create", createTeacherCertificate);

async function createTeacherCertificate(req, res) {
  const { certificate_id, teacher_id } = req.body;

  const result = await teacherCertificateService.createTeacherCertificate({
    certificate_id: certificate_id,
    teacher_id: teacher_id,
  });
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
