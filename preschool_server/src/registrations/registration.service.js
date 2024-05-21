const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getTotalRegistration,
  getRegistrations,
};

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
