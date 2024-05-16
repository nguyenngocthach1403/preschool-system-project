const { parse } = require("dotenv");
const express = require("express");

const accountService = require("./account.service");

const router = express.Router();

router.get("/", getAccont);

router.get("/total", getAccountTotal);
async function getAccountTotal(req, res) {
  const result = await accountService.getAccountTotal();

  if (result.code) {
    return res.status(400).json({
      status: 404,
      message: result.message,
      error: result.code,
    });
  }
  res.status(200).json({
    status: 200,
    message: "Successful",
    total: result[0]["total"],
  });
}

async function getAccont(req, res) {
  const { limit, page } = req.query;

  if (limit === "undefined") {
    return res.status(200).json({
      status: 404,
      error: "Invalid Input: Query must has limit and page",
    });
  }
  if (!limit || !page) {
    return res.status(200).json({
      status: 404,
      error: "Invalid Input: Query must has limit and page",
    });
  }

  const result = await accountService.getAccount(limit, page * limit);

  if (result.code) {
    return res.status(200).json({
      status: 404,
      message: result.message,
    });
  }
  res.status(200).json({
    status: 200,
    message: "Successful!",
    data: result,
  });
}

module.exports = router;
