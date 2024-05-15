const express = require("express");

const registationService = require("./registration.service");

const router = express.Router();

router.get("/total", getTotalRegistration);

router.get("/", getRegistration);

async function getTotalRegistration(req, res) {
  const resultTotal = await registationService.getTotalRegistration();
  res.send(
    JSON.stringify({
      status: 200,
      message: "Successful",
      total: resultTotal[0]["total"],
    })
  );
}

async function getRegistration(req, res) {
  const { limit, page } = req.query;

  //   //Xác thực đầu vào từ người dùng request
  if (limit === undefined && page === undefined) {
    return res.status(400).json({
      status: 400,
      error: "Invalid input: query must be has limit and page.",
    });
  }

  const result = await registationService.getRegistrations(0, 20);
  if (result.code) {
    res.status(500).json({
      status: 500,
      code: result.code,
      message: result.message,
    });
  }
  res.status(200).json({
    status: 200,
    message: "Successful",
    data: result,
  });
}

module.exports = router;
