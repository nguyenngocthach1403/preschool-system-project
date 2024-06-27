const db = require("../config/db.service");
const config = require("../config/config");
module.exports = { createTeacherCertificate };

async function createTeacherCertificate(dataToCreate) {
  try {
    const teacherId = await db.insert(
      config.tb.teacher_certificates,
      dataToCreate
    );
    if (teacherId.effectedRows == 0) {
      return {
        success: false,
        message: "Quá trình thêm dữ liệu thất bại. Hãy thử lại.",
      };
    }
    return {
      success: true,
      message: "Tạo thành công",
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
