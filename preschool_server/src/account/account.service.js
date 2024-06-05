const db = require("../config/db.service");
const config = require("../config/config");
module.exports = {
  getAccount,
  getAccountTotal,
  createAccount,
  updateRegistration,
  updateByUsername,
};

async function createAccount(accountToCreate) {
  try {
    return db.insert(config.tb.account, accountToCreate);
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}

async function updateRegistration(id, username) {
  try {
    return db.update(config.tb.register, { accountId: username }, { id: id });
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}

async function getAccount(limit, offset) {
  try {
    return await db.selectLimit(
      config.tb.account,
      "*",
      "WHERE deleted = 0",
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );
  } catch (error) {
    return {
      code: 1,
      message: "An error occurred while excuted querry.",
    };
  }
}

async function getAccountTotal() {
  try {
    return await db.select(config.tb.account, "COUNT(*) AS total");
  } catch (error) {
    return {
      code: 1,
      message: "An error occurred while excuted querry.",
    };
  }
}
async function updateByUsername(username, newData) {
  try {
    return await db.update(config.tb.account, newData, { username: username });
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}
