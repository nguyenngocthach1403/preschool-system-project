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

  if (limit === undefined || page === undefined) {
    return res.status(400).json({
      error: "Invalid Input: Query must has limit and page",
    });
  }

  const result = await accountService.getAccount(limit, page * limit);

  // if (result !== Array || result.length === 0) {
  //   res.status(400).json({
  //     status: 400,
  //     message: "Dont has any here!",
  //   });
  // }
  res.status(200).json({
    status: 200,
    message: "Successful!",
    data: result,
  });
}

module.exports = router;
