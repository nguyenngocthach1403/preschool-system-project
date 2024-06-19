const db = require("../config/db.service");
const config = require("../config/config");

module.exports = { getTeacher, getClassManagedByTeacher };

async function getTeacher(limit, offset) {
  try {
    const data = await db.selectLimit(
      `${config.tb.teacher} tea LEFT JOIN ${config.tb.account} acc ON acc.id = tea.account_id`,
      "tea.*, acc.username",
      `WHERE tea.deleted = 0`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );

    return data || [];
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function getClassManagedByTeacher(teacherId) {
  try {
    const data = await db.select(
      `${config.tb.classManager} claM LEFT JOIN ${config.tb.class} cla ON cla.id = claM.class_id LEFT JOIN ${config.tb.managerRole} magR ON magR.id = claM.role`,
      "claM.class_id, claM.role as role_id, cla.name AS class_name, magR.name AS role_name",
      `WHERE cla.deleted = 0 AND claM.teacher_id = ${teacherId}`
    );
    return data || [];
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
