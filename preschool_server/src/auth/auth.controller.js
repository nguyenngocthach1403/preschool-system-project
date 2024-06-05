const express = require("express");
const router = express.Router();

const authService = require("./auth.service");

module.exports = router;

router.post("/", login);

router.get("/isExist/:username", isExistUser);

async function isExistUser(req, res) {
  const username = req.params.username;

  const result = await authService.isExistUser(username);

  res.status(200).json({
    isExist: result,
  });
}

async function login(req, res) {
  const { username, password } = req.body;

  if (username === "" || password == "") {
    return res.status(200).json({
      status: 400,
      error: "Username or password is empty.",
    });
  }

  const result = await authService.loginAdmin(username, password);

  if (result.code) {
    return res.status(200).json({
      success: false,
      error: result.error,
      message: "Logged in failed.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Logged in successful.",
    data: result,
  });
}
