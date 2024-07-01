const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getClassCurrent,
};

// async function getClass(teacher_id, limit, offset) {
//   try {
//     const now = new Date().toLocaleDateString();
//     const date = now.split("/");
//     return await db.selectLimit(
//       `${config.tb.class} c
//       LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id
//       LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id
//       LEFT JOIN ${config.tb.classManager} cm ON c.id = cm.class_id`,
//       "c.*, c.name AS ClassName, l.name AS levelsName, s.name AS syllabusName, cm.teacher_id AS TeacherId",
//       `WHERE c.deleted = 0 AND c.end_date > '${date[2]}-${date[0]}-${date[1]}'`,
//       `LIMIT ${limit}`,
//       `OFFSET ${offset}`
//     );
//   } catch (error) {
//     return {
//       code: error.code,
//       message: error.sqlMessage,
//     };
//   }
// }

async function getClassCurrent(teacherId, page, limit) {
  try {
    const now = new Date().toLocaleDateString();
    const date = now.split("/");
    return await db.selectLimit(
      `${config.tb.class} c
      LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id
      LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id
      LEFT JOIN ${config.tb.classManager} cm ON c.id = cm.class_id
      LEFT JOIN ${config.tb.managerRole} cmr ON cm.role = cmr.id`,
      "c.*, c.name AS ClassName, l.name AS levelsName, s.name AS syllabusName, cmr.name AS RoleName",
      `WHERE c.deleted = 0 AND c.end_date > '${date[2]}-${date[0]}-${date[1]}'  AND cm.teacher_id = ${teacherId}`,
      `LIMIT ${limit}`,
      `OFFSET ${limit * page}`
    );
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}
