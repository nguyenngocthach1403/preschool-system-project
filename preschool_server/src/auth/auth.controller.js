const express = require("express");
const router = express.Router();
const moment = require("moment");

const authService = require("./auth.service");
const Utils = require("../../helpers/utils");

const {
  isEmpty,
  validatePassword,
  isValidEmail,
} = require("../../helpers/validation");

const Response = require("../../helpers/response");

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

  try {
    const result = await authService.loginAdmin(username, password);
    if (!result)
      return Response.sendErrorResponse({
        res,
        statusCode: 404,
        error: "User không tồn tại!",
      });

    const token = Utils.generateJWT(result);
    const refreshExpiry = moment()
      .utc()
      .add(3, "days")
      .endOf("day")
      .format("X");
    const refreshtoken = Utils.generateJWT({
      exp: parseInt(refreshExpiry),
      data: result.id,
    });
    delete result.password;
    return Response.sendResponse({
      res,
      responseBody: { user: result, token, refresh: refreshtoken },
      message: "login successful",
    });
  } catch (error) {
    console.log(error);
    Response.sendErrorResponse({ res, statusCode: 500, error: error.message });
  }

  // if (result.code) {
  //   return res.status(200).json({
  //     success: false,
  //     error: result.error,
  //     message: "Logged in failed.",
  //   });
  // }

  // return res.status(200).json({
  //   success: true,
  //   message: "Logged in successful.",
  //   data: result,
  // });
}

// const loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   if (isEmpty(username) || isEmpty(password)) {
//     return Response.sendErrorResponse({
//       res,
//       message: "Vui lòng nhập Tài khoản và mật khẩu.",
//       statusCode: 400,
//     });
//   }

//   const user = await authService.getUser(username);

//   if (!user) {
//     return Response.sendErrorResponse({
//       res,
//       message: "Tài khoản không tồn tại!",
//       statusCode: 404,
//     });
//   }

//   if (user.password !== password) {
//     return Response.sendErrorResponse({
//       res,
//       message: "Mật khẩu không hợp lệ!",
//       statusCode: 500,
//     });
//   }

// };
