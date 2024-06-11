const db = require("../config/db.service");
const config = require("../config/config");
module.exports = {
  getAccount,
  getAccountTotal,
  createAccount,
  updateRegistration,
  updateByUsername,
  getAccountByUsername,
  isExistAccountByUsername,
};

async function getAccountByUsername(username) {
  try {
    const result = await db.select(
      config.tb.account,
      "*",
      `WHERE username like '${username}' AND deleted = 0`
    );

    return result[0];
  } catch (error) {
    return {
      code: error.code,
      error: error.sql,
    };
  }
}

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
    return db.update(config.tb.register, { account_id: username }, { id: id });
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}

async function isExistAccountByUsername(username) {
  try {
    const result = await db.select(
      config.tb.account,
      "*",
      `WHERE username like '${username}' AND deleted = 0`
    );

    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
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
