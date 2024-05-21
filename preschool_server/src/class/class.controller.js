const express = require("express");

const router = express.Router();
const classService = require("./class.service");
router.get("/", getClass);

async function getClass(req, res) {
  const { limit, offset } = req.query;

  //   //Xác thực đầu vào từ người dùng request
  if (
    limit === undefined ||
    offset === undefined ||
    limit == "" ||
    offset == ""
  ) {
    return res.status(400).json({
      status: 400,
      error: "Invalid input: query must be has limit and page.",
    });
  }

  const result = await classService.getClass(limit, offset);

  if (result.code) {
    return res.status(500).json({
      status: 500,
      error: result.code,
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
