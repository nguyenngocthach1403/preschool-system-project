const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getTotalRegistration,
  getRegistrations,
  createRegister,
  isExitsRegister,
  updateStatus,
  getTotalOfStatus,
  getRegisterWithSearchAndStatus,
  searchRegisterWithSearch,
  getTotalWithSearch,
  countRegisterWithSearchAndStatus,
  getRegistrationsWithStatus,
  getTotalWithStatus,
  isExistRegisterByPhone,
};

async function createRegister(data) {
  try {
    console.log("  * Create registration:");
    return await db.insert(config.tb.register, data);
  } catch (error) {
    return {
      code: error.code,
      message: "An error occurred while executing the query.",
      error: error.sqlMessage,
    };
  }
}

// async function getTotalWithStatusAndSearch(searchText, status) {
//   try {
//     const result = await db.select(
//       config.tb.register,
//       "COUNT(*) as total, status",
//       `WHERE status in (${status}) AND name like '%${searchText}%' OR phone like '${searchText}%' OR email like '%${searchText}%' GROUP BY status`
//     );

//     if (result.length == 0) {
//       return {
//         success: false,
//         error: "Không có kết quả nào được tìm thấy.",
//       };
//     }

//     return {
//       success: true,
//       data: result,
//     };
//   } catch (error) {
//     return {
//       code: error.code,
//       error: error.sqlMessage,
//     };
//   }
// }
async function getTotalWithSearch(searchText) {
  try {
    const result = await db.select(
      config.tb.register,
      "COUNT(*) as total",
      `WHERE name like '%${searchText}%' OR phone like '${searchText}%' OR email like '%${searchText}%'`
    );

    if (result[0]["total"] == 0) {
      return {
        success: false,
        error: "Không có kết quả nào được tìm thấy.",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function isExistRegisterByPhone(phone) {
  try {
    const result = await db.select(
      config.tb.register,
      "*",
      `WHERE phone = ${phone}`
    );
    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function searchRegisterWithSearch(searchText, limit, offset) {
  try {
    const result = await db.selectLimit(
      `${config.tb.register} r LEFT JOIN ${config.tb.levels} l ON r.levels = l.id LEFT JOIN ${config.tb.sysllabus} s ON r.syllabus = s.id `,
      "r.*, l.levelsName, s.syllabusName",
      `WHERE name like '%${searchText}%' OR phone like '${searchText}%' OR email like '%${searchText}%'`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );

    if (result.length == 0) {
      return {
        success: false,
        error: "Không có kết quả nào được tìm thấy.",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function getTotalWithStatus(status) {
  try {
    const result = await db.select(
      config.tb.register,
      "COUNT(*) as total",
      `WHERE status in (${status})`
    );
    return result;
  } catch (error) {
    return { code: error.code, error: error.sqlMessage };
  }
}

async function getRegistrationsWithStatus(status, limit, offset) {
  try {
    const result = await db.selectLimit(
      `${config.tb.register} r LEFT JOIN ${config.tb.levels} l ON r.levels = l.id LEFT JOIN ${config.tb.sysllabus} s ON r.syllabus = s.id `,
      "r.*, l.levelsName, s.syllabusName",
      `WHERE status in (${status})`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );

    if (result.length == 0) {
      return {
        success: false,
        error: "Không có kết quả nào được tìm thấy.",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function countRegisterWithSearchAndStatus(searchText, status) {
  try {
    const result = await db.select(
      config.tb.register,
      "COUNT(*) as total",
      `WHERE status in (${status}) AND name like '%${searchText}%' OR phone like '${searchText}%' OR email like '%${searchText}%'`
    );

    if (result.length == 0) {
      return {
        success: false,
        error: "Không có kết quả nào được tìm thấy.",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function getRegisterWithSearchAndStatus(
  searchText,
  status,
  limit,
  offset
) {
  try {
    if (status == -1) {
      status = "0,1,2,3,4,5";
    }
    const result = await db.selectLimit(
      `${config.tb.register} r LEFT JOIN ${config.tb.levels} l ON r.levels = l.id LEFT JOIN ${config.tb.sysllabus} s ON r.syllabus = s.id `,
      "r.*, l.levelsName, s.syllabusName",
      `WHERE status in (${status}) AND (name like '%${searchText}%' OR phone like '${searchText}%' OR email like '%${searchText}%')`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );

    if (result.length == 0) {
      return {
        success: false,
        error: "Không có kết quả nào được tìm thấy.",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function getTotalOfStatus() {
  try {
    const result = await db.select(
      config.tb.register,
      "status, COUNT(*) as total",
      `GROUP BY status`
    );

    if (result.length == 0) {
      return {
        success: false,
        error: "Không có kết quả nào được tìm thấy.",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function updateStatus(id, status) {
  try {
    const result = await db.update(
      config.tb.register,
      {
        status: status,
      },
      { id: id }
    );

    if (result != 1) {
      return {
        success: false,
        message: "Cập nhật trang thái thất ại.",
      };
    }
    return {
      success: true,
      message: "Cập nhật hoàn thành",
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function isExitsRegister(id) {
  try {
    const result = await db.select(config.tb.register, "*", `WHERE id = ${id}`);
    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
async function getTotalRegistration() {
  try {
    console.log("  * Count registration:");
    return await db.select(config.tb.register, "Count(*) AS total");
  } catch (error) {
    return {
      code: error.code,
      message: "An error occurred while executing the query.",
    };
  }
}

async function getRegistrations(page, limit) {
  try {
    const data = await db.selectLimit(
      config.tb.register,
      "*",
      `LIMIT ${limit}`,
      `OFFSET ${limit * page}`
    );
    return data;
  } catch (error) {
    return {
      code: error.code,
      message: "An error occurred while executing the query.",
    };
  }
}
