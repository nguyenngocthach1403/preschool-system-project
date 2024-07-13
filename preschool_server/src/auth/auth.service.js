const db = require("../config/db.service");
const config = require("../../src/config/config");

/**
 * isExistUser method
 * @param {string} username
 * @returns {Boolean} True or False
 */
async function isExistUser(username) {
  try {
    const rows = await db.select(
      config.tb.account,
      "*",
      `WHERE username = '${username}'`
    );

    const dbResponse = rows[0];

    if (!dbResponse) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * isExistUser method
 * @param {string} username
 * @returns {Boolean} True or False
 */
const getUser = async (username) => {
  try {
    const rows = db.query(
      `SELECT * FROM ${config.tb.account} WHERE username = ?`,
      [username]
    );

    const dbResponse = rows[0];

    if (!dbResponse) return undefined;

    return dbResponse;
  } catch (error) {
    return undefined;
  }
};

async function loginAdmin(usename, password) {
  try {
    const isExistAccount = await db.select(
      config.tb.account,
      "COUNT(*) AS account",
      `WHERE username = '${usename}' AND role in (1,2,3,4,5)`
    );

    if (isExistAccount[0]["account"] == 0)
      throw new Error("Tài khoản không tồn tại!");

    const rightPassword = await db.select(
      config.tb.account,
      "COUNT(*) AS account",
      `WHERE username = '${usename}' AND password = '${password}' AND role in (1,2,3,4,5)`
    );

    if (rightPassword[0]["account"] == 0)
      throw new Error({ message: "Mật khẩu không đúng" });

    const response = await db.select(
      config.tb.account,
      "id, username, role",
      `WHERE username = '${usename}' AND password = '${password}' AND role in (1,2,3,4,5)`
    );
    const dbResponse = response[0];

    if (!dbResponse) throw new Error("Thất bại");

    return dbResponse;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
}

module.exports = {
  loginAdmin,
  isExistUser,
  getUser,
};
