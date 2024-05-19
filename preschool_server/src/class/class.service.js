const db = require("../config/db");

require("dotenv").config();

module.exports = {
  getClass,
};

async function getClass(limit, offset) {
  try {
    db.createConnection();
    return await db.selectLimit(
      process.env.CLASS_TB,
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
  } finally {
    db.disconnect();
  }
}
