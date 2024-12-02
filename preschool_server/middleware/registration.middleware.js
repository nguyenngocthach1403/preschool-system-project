const { sendErrorResponse } = require("../helpers/response");
const { isEmpty } = require("../helpers/validation");

const service = require("../src/enrollment_sessions/enrollment_sessions.service");
async function validateRegistration(req, res, next) {
  const { registration } = req.body;

  if (!registration) {
    sendErrorResponse({ res, error: "Thiếu thông tin đăng ký" });
    return;
  }

  const { class_id, session_id } = registration;

  if (isEmpty(class_id)) {
    sendErrorResponse({ res, error: "Chưa có thông tin lớp đăng ký" });
    return;
  }

  if (isEmpty(session_id)) {
    sendErrorResponse({ res, error: "Chưa có thông tin đợt tuyển sinh" });
    return;
  }

  const isExistEnrollment = await service.isExistEnrollmentSession(session_id);

  if (!isExistEnrollment) {
    sendErrorResponse({ res, error: "Kỳ tuyển sinh không tồn tại." });
    return;
  }

  const isExistClass = await service.isExistClassBySessioId(
    session_id,
    class_id
  );

  if (!isExistClass) {
    sendErrorResponse({
      res,
      error: "Lớp đăng ký không có trong kỳ tuyển sinh này.",
    });
    return;
  }

  next();
}

module.exports = validateRegistration;
