const express = require("express");
const router = express.Router();
const specializationService = require("../specialization/specialization.service");

router.get("/", getSpecialization);

async function getSpecialization(req, res) {
  const result = await specializationService.getSpecialization();

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
