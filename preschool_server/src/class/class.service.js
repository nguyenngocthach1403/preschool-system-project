const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getClass,
  isExistClass,
  findUpcomingAndOngoingClasses,
  countFindingUpcomingAndOngoingClasses,
};

async function getClass(limit, offset) {
  try {
    return await db.selectLimit(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.levels = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus = s.id`,
      "c.*, l.levelsName, s.syllabusName",
      "",
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}

async function countFindingUpcomingAndOngoingClasses(searchText) {
  try {
    const resultCount = await db.select(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.levels = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus = s.id`,
      "*",
      `WHERE c.deleted = 0 AND c.className like '%${searchText}%' AND c.endDate > '${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}'`
    );

    if (resultCount.length == 0) {
      return {
        success: false,
        message: "Không có lớp nào tồn tại.",
      };
    }

    return {
      success: true,
      total: resultCount.length,
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function findUpcomingAndOngoingClasses(searchText, limit, offset) {
  try {
    const classesData = await db.selectLimit(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.levels = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus = s.id`,
      "c.*, l.levelsName, s.syllabusName",
      `WHERE c.deleted = 0 AND c.className like '%${searchText}%' AND c.endDate > '${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}'`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );

    return classesData;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function isExistClass(classId) {
  try {
    const classData = await db.select(
      config.tb.class,
      "*",
      `WHERE classID = ${classId}`
    );

    if (classData.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}