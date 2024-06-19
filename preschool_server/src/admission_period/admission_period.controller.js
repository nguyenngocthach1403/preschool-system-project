const express = require("express");

const addmissionService = require("./admission_period.service");

const router = express.Router();

router.get("/", getAddmissionPeriod);
router.get("/openning", getAddmissionPeriodOpenning);

async function getAddmissionPeriod(req, res) {
  const result = await addmissionService.getAddmissionPeriod();

  if (result.code) {
    return res.status(500).json({
      success: false,
      error: result.error,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Thành công",
    data: result,
  });
}

async function getAddmissionPeriodOpenning(req, res) {
  const result = await addmissionService.getAddmissionPeriodOpenning();

  if (result.code) {
    return res.status(500).json({
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

  return res.status(200).json({
    success: true,
    message: "Thành công",
    data: result.data,
  });
}

module.exports = router;
