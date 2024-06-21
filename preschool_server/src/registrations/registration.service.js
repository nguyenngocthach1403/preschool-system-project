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
  deleteRegistration,
  getRegisterByID,
  updateRegister,
  createApprove,
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

async function updateRegister(id, data) {
  try {
    const keys = Object.keys(data);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (data[key] == undefined) {
        delete data[key];
      }
    }
    const result = await db.update(config.tb.register, data, { id: id });
    if (result == 0) {
      return {
        success: false,
        message: "Cập nhật đơn đăng ký thất bại.",
      };
    }
    return {
      success: true,
      message: "Cập nhật đơn đăng ký thành công.",
    };
  } catch (error) {
    return {
      code: error.code,
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

async function getRegisterByID(id) {
  try {
    const result = await db.select(
      `${config.tb.register} r LEFT JOIN ${config.tb.levels} l ON r.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON r.syllabus_id = s.id LEFT JOIN ${config.tb.student} stu ON stu.id = r.student_id`,
      "r.*, l.name AS levelsName, s.name AS syllabusName, stu.name AS student_name",
      `WHERE r.id = ${id}`
    );

    if (result.length == 0) {
      return {
        success: false,
        message: "Quá trình lấy đơn đăng ký bị lỗi.",
      };
    }
    return {
      success: true,
      message: "Thành công",
      data: result[0],
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function getTotalWithSearch(admission_period_id, searchText) {
  try {
    const result = await db.select(
      config.tb.register,
      "COUNT(*) as total",
      `WHERE admission_period_id = ${admission_period_id} AND name like '%${searchText}%' OR phone like '${searchText}%' OR email like '%${searchText}%'`
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

async function isExistRegisterByPhone(admission_id, phone) {
  try {
    const result = await db.select(
      config.tb.register,
      "*",
      `WHERE phone = ${phone} AND admission_period_id = ${admission_id}`
    );
    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function searchRegisterWithSearch(
  admission_period_id,
  searchText,
  limit,
  offset
) {
  try {
    const result = await db.selectLimit(
      `${config.tb.register} r LEFT JOIN ${config.tb.levels} l ON r.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON r.syllabus_id = s.id LEFT JOIN ${config.tb.student} stu ON stu.id = r.student_id `,
      "r.*, l.name AS levelsName, s.name AS syllabusName, stu.name AS student_name",
      `WHERE r.admission_period_id = ${admission_period_id} AND r.name like '%${searchText}%' OR r.phone like '${searchText}%' OR r.email like '%${searchText}%'`,
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

async function createApprove(approve_data) {
  try {
    const result = await db.insert(config.tb.approves, {
      register_id: approve_data.register_id,
      account_id: approve_data.account_id,
      status_before: approve_data.status_before,
      coming_status: approve_data.coming_status,
    });

    if (result == 0) {
      return {
        success: false,
        message: "Duyệt thất bại.",
      };
    }

    return {
      success: true,
      message: "Duyệt thành công.",
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function getTotalWithStatus(admission_period_id, status) {
  try {
    const result = await db.select(
      config.tb.register,
      "COUNT(*) as total",
      `WHERE admission_period_id = ${admission_period_id} AND status in (${status})`
    );
    return result;
  } catch (error) {
    return { code: error.code, error: error.sqlMessage };
  }
}

async function getRegistrationsWithStatus(
  admission_period_id,
  status,
  limit,
  offset
) {
  try {
    const result = await db.selectLimit(
      `${config.tb.register} r LEFT JOIN ${config.tb.levels} l ON r.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON r.syllabus_id = s.id LEFT JOIN ${config.tb.student} stu ON stu.id = r.student_id `,
      "r.*, l.name AS levelsName, s.name AS syllabusName, stu.name AS student_name",
      `WHERE r.admission_period_id = ${admission_period_id}  AND r.status in (${status})`,
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
async function countRegisterWithSearchAndStatus(
  admission_period_id,
  searchText,
  status
) {
  try {
    const result = await db.select(
      config.tb.register,
      "COUNT(*) as total",
      `WHERE admission_period_id = ${admission_period_id} AND status in (${status}) AND (name like '%${searchText}%' OR phone like '${searchText}%' OR email like '%${searchText}%')`
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
  admission_period_id,
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
      `${config.tb.register} r LEFT JOIN ${config.tb.levels} l ON r.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON r.syllabus_id = s.id LEFT JOIN ${config.tb.student} stu ON stu.id = r.student_id `,
      "r.*, l.name AS levelsName, s.name AS syllabusName, stu.name AS student_name",
      `WHERE r.admission_period_id = ${admission_period_id} AND r.status in (${status}) AND (r.name like '%${searchText}%' OR r.phone like '${searchText}%' OR r.email like '%${searchText}%')`,
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

async function getTotalOfStatus(admission_period_id) {
  try {
    const result = await db.select(
      config.tb.register,
      "status, COUNT(*) as total",
      `WHERE admission_period_id = ${admission_period_id} GROUP BY status`
    );

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
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
        message: "Cập nhật trạng thái thất bại.",
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
async function getTotalRegistration(admission_period_id) {
  try {
    console.log("  * Count registration:");
    return await db.select(
      config.tb.register,
      "Count(*) AS total",
      `WHERE admission_period_id = ${admission_period_id}`
    );
  } catch (error) {
    return {
      code: error.code,
      message: "An error occurred while executing the query.",
    };
  }
}

async function getRegistrations(admission_period_id, page, limit) {
  try {
    const data = await db.selectLimit(
      `${config.tb.register} r LEFT JOIN ${config.tb.levels} l ON r.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON r.syllabus_id = s.id LEFT JOIN ${config.tb.student} stu ON stu.id = r.student_id `,
      "r.*, l.name AS levelsName, s.name AS syllabusName, stu.name AS student_name",
      `WHERE r.admission_period_id = ${admission_period_id}`,
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

async function deleteRegistration(id, phone) {
  try {
    const result = await db.deleteRow(
      config.tb.register,
      `WHERE id = ${id} OR phone = ${phone}`
    );

    if (result == 0) {
      return {
        success: false,
        message: `Xóa đơn đăng ký ${phone} thất bại!`,
      };
    }
    return {
      success: true,
      message: `Xóa đơn đăng ký ${phone} thành công.`,
    };
  } catch (error) {
    return {
      success: false,
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
