const db = require("../config/db.service");
const config = require("../config/config");

module.exports = {
  getClassOfTeacherAttended,
  getClassesOfTeacherAttending,
  getClassesOfTeacherComingAttend,
};

//Lấy danh sách lớp đã tham gia của giáo viên
async function getClassOfTeacherAttended(teacherId) {
  try {
    const result = await db.select(
      `${config.tb.classManager} cm LEFT JOIN ${config.tb.class} c ON c.id =  cm.class_id LEFT JOIN ${config.tb.managerRole} mr ON mr.id = cm.role`,
      "c.*, mr.id AS role_id, mr.name AS  role_name",
      `WHERE cm.teacher_id = ${teacherId} AND c.end_date < CURRENT_DATE()`
    );
    if (result.length == 0) return undefined;
    return result;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function getClassesOfTeacherAttending(teacherId) {
  try {
    const result = await db.select(
      `${config.tb.classManager} cm LEFT JOIN ${config.tb.class} c ON c.id =  cm.class_id LEFT JOIN ${config.tb.managerRole} mr ON mr.id = cm.role`,
      "c.*, mr.id AS role_id, mr.name AS  role_name",
      `WHERE cm.teacher_id = ${teacherId} AND c.end_date >= CURRENT_DATE() AND c.start_date <= CURRENT_DATE()`
    );
    if (result.length == 0) return undefined;
    return result;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function getClassesOfTeacherComingAttend(teacherId) {
  try {
    const result = await db.select(
      `${config.tb.classManager} cm LEFT JOIN ${config.tb.class} c ON c.id =  cm.class_id LEFT JOIN ${config.tb.managerRole} mr ON mr.id = cm.role`,
      "c.*, mr.id AS role_id, mr.name AS  role_name",
      `WHERE cm.teacher_id = ${teacherId} AND c.start_date > CURRENT_DATE()`
    );
    if (result.length == 0) return undefined;
    return result;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
