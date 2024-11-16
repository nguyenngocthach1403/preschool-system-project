const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getAddmissionPeriodOpenning,
  getAddmissionPeriod,
  isExistAdmission,
  createEnrollmentSessions,
  createSessionClasses,
  getSessionClassesBySessionId,
  getEnrollmentById,
};

async function getAddmissionPeriodOpenning() {
  try {
    const result = await db.select(
      `${config.tb.enrollmentSessions} ad LEFT JOIN ${config.tb.account} ac ON ad.created_by = ac.id`,
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
      config.tb.enrollmentSessions,
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
      `${config.tb.enrollmentSessions} ad LEFT JOIN ${config.tb.account} ac ON ad.created_by = ac.id`,
      "ad.*, ac.id as created_id, ac.username as created_by"
    );
    return result;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

// async function createAdmissionPeriod(dataToCreate) {
//   try {
//     const result = await db.insert(config.tb.enrollmentSessions, dataToCreate);
//     if (result.affectedRows == 0) {
//       return {
//         success: false,
//         message: "Tạo thất bại hãy thử lại..",
//       };
//     }
//     return {
//       success: true,
//       data: result.insertId,
//     };
//   } catch (error) {
//     return {
//       code: error.code,
//       error: error.sqlMessage,
//     };
//   }
// }

/**
 *
 * @param {Object} dataToCreate
 * @returns {Number} insertId
 */
async function createEnrollmentSessions(dataToCreate) {
  return new Promise(async (resolve, reject) => {
    try {
      const responseCreated = await db.insert(
        `enrollment_sessions`,
        dataToCreate
      );
      if (!responseCreated.insertId) {
        reject("Tạo thất bại!");
      }

      resolve(responseCreated.insertId);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 *
 * @param {Number} sessionId
 * @param {Number} classId
 * @returns
 */
function createSessionClasses(sessionId, classId) {
  return new Promise(async (resolve, reject) => {
    try {
      const sessionClassesCreated = await db.insert(config.tb.sessionClasses, {
        session_id: sessionId,
        class_id: classId,
      });
      if (sessionClassesCreated.affectedRows == 0) {
        reject("Tạo thất bại!");
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 *
 * @param {Number} id
 */
async function getEnrollmentById(id) {
  return new Promise(async (resolve, reject) => {
    const response = await db.query(
      `SELECT es.*, ac.id as created_id, ac.username as created_by 
      FROM enrollment_sessions as es 
      LEFT JOIN accounts ac ON es.created_by = ac.id
      WHERE es.id = ${id}`
    );

    let enrollment = response[0];

    if (enrollment == null) {
      console.log("NUll");

      reject("Không tồn tại");
    }

    resolve(enrollment);
  });
}

async function getSessionClassesBySessionId(sessionId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.select(
        `${config.tb.sessionClasses} as sc`,
        "sc.*",
        `WHERE session_id = ${sessionId}`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
