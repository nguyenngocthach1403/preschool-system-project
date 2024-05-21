const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getClass,
};

async function getClass(limit, offset) {
  try {
    return await db.selectLimit(
      config.tb.class,
      "*",
      "",
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}
