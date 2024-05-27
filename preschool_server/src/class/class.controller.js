const express = require("express");

const router = express.Router();
const classService = require("./class.service");
router.get("/", getClass);
router.get("/search", findClass);

async function findClass(req, res) {
  const { searchText, limit, offset } = req.query;

  if (limit == undefined || offset == undefined) {
    return res.status(500).json({
      status: 500,
      error: "Limit và offset không được phép để trống.",
    });
  }

  const count = await classService.countFindingUpcomingAndOngoingClasses(
    searchText
  );

  if (count.code) {
    return res.status(500).json({
      status: 500,
      error: count.error,
    });
  }

  if (!count.success) {
    return res.status(200).json({
      status: 400,
      message: count.message,
    });
  }

  const result = await classService.findUpcomingAndOngoingClasses(
    searchText,
    limit,
    offset
  );

  if (result.code) {
    return res.status(500).json({
      status: 500,
      error: result.error,
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Successfull",
    total: count.total,
    data: result,
  });
}
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
