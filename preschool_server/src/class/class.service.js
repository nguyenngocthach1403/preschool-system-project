const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getClass,
  isExistClass,
  findUpcomingAndOngoingClasses,
  countFindingUpcomingAndOngoingClasses,
  createClass,
  isExistClassByName,
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

async function isExistClassByName(className) {
  try {
    const result = await db.select(
      config.tb.class,
      "*",
      `WHERE className = '${className}'`
    );
    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
async function countFindingUpcomingAndOngoingClasses(searchText) {
  try {
    const now = new Date().toLocaleDateString();
    const date = now.split("/");
    const resultCount = await db.select(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.levels = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus = s.id`,
      "*",
      `WHERE c.deleted = 0 AND c.className like '%${searchText}%' AND c.endDate > '${date[2]}-${date[0]}-${date[1]}'`
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
    const now = new Date().toLocaleDateString();
    const date = now.split("/");
    const classesData = await db.selectLimit(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.levels = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus = s.id`,
      "c.*, l.levelsName, s.syllabusName",
      `WHERE c.deleted = 0 AND c.className like '%${searchText}%' AND c.endDate > '${date[2]}-${date[0]}-${date[1]}'`,
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

async function createClass(data) {
  try {
    const result = await db.insert(config.tb.class, data);
    if (result == 0) {
      return {
        success: false,
        message: "Tạo lớp thất bại. Thử lại sau.",
      };
    }

    return {
      success: true,
      message: "Tạo lớp thành công.",
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
