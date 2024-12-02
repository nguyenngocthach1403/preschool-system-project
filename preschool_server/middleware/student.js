const { sendErrorResponse } = require("../helpers/response");
const { isEmpty } = require("../helpers/validation");

function validateStudent(req, res, next) {
  const { student } = req.body;

  if (!student) {
    sendErrorResponse({
      res,
      error: "Chưa có thông tin học sinh để đăng ký",
      statusCode: 400,
    });
    return;
  }

  const { name, gender, date_of_birth, fork, place_of_birth, nation } = student;

  if (isEmpty(name)) {
    sendErrorResponse({
      res,
      error: "Chưa có thông tin học sinh để đăng ký",
      statusCode: 400,
    });
    return;
  }

  next();
}

module.exports = { validateStudent };
