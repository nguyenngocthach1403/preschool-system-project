const db = require("../config/db.service");
const config = require("../config/config");

module.exports = { getSyllabus };

async function getSyllabus() {
  try {
    const result = await db.select(
      config.tb.sysllabus,
      "*",
      "WHERE deleted = 0"
    );
    return result;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
