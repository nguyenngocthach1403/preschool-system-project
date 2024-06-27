const express = require("express");
const router = express.Router();
const certificateService = require("../certificate/certificate.service");

router.get("/", getCertificate);

async function getCertificate(req, res) {
  const result = await certificateService.getCertificate();

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
