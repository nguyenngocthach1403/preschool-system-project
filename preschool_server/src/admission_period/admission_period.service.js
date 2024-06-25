const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getAddmissionPeriodOpenning,
  getAddmissionPeriod,
  isExistAdmission,
  createAdmissionPeriod,
};

async function getAddmissionPeriodOpenning() {
  try {
    const result = await db.select(
      `${config.tb.addmission} ad LEFT JOIN ${config.tb.account} ac ON ad.created_by = ac.id`,
      "ad.*, ac.username",
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

async function isExistAdmission(admission_period_id) {
  try {
    const result = db.select(
      config.tb.addmission,
      "*",
      `WHERE id = ${admission_period_id}`
    );
    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getAddmissionPeriod() {
  try {
    const result = await db.select(
      `${config.tb.addmission} ad LEFT JOIN ${config.tb.account} ac ON ad.created_by = ac.id`,
      "ad.*, ac.username"
    );
    return result;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function createAdmissionPeriod(dataToCreate) {
  try {
    const result = await db.insert(config.tb.addmission, dataToCreate);
    if (result.affectedRows == 0) {
      return {
        success: false,
        message: "Tạo thất bại hãy thử lại..",
      };
    }
    return {
      success: true,
      data: result.insertId,
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
