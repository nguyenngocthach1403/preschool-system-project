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
  getAccountById,
};

async function getAccountByUsername(username) {
  try {
    const result = await db.select(
      `${config.tb.account} a LEFt JOIN ${config.tb.account} c ON a.created_by = c.id`,
      "a.id, a.username, a.status, a.phone, a.email, a.role, c.username as creater_username,c.role as creater_role",
      `WHERE a.username like '${username}' AND a.deleted = 0`
    );

    return result[0];
  } catch (error) {
    return {
      code: error.code,
      error: error.sql,
    };
  }
}

async function getAccountById(id) {
  try {
    const result = await db.select(
      `${config.tb.account} a LEFt JOIN ${config.tb.account} c ON a.created_by = c.id`,
      "a.id, a.username, a.status, a.phone, a.email, a.role, c.username as creater_username,c.role as creater_role",
      `WHERE a.id = '${id}' AND a.deleted = 0`
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
    const result = await db.insert(config.tb.account, accountToCreate);
    if (result.effectedRows == 0) {
      return {
        success: false,
        message: "Tạo tài khoản thất bại. Hãy thử lại",
      };
    }

    return {
      success: true,
      message: `Tạo tài khoản ${accountToCreate.username} thành công`,
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
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
      `${config.tb.account} a LEFt JOIN ${config.tb.account} c ON a.created_by = c.id`,
      "a.id, a.username, a.status, a.phone, a.email, a.role, c.username as creater_username,c.role as creater_role",
      `WHERE a.username like '${username}' AND a.deleted = 0`
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
      `${config.tb.account} a LEFt JOIN ${config.tb.account} c ON a.created_by = c.id`,
      "a.id, a.username, a.status, a.phone, a.email, a.role, c.username as creater_username,c.role as creater_role",
      "WHERE a.deleted = 0",
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
