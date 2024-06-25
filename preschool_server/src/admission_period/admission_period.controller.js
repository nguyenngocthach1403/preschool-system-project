const express = require("express");

const addmissionService = require("./admission_period.service");

const checkService = require("../config/check.service");

const accountService = require("../account/account.service");

const router = express.Router();

router.get("/", getAddmissionPeriod);
router.get("/openning", getAddmissionPeriodOpenning);
router.post("/add", createAdmissionPeriod);

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

async function createAdmissionPeriod(req, res) {
  const dataToCreate = req.body;

  if (checkService.isEmpty(dataToCreate.accountId)) {
    return res.status(200).json({
      success: false,
      error: "accountId is Empty",
    });
  }
  if (!checkService.isNumber(dataToCreate.accountId)) {
    return res.status(200).json({
      success: false,
      error: "accountId is not a number",
    });
  }

  const checkAccount = await accountService.getAccountById(
    dataToCreate.accountId
  );

  if (checkAccount == undefined) {
    return res.status(200).json({
      success: false,
      error: "accountId không tồn tại.",
    });
  }

  const result = await addmissionService.createAdmissionPeriod({
    name: dataToCreate.name,
    start_date: dataToCreate.startDate,
    end_date: dataToCreate.endDate,
    created_by: dataToCreate.accountId,
    openning: dataToCreate.status,
  });

  if (result.code) {
    return res.status(200).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    return res.status(200).json({
      success: false,
      error: result.message,
    });
  }

  res.status(200).json({
    success: true,
    data: result.data,
  });
}

module.exports = router;
