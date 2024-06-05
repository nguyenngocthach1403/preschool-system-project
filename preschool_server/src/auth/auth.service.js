const db = require("../config/db.service");
const config = require("../../src/config/config");

module.exports = {
  loginAdmin,
  isExistUser,
};

async function isExistUser(username) {
  try {
    const resulst = await db.select(
      config.tb.account,
      "*",
      `WHERE username = '${username}' AND role = 1`
    );
    if (resulst.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function loginAdmin(usename, password) {
  try {
    const isExistAccount = await db.select(
      config.tb.account,
      "COUNT(*) AS account",
      `WHERE username = '${usename}' AND role = 1`
    );

    if (isExistAccount[0]["account"] == 0) {
      return {
        code: 1,
        error: "Account is not exited",
      };
    }

    const rightPassword = await db.select(
      config.tb.account,
      "COUNT(*) AS account",
      `WHERE username = '${usename}' AND password = '${password}' AND role = 1`
    );

    if (rightPassword[0]["account"] == 0) {
      return {
        code: 1,
        error: "Mật khẩu không đúng.",
      };
    }

    return db.select(
      config.tb.account,
      "username, role",
      `WHERE username = '${usename}' AND password = '${password}' AND role = 1`
    );
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
