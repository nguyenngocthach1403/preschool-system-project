const db = require("../config/db.service");
const config = require("../../src/config/config");

/**
 * isExistUser method
 * @param {string} username
 * @returns {Boolean} True or False
 */
function isExistUser(username) {
  return new Promise(async (resolve) => {
    const rows = await db.select(
      config.tb.account,
      "*",
      `WHERE username = '${username}'`
    );
    const dbResponse = rows[0];

    if (!dbResponse) {
      resolve(false);
    }

    resolve(true);
  });
  // try {
  //   const rows = await db.select(
  //     config.tb.account,
  //     "*",
  //     `WHERE username = '${username}'`
  //   );

  //   const dbResponse = rows[0];

  //   if (!dbResponse) {
  //     return false;
  //   }

  //   return true;
  // } catch (error) {
  //   return false;
  // }
}

/**
 * isExistUser method
 * @param {string} username
 * @returns {Promise} True or False
 */
const getUser = async (username) => {
  return new Promise(async (resolve) => {
    const rows = await db.query(
      `SELECT * FROM ${config.tb.account} WHERE username = ?`,
      [username]
    );

    const dbResponse = rows[0];

    resolve(dbResponse);
  });
};

// async function loginAdmin(usename, password) {
//   try {
//     //Get User

//     //
//     const rightPassword = await db.select(
//       config.tb.account,
//       "COUNT(*) AS account",
//       `WHERE username = '${usename}' AND password = '${password}'`
//     );

//     if (rightPassword[0]["account"] == 0)
//       throw new Error("Mật khẩu không đúng");

//     const response = await db.select(
//       config.tb.account,
//       "id, username, role",
//       `WHERE username = '${usename}' AND password = '${password}' AND role in (1,2,3,4,5)`
//     );
//     const dbResponse = response[0];

//     if (!dbResponse) throw new Error("Thất bại");

//     return dbResponse;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error.sqlMessage || error);
//   }
// }

module.exports = {
  isExistUser,
  getUser,
};
