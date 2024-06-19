const db = require("../config/db.service");
const config = require("../config/config");

module.exports = { getAddmissionPeriodOpenning, getAddmissionPeriod };

async function getAddmissionPeriodOpenning() {
  try {
    const result = await db.select(
      config.tb.addmission,
      "*",
      "WHERE openning = 1 AND start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE"
    );

    if (result.length == 0) {
      return {
        success: false,
        message: "Không có kỳ tuyển sinh nào được mở.",
      };
    }
    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function getAddmissionPeriod() {
  try {
    const result = await db.select(config.tb.addmission, "*");
    return result;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
