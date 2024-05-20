const express = require("express");
const router = express.Router();

const authService = require("./auth.service");

module.exports = router;

router.post("/", login);

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
      status: 500,
      error: result.error,
      message: "Logged in failed.",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Logged in successful.",
    data: result,
  });
}
