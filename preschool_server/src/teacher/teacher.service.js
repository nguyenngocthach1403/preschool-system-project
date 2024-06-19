const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getTeacher,
  getClassManagedByTeacher,
  countTeacher,
  countSearchTeacher,
  searchTeacher,
};

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
async function countTeacher() {
  try {
    console.log("Count teacher:");
    return await db.select(
      config.tb.teacher,
      "Count(*) AS total",
      "WHERE deleted = 0"
    );
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}
async function countSearchTeacher(txtSearch) {
  try {
    return db.select(
      config.tb.teacher,
      "Count(*) AS total",
      `WHERE deleted = 0 AND name LIKE '%${txtSearch}%' OR email LIKE '%${txtSearch}%' OR phone LIKE '%${txtSearch}%'`
    );
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}
async function searchTeacher(txtSearch, page, limit) {
  try {
    return db.selectLimit(
      config.tb.teacher,
      "*",
      `WHERE deleted = 0 AND name LIKE '%${txtSearch}%' OR email LIKE '%${txtSearch}%' OR phone LIKE '%${txtSearch}%'`,
      `LIMIT ${limit}`,
      `OFFSET ${limit * page}`
    );
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}
