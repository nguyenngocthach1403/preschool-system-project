const express = require("express");

const checkService = require("../config/check.service");

const router = express.Router();

const levelsService = require("../levels/levels.service");

const admissionService = require("../enrollment_sessions/enrollment_sessions.service");

const registrationService = require("../registrations/registration.service");

router.get("/", getLevels);
router.get("/admission/total/syllabus", getTotalOfSyllabusByAdmission);

async function getLevels(req, res) {
  const result = await levelsService.getLevels();

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

async function getTotalOfSyllabusByAdmission(req, res) {
  const { admission_period_id, level_id } = req.query;

  if (
    checkService.isEmpty(admission_period_id) ||
    checkService.isEmpty(level_id) ||
    !checkService.isNumber(admission_period_id) ||
    !checkService.isNumber(level_id)
  ) {
    return res.status(400).json({
      success: false,
      error: "admission_period_id và level_id không đúng định dạng",
    });
  }

  const isExistAdmission = await admissionService.isExistAdmission(
    admission_period_id
  );

  if (!isExistAdmission) {
    return res.status(404).json({
      success: false,
      error: "Đợt tuyển sinh không tồn tại.",
    });
  }

  const isExistLevel = await levelsService.isExistLevel(level_id);

  if (!isExistLevel) {
    return res.status(404).json({
      success: false,
      error: "Cấp bậc không tồn tại.",
    });
  }

  const result = await registrationService.countSyllabusOfLevelByAdmission(
    admission_period_id,
    level_id
  );

  if (result.code) {
    return res.status(400).json({
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
