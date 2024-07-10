const db = require("../config/db.service");
const config = require("../config/config");
module.exports = {
  getSetting,
  updateSetting,
};

async function getSetting() {
  try {
    const result = await db.select(config.tb.setting, "*");
    return result;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function updateSetting(dataToUpdate) {
  try {
    const keys = Object.keys(dataToUpdate);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (dataToUpdate[key] == undefined) {
        delete dataToUpdate[key];
      }
    }
    const result = await db.update(config.tb.setting, dataToUpdate);

    if (result == 0) {
      return {
        success: false,
        message: "Cập nhập thất bại. Hãy thử lại",
      };
    }
    return {
      success: true,
      message: "Cập nhập thành công",
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
