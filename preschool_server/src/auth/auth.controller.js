const moment = require("moment");

const authService = require("./auth.service");
const Utils = require("../../helpers/utils");

const {
  isEmpty,
  validatePassword,
  isValidEmail,
} = require("../../helpers/validation");

const Response = require("../../helpers/response");

async function loginUser(req, res) {
  const { username, password } = req.body;

  if (isEmpty(username) || isEmpty(password)) {
    return Response.sendErrorResponse({
      res,
      error: "Username or password is empty.",
      statusCode: 400,
      responseBody: null,
    });
  }

  // if (!validatePassword(password)) {
  //   return Response.sendErrorResponse({
  //     res,
  //     error: "Password is not validation",
  //     statusCode: 400,
  //     responseBody: null,
  //   });
  // }

  try {
    // const isExistUser = await authService.isExistUser(username);

    // if (!isExistUser) {
    //   return Response.sendErrorResponse({
    //     res,
    //     error: "User is not exist!",
    //     statusCode: 400,
    //   });
    // }

    const user = await authService.getUser(username);

    if (isEmpty(user)) {
      return Response.sendErrorResponse({
        res,
        error: "User is not exist!",
        statusCode: 400,
      });
    }

    if (user.password != password) {
      return Response.sendErrorResponse({
        res,
        error: "Password is wrong!",
        statusCode: 400,
      });
    }

    const claimsToSignToken = {
      user_id: user.id,
      user_name: user.username,
      user_role: user.role,
    };

    const token = Utils.generateJWT(claimsToSignToken);

    const refreshExpiry = moment()
      .utc()
      .add(3, "days")
      .endOf("day")
      .format("X");
    const refreshtoken = Utils.generateJWT({
      exp: parseInt(refreshExpiry),
      data: claimsToSignToken.id,
    });
    return Response.sendResponse({
      res,
      responseBody: { user: claimsToSignToken, token, refresh: refreshtoken },
      message: "login successful",
    });
  } catch (error) {
    console.log(error);
    Response.sendErrorResponse({ res, statusCode: 500, error: error.message });
  }
}

module.exports = {
  loginUser,
};
