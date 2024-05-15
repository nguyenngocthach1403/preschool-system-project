const db = require("../config/db");
require("dotenv").config();

module.exports = {
  getTotalRegistration,
  getRegistrations,
};

async function getTotalRegistration() {
  try {
    if (!db.connection) {
      db.createConnection();
    }
    return await db.select(process.env.REGISTRATION_DB, "Count(*) AS total");
  } catch (error) {
    return {
      code: error.code,
      message: "An error occurred while executing the query.",
    };
  } finally {
    if (db.connection) {
      db.disconnect();
    }
  }
}

async function getRegistrations(page, limit) {
  try {
    if (!db.connection) {
      db.createConnection();
    }
    const data = await db.selectLimit(
      process.env.REGISTRATION_DB,
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
  } finally {
    if (db.connection) {
      db.disconnect();
    }
  }
}
