const db = require("../config/db.service");
const config = require("../config/config");

module.exports = { getCertificate };

async function getCertificate() {
  try {
    const result = await db.select(config.tb.certificates, "*");
    return result;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
