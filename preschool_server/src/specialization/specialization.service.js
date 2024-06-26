const db = require("../config/db.service");
const config = require("../config/config");

module.exports = { getSpecialization };

async function getSpecialization() {
  try {
    const result = await db.select(config.tb.specialization, "*");
    return result;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
