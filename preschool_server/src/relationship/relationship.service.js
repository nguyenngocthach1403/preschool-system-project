const db = require("../config/db.service");
const config = require("../../src/config/config");

module.exports = { createRelationship, isExistRelationship };
async function createRelationship(data) {
  try {
    const result = await db.insert(config.tb.relationship, data);
    if (result == 0) {
      return {
        success: false,
        message: "Không thể tạo mối quan hệ. Vui lòng thử lại.",
      };
    }

    return {
      success: true,
      message: "Tạo mối quan hệ thành công.",
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function isExistRelationship(parentId, studentId, relationship) {
  try {
    const result = await db.select(
      config.tb.relationship,
      "*",
      `WHERE (parent_id = ${parentId} AND student_id = ${studentId})
        OR (relationship = ${relationship} AND student_id = ${studentId}) OR (relationship = ${relationship} AND parent_id = ${parentId} AND student_id = ${studentId})`
    );
    if (result.length == 0) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
