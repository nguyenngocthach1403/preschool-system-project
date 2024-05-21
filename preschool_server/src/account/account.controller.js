const express = require("express");

const accountService = require("./account.service");

const router = express.Router();

router.get("/", getAccont);

router.get("/total", getAccountTotal);

router.post("/create", createAccount);
async function createAccount(req, res) {
  const data = req.body;

  //Kiểm tra dữ liệu
  for (let index = 0; index < Object.keys(data).length; index++) {
    const key = Object.keys(data)[index];
    const value = Object.values(data)[index];
    if (
      ![
        "username",
        "password",
        "phone",
        "email",
        "role",
        "registrationId",
      ].includes(key)
    ) {
      return res.send({
        status: 404,
        error: `Invalid key '${key}' with value is '${data[key]}'`,
      });
    }

    if (typeof value === "string" && value === "") {
      return res.send({
        status: 404,
        error: `Invalid: key '${key}' isn't allowed empty`,
      });
    }
  }

  const result = await accountService.createAccount({
    username: data.username,
    password: data.password,
    phone: data.phone,
    email: data.email,
    role: data.role,
  });

  console.log(result);

  // if (Object.keys(result).includes("code")) {
  //   return res.status(200).json({
  //     status: 404,
  //     message: "Create failed!",
  //     error: result.message,
  //   });
  // }

  if (Object.keys(data).includes("registrationId")) {
    await accountService.updateRegistration(data.registrationId, data.username);
  }
  res.send({
    status: 200,
    message: "Create account successful.",
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

module.exports = router;
