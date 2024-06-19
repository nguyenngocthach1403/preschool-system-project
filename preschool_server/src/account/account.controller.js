const express = require("express");

const accountService = require("./account.service");
const parentService = require("../parent/parent_service");
const { isEmpty } = require("../config/check.service");

const router = express.Router();

router.get("/", getAccont);

router.get("/total", getAccountTotal);

router.post("/create", createAccount);

router.put("/:username", updateAccountByUsername);

async function createAccount(req, res) {
  const data = req.body;

  //Kiểm tra username rỗng
  if (isEmpty(data.username)) {
    return res.status(200).json({
      success: false,
      message: `Tạo tài khoản thất bại do username bị bỏ trống`,
    });
  }
  //Kiểm tra tài khoản đã tồn tại chưa
  if (await accountService.isExistAccountByUsername(data.username)) {
    return res.status(200).json({
      success: false,
      message: `Tài khoản đã tồn tại với tên ${data.username}`,
    });
  }

  const result = await accountService.createAccount({
    username: data.username,
    password: data.password,
    phone: data.phone,
    email: data.email,
    status: data.status,
    role: data.role,
    created_by: data.created_by,
  });

  if (result.code) {
    return res.status(500).json({
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

  if (!isEmpty(data.parentId)) {
    if (await accountService.isExistAccountByUsername(data.username)) {
      const accountCreated = await accountService.getAccountByUsername(
        data.username
      );

      await parentService.updateParent(data.parentId, {
        account_id: accountCreated.id,
      });
    }
  }

  res.status(200).json({
    success: true,
    message: result.message,
  });
}
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

async function updateAccountByUsername(req, res) {
  const Username = req.params.username;
  // const newData = req.body;
  const { email, phone, status } = req.body;
  const result = await accountService.updateByUsername(Username, {
    email: email,
    phone: phone,
    status: status,
  });

  if (result.code) {
    return res.status(200).json({
      status: 400,
      message: result.message,
      error: result.code,
    });
  }

  res.status(200).json({
    status: 200,
    message: "Update successful.",
  });
}

module.exports = router;
