const express = require("express");

const router = express.Router();

const levelsService = require("../levels/levels.service");

router.get("/", getLevels);

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

module.exports = router;
