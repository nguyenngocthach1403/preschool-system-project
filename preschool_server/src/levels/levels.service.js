const db = require("../config/db.service");
const config = require("../config/config");

module.exports = { getLevels };

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
