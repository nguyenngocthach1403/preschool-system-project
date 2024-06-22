const db = require("../config/db.service");
const config = require("../config/config");

module.exports = { getLevels, isExistLevel };

async function getLevels() {
  try {
    const result = await db.select(config.tb.levels, "*", "WHERE deleted = 0");
    return result;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function isExistLevel(level_id) {
  try {
    const result = db.select(
      config.tb.levels,
      "*",
      `WHERE deleted = 0 AND id = ${level_id}`
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
