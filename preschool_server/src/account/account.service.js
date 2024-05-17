const db = require("../config/db");
require("dotenv").config();
module.exports = {
  getAccount,
  getAccountTotal,
  createAccount,
  updateRegistration,
};

async function createAccount(accountToCreate) {
  try {
    db.createConnection();

    return db.insert(process.env.ACCOUNT_TB, accountToCreate);
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  } finally {
    db.disconnect();
  }
}

async function updateRegistration(id, username) {
  try {
    db.createConnection();
    return db.update("Registers", { acountId: username }, { id: id });
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  } finally {
    db.disconnect();
  }
}

async function getAccount(limit, offset) {
  try {
    db.createConnection();
    return await db.selectLimit(
      process.env.ACCOUNT_TB,
      "id, username, phone, email, role",
      "",
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );
  } catch (error) {
    return {
      code: 1,
      message: "An error occurred while excuted querry.",
    };
  } finally {
    db.disconnect();
  }
}

async function getAccountTotal() {
  try {
    db.createConnection();
    return await db.select(process.env.ACCOUNT_TB, "COUNT(*) AS total");
  } catch (error) {
    return {
      code: 1,
      message: "An error occurred while excuted querry.",
    };
  } finally {
    db.disconnect();
  }
}
