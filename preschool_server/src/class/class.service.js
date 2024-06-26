const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getClass,
  isExistClass,
  findUpcomingAndOngoingClasses,
  countFindingUpcomingAndOngoingClasses,
  createClass,
  isExistClassByName,
  getMembers,
  addStudentIntoClasses,
  updateClass,
};

async function getClass(limit, offset) {
  try {
    return await db.selectLimit(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id`,
      "c.*, l.name AS levelsName, s.name AS syllabusName",
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

async function getMembers(class_id) {
  try {
    const data = await db.select(
      `${config.tb.classMembers} m LEFT JOIN ${config.tb.student} s ON s.id = m.student_id LEFT JOIN ${config.tb.account} a ON a.id = m.created_by`,
      "s.id, s.name, s.gender, s.birthday, m.*, s.avatar, m.created_by, a.username, a.role, m.joined",
      `WHERE s.deleted = 0 AND m.class_id = ${class_id}`
    );

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function isExistClassByName(className) {
  try {
    const result = await db.select(
      config.tb.class,
      "*",
      `WHERE name = '${className}'`
    );
    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function addStudentIntoClasses(data) {
  try {
    const result = await db.insert(config.tb.classMembers, data);

    if (result.effectedRows == 0) {
      return {
        success: false,
        message: "Quá trình thêm vào lớp không thành công hãy thử lại.",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function countFindingUpcomingAndOngoingClasses(searchText) {
  try {
    const now = new Date().toLocaleDateString();
    const date = now.split("/");
    const resultCount = await db.select(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id`,
      "*",
      `WHERE c.deleted = 0 AND c.name like '%${searchText}%' AND c.end_date > '${date[2]}-${date[0]}-${date[1]}'`
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
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id`,
      "c.*, l.levelsName, s.syllabusName",
      `WHERE c.deleted = 0 AND c.name like '%${searchText}%' AND c.end_date > '${date[2]}-${date[0]}-${date[1]}'`,
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
      `WHERE id = ${classId}`
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

async function updateClass(classID, dataToUpdate) {
  try {
    const keys = Object.keys(dataToUpdate);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (dataToUpdate[key] == undefined) {
        delete dataToUpdate[key];
      }
    }
    const result = await db.update(config.tb.class, dataToUpdate, {
      id: classID,
    });

    if (result == 0) {
      return {
        success: false,
        message: "Cập nhật không thành công. Hãy thử lại.",
      };
    }

    return {
      success: true,
      message: "Cập nhật thành công.",
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
