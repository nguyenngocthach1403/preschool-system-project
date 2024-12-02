const { sendErrorResponse } = require("../helpers/response");
const { isValidDate, isEmpty } = require("../helpers/validation");

function validateParent(req, res, next) {
  const { parent } = req.body;

  if (!parent) {
    sendErrorResponse({
      res,
      error: "Chưa có thông tin phụ huynh.",
      statusCode: 400,
    });
    return;
  }

  const { name, job, date_of_birth, phone, mail, relationship } = parent;

  if (isEmpty(name)) {
    sendErrorResponse({
      res,
      error: "Thiếu thông tin phụ huynh",
      statusCode: 400,
    });
    return;
  }

  if (isEmpty(phone)) {
    sendErrorResponse({
      res,
      error: "Thông tin liên hệ phụ huynh thiếu hoặc không hợp lệ",
      statusCode: 400,
    });
    return;
  }

  if (!isValidDate(date_of_birth)) {
    sendErrorResponse({
      res,
      error: "Ngày sinh của phụ huynh không hợp lệ",
      statusCode: 400,
    });
    return;
  }

  if (isEmpty(relationship)) {
    sendErrorResponse({
      res,
      error: "Thiếu thông tin vai trò của phụ huynh",
      statusCode: 400,
    });
    return;
  }

  next();
}

module.exports = validateParent;
