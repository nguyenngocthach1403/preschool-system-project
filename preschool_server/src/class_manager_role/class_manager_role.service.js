const db = require("../config/db.service");
const config = require("../config/config");

module.exports = { isExistClassManagerRole };

//Kiểm tra role có tồn tại hay khong
async function isExistClassManagerRole(role) {
  try {
    const result = await db.select(
      config.tb.managerRoles,
      "*",
      `WHERE id = ${role} AND deleted = 0`
    );
    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
