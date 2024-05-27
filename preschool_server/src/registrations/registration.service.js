const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getTotalRegistration,
  getRegistrations,
  createRegister,
  isExitsRegister,
  updateStatus,
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
