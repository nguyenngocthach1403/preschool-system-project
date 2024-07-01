const db = require("../config/db.service");
const config = require("../config/config");

module.exports = { getSyllabus, createSyllabus, isExistSyllabusByName };

async function getSyllabus() {
  try {
    const result = await db.select(
      config.tb.sysllabus,
      "*",
      "WHERE deleted = 0"
    );
    return result;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function isExistSyllabusByName(name) {
  try {
    const result = await db.select(
      `${config.tb.sysllabus}`,
      "*",
      `WHERE name like '${name}' AND deleted = 0`
    );

    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
async function createSyllabus(syllabusToCreate) {
  try {
    const result = await db.insert(config.tb.sysllabus, syllabusToCreate);
    if (result.effectedRows == 0) {
      return {
        success: false,
        message: "Tạo chương trình thất bại. Hãy thử lại",
      };
    }

    return {
      success: true,
      message: `Tạo chương trình ${syllabusToCreate.name} thành công`,
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
