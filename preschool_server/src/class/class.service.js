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
  getClassManagerRoles,
  searchClassWithSession,
  searchClass,
  searchClassWithStatus,
  searchClassWithStatusAndSession,
  countSearchClassWithStatus,
  countSearchClass,
  countTotalClass,
  countClassByStatus,
  countSearchClassWithSession,
  countSearchClassWithStatusAndSession,
  getClassById,
  getClassManagerRolesByClassId,
  createClassManagerByClassId,
  updateClassManagerClassId,
  isExistManagementPosition,
};

async function getClass(limit, offset) {
  try {
    // const result = await db.query(
    //   `SELECT
    //   JSON_ARRAYAGG(
    //       JSON_OBJECT(
    //           'id', c.id,
    //           'class_name', c.name,
    //           'start_date', c.start_date,
    //           'end_date', c.end_date,
    //           'class_img', c.class_img,
    //           'level', JSON_OBJECT(
    //               'id', l.id,
    //               'name', l.name,
    //               'description', l.description
    //           ),
    //           'syllabus', JSON_OBJECT(
    //               'id', s.id,
    //               'name', s.name,
    //               'description', s.description
    //           ),
    //           'members', c.members,
    //           'member_limit', c.member_limit,
    //           'type', c.type,
    //           'session', c.session,
    //           'status', c.status,
    //           'created', c.created,
    //           'deleted', c.deleted,
    //           'created_by', c.created_by,
    //           'managers', (
    //               SELECT JSON_OBJECTAGG(
    // 			cmr.name,
    //                 JSON_OBJECT(
    // 				'role_id', cmr.id,
    //                     'role_name', cmr.name,
    //                     'teachers', (
    // 					SELECT JSON_OBJECT(
    // 						'name', t.name,
    //                             'id', t.id
    // 					)
    //                         FROM teachers t
    //                         LEFT JOIN  class_managers cm1
    //                         ON cm1.teacher_id = t.id
    //                         WHERE cm1.role = cmr.id AND cm1.class_id = c.id AND t.deleted = 0
    //                     )
    //                 )
    //               )
    //               FROM class_manager_roles cmr
    //               LEFT JOIN class_managers cm
    //               ON cmr.id = cm.role
    //               WHERE cmr.deleted = 0
    //           )
    //       )
    //   ) AS classes
    //   FROM
    //       classes c
    //   LEFT JOIN
    //       levels l ON c.level_id = l.id
    //   LEFT JOIN
    //       syllabus s ON c.syllabus_id = s.id
    //   WHERE
    //       c.deleted = 0
    // LIMIT ?
    // OFFSET ?;
    // `,
    //   [parseInt(limit), parseInt(offset)]
    // );

    const response = await db.query(`
      SELECT 
          c.id,
          c.name as class_name,
          c.start_date,
          c.end_date,
          c.class_img,
          l.id as level_id,
          l.name as level_name,
          l.description as level_description,
          s.id as syllabus_id,
          s.name as syllabus_name,
          s.description as syllabus_description,
          c.members,
          c.member_limit,
          c.type,
          c.session,
          c.status,
          c.created,
          c.deleted,
          c.created_by
      FROM 
          classes c
      LEFT JOIN 
          levels l ON c.level_id = l.id
      LEFT JOIN 
          syllabus s ON c.syllabus_id = s.id
      WHERE 
          c.deleted = 0
      LIMIT 10 OFFSET 0;
  `);

    if (response.length == 0) return undefined;

    for (const classItem in response) {
      console.log("class_id", response[classItem].class_id);
      const managers = await db.query(`
     SELECT cmr.name as role_name, cmr.id as role_id, t.id as teacher_id, t.name as teacher_name, t.avatar as teacher_avatar FROM class_managers cm LEFT JOIN  ${config.tb.managerRoles}  cmr ON cmr.id = cm.role  LEFT JOIN teachers t ON t.id = cm.teacher_id
     WHERE cm.class_id = ${response[classItem].id}`);

      response[classItem].managers = managers;
    }

    console.log(response);

    return response;

    // const managers = db.query(`
    //   SELECT FROM class_managers cm LEFT JOIN teachers t ON t.id = cm.teacher_id`);
    // const classes = {};

    // rows.array.forEach((row) => {
    //   const classId = row.class_id;

    //   if (!classes[classId]) {
    //     classes[classId] = {
    //       id: classId,
    //       class_name: row.class_name,
    //       start_date: row.start_date,
    //       end_date: row.end_date,
    //       class_img: row.class_img,
    //       level: {
    //         id: row.level_id,
    //         name: row.level_name,
    //         description: row.level_description,
    //       },
    //       syllabus: {
    //         id: row.syllabus_id,
    //         name: row.syllabus_name,
    //         description: row.syllabus_description,
    //       },
    //       members: row.members,
    //       member_limit: row.member_limit,
    //       type: row.type,
    //       session: row.session,
    //       status: row.status,
    //       created: row.created,
    //       deleted: row.deleted,
    //       created_by: row.created_by,
    //       managers: {},
    //     };
    //   }

    //   const managerRoleName = row.manager_role_name;

    //   if (!classes[classId].managers[managerRoleName]) {
    //     classes[classId].managers[managerRoleName] = {
    //       role_id: row.manager_role_id,
    //       role_name: managerRoleName,
    //       teachers: [],
    //     };
    //   }

    //   if (row.teacher_id) {
    //     classes[classId].managers[managerRoleName].teachers.push({
    //       id: row.teacher_id,
    //       name: row.teacher_name,
    //     });
    //   }
    // });

    // console.log(classes);

    // if (result.length == 0) return undefined;
    // return result[0];
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}

async function countClassByStatus() {
  try {
    const result = await db.query(`
    SELECT
    (SELECT COUNT(*) FROM classes WHERE current_date() BETWEEN start_date AND end_date AND deleted = 0) AS going_on,
    (SELECT COUNT(*) FROM classes WHERE current_date() > end_date AND deleted = 0) AS end,
    (SELECT COUNT(*) FROM classes WHERE current_date() < start_date AND deleted = 0) AS upcoming
FROM dual;
      `);
    if (result.length == 0) return undefined;

    return result[0];
  } catch (error) {
    return undefined;
  }
}

async function countTotalClass() {
  try {
    const result = await db.select(
      config.tb.class,
      "COUNT(*) AS total",
      "WHERE deleted = 0"
    );
    if (result.length == 0) return undefined;
    return result[0]["total"];
  } catch (error) {
    return undefined;
  }
}

async function getMembers(class_id) {
  try {
    const data = await db.select(
      `${config.tb.classMembers} m LEFT JOIN ${config.tb.student} s ON s.id = m.student_id LEFT JOIN ${config.tb.account} a ON a.id = m.created_by`,
      "s.id, s.name, s.gender, s.birthday, m.*, s.avatar, m.created_by, a.username, a.role, m.joined",
      `WHERE s.deleted = 0 AND m.class_id = ${class_id}`
    );

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
    const resultCount = await db.select(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id`,
      "*",
      `WHERE c.deleted = 0  AND c.end_date > CURRENT_DATE AND c.name like '%${searchText}%' OR c.session like '%${searchText}%'`
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
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function findUpcomingAndOngoingClasses(searchText, limit, offset) {
  try {
    const classesData = await db.selectLimit(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id`,
      "COUNT(*) AS total, c.*, l.name AS levelName, s.name AS syllabusName",
      `WHERE c.deleted = 0 AND c.end_date > CURRENT_DATE AND c.name like '%${searchText}%' OR c.session like '%${searchText}%' GROUP BY c.id`,
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

//! Đếm số lượng lớp được theo tên
async function countSearchClass(searchText) {
  try {
    const classesData = await db.select(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id`,
      "COUNT(*) AS total",
      `WHERE c.deleted = 0 AND (c.name like '%${searchText}%' OR c.session like '%${searchText}%' )`
    );
    return classesData[0].total;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
//! Đếm số lượng lớp theo status
async function countSearchClassWithStatus(searchText, status) {
  try {
    var statusString = "";
    if (status.match("0"))
      statusString +=
        "AND c.start_date <= CURRENT_DATE() AND c.end_date >= CURRENT_DATE()";
    if (status.match("1")) {
      statusString !== ""
        ? (statusString += "OR c.end_date < CURRENT_DATE()")
        : (statusString += "AND c.end_date < CURRENT_DATE()");
    }
    if (status.match("2")) {
      statusString !== ""
        ? (statusString += "OR c.start_date > CURRENT_DATE()")
        : (statusString += "AND c.start_date > CURRENT_DATE()");
    }
    const result = await db.select(
      `${config.tb.class} c`,
      "COUNT(*) total",
      `WHERE c.deleted = 0 AND c.name like '%${searchText}%' ${
        statusString || ""
      }`
    );

    if (result.length == 0) return undefined;

    return result[0]["total"];
  } catch (error) {
    return undefined;
  }
}

//! Đếm số lượng lớp theo status
async function countSearchClassWithStatusAndSession(
  searchText,
  status,
  session
) {
  try {
    var statusString = "";
    var statusString = "";
    if (status.match("0"))
      statusString +=
        "AND c.start_date <= CURRENT_DATE() AND c.end_date >= CURRENT_DATE()";
    if (status.match("1")) {
      statusString !== ""
        ? (statusString += "OR c.end_date < CURRENT_DATE()")
        : (statusString += "AND c.end_date < CURRENT_DATE()");
    }
    if (status.match("2")) {
      statusString !== ""
        ? (statusString += "OR c.start_date > CURRENT_DATE()")
        : (statusString += "AND c.start_date > CURRENT_DATE()");
    }
    const result = await db.select(
      `${config.tb.class} c`,
      "COUNT(*) total",
      `WHERE c.deleted = 0 AND c.session = ${session} AND c.name like '%${searchText}%' ${
        statusString || ""
      }`
    );

    if (result.length == 0) return undefined;

    return result[0]["total"];
  } catch (error) {
    return undefined;
  }
}

//! Đếm số lượng lớp được tim theo tên và niên khóa
async function countSearchClassWithSession(searchText, session) {
  try {
    const classesData = await db.select(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id`,
      "COUNT(*) AS total",
      `WHERE c.deleted = 0 AND  c.session = ${session}  AND (c.name like '%${searchText}%' OR c.session like '%${searchText}%' )`
    );
    console.log(session);
    return classesData[0].total;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

//! Search Tìm kiếm lớp học bằng tên
async function searchClass(searchText, limit, offset) {
  try {
    const response = await db.query(`
      SELECT 
          c.id,
          c.name as class_name,
          c.start_date,
          c.end_date,
          c.class_img,
          l.id as level_id,
          l.name as level_name,
          l.description as level_description,
          s.id as syllabus_id,
          s.name as syllabus_name,
          s.description as syllabus_description,
          c.members,
          c.member_limit,
          c.type,
          c.session,
          c.status,
          c.created,
          c.deleted,
          c.created_by
      FROM 
          classes c
      LEFT JOIN 
          levels l ON c.level_id = l.id
      LEFT JOIN 
          syllabus s ON c.syllabus_id = s.id
      WHERE 
          c.deleted = 0 AND c.name LIKE '%${searchText}%'
      LIMIT ${limit} OFFSET ${offset};
  `);

    if (response.length == 0) return undefined;

    for (const classItem in response) {
      const managers = await db.query(`
     SELECT cmr.name as role_name, cmr.id as role_id, t.id as teacher_id, t.name as teacher_name, t.avatar as teacher_avatar FROM class_managers cm LEFT JOIN  ${config.tb.managerRoles}  cmr ON cmr.id = cm.role  LEFT JOIN teachers t ON t.id = cm.teacher_id
     WHERE cm.class_id = ${response[classItem].id}`);

      response[classItem].managers = managers;
    }

    return response;
  } catch (error) {
    return undefined;
  }
}

//! Search Tìm kiếm lớp học bằng tên và niên khóa
async function searchClassWithSession(searchText, session, limit, offset) {
  try {
    const response = await db.query(`
      SELECT 
          c.id,
          c.name as class_name,
          c.start_date,
          c.end_date,
          c.class_img,
          l.id as level_id,
          l.name as level_name,
          l.description as level_description,
          s.id as syllabus_id,
          s.name as syllabus_name,
          s.description as syllabus_description,
          c.members,
          c.member_limit,
          c.type,
          c.session,
          c.status,
          c.created,
          c.deleted,
          c.created_by
      FROM 
          classes c
      LEFT JOIN 
          levels l ON c.level_id = l.id
      LEFT JOIN 
          syllabus s ON c.syllabus_id = s.id
      WHERE 
          c.deleted = 0 AND c.name LIKE '%${searchText}%' AND c.session = ${session}
      LIMIT ${limit} OFFSET ${offset};
  `);

    if (response.length == 0) return undefined;

    for (const classItem in response) {
      const managers = await db.query(`
     SELECT cmr.name as role_name, cmr.id as role_id, t.id as teacher_id, t.name as teacher_name, t.avatar as teacher_avatar FROM class_managers cm LEFT JOIN  ${config.tb.managerRoles}  cmr ON cmr.id = cm.role  LEFT JOIN teachers t ON t.id = cm.teacher_id
     WHERE cm.class_id = ${response[classItem].id}`);

      response[classItem].managers = managers;
    }

    return response;
  } catch (error) {
    return undefined;
  }
}

//! Tìm kiếm lớp học với trạng thái
async function searchClassWithStatus(searchText, status, limit, offset) {
  try {
    var statusString = "";
    if (status.match("0"))
      statusString +=
        "AND c.start_date <= CURRENT_DATE() AND c.end_date >= CURRENT_DATE()";
    if (status.match("1")) {
      statusString !== ""
        ? (statusString += "OR c.end_date < CURRENT_DATE()")
        : (statusString += "AND c.end_date < CURRENT_DATE()");
    }
    if (status.match("2")) {
      statusString !== ""
        ? (statusString += "OR c.start_date > CURRENT_DATE()")
        : (statusString += "AND c.start_date > CURRENT_DATE()");
    }

    const response = await db.query(`
      SELECT 
          c.id,
          c.name as class_name,
          c.start_date,
          c.end_date,
          c.class_img,
          l.id as level_id,
          l.name as level_name,
          l.description as level_description,
          s.id as syllabus_id,
          s.name as syllabus_name,
          s.description as syllabus_description,
          c.members,
          c.member_limit,
          c.type,
          c.session,
          c.status,
          c.created,
          c.deleted,
          c.created_by
      FROM 
          classes c
      LEFT JOIN 
          levels l ON c.level_id = l.id
      LEFT JOIN 
          syllabus s ON c.syllabus_id = s.id
      WHERE 
          c.deleted = 0 AND c.name LIKE '%${searchText}%' ${statusString || ""}
      LIMIT ${limit} OFFSET ${offset};
  `);

    if (response.length == 0) return undefined;

    for (const classItem in response) {
      const managers = await db.query(`
     SELECT cmr.name as role_name, cmr.id as role_id, t.id as teacher_id, t.name as teacher_name, t.avatar as teacher_avatar FROM class_managers cm LEFT JOIN  ${config.tb.managerRoles}  cmr ON cmr.id = cm.role  LEFT JOIN teachers t ON t.id = cm.teacher_id
     WHERE cm.class_id = ${response[classItem].id}`);

      response[classItem].managers = managers;
    }

    return response;

    // const result = await db.query(
    //   `SELECT
    //   JSON_ARRAYAGG(
    //       JSON_OBJECT(
    //           'id', c.id,
    //           'class_name', c.name,
    //           'start_date', c.start_date,
    //           'end_date', c.end_date,
    //           'class_img', c.class_img,
    //           'level', JSON_OBJECT(
    //               'id', l.id,
    //               'name', l.name,
    //               'description', l.description
    //           ),
    //           'syllabus', JSON_OBJECT(
    //               'id', s.id,
    //               'name', s.name,
    //               'description', s.description
    //           ),
    //           'members', c.members,
    //           'member_limit', c.member_limit,
    //           'type', c.type,
    //           'session', c.session,
    //           'status', c.status,
    //           'created', c.created,
    //           'deleted', c.deleted,
    //           'created_by', c.created_by,
    //           'managers', (
    //               SELECT JSON_OBJECTAGG(
    // 			cmr.name,
    //                 JSON_OBJECT(
    // 				'role_id', cmr.id,
    //                     'role_name', cmr.name,
    //                     'teachers', (
    // 					SELECT JSON_OBJECT(
    // 						'name', t.name,
    //                             'id', t.id
    // 					)
    //                         FROM teachers t
    //                         LEFT JOIN  class_managers cm1
    //                         ON cm1.teacher_id = t.id
    //                         WHERE cm1.role = cmr.id AND cm1.class_id = c.id AND t.deleted = 0
    //                     )
    //                 )
    //               )
    //               FROM class_manager_roles cmr
    //               LEFT JOIN class_managers cm
    //               ON cmr.id = cm.role
    //               WHERE cmr.deleted = 0
    //           )
    //       )
    //   ) AS classes
    //   FROM
    //       classes c
    //   LEFT JOIN
    //       levels l ON c.level_id = l.id
    //   LEFT JOIN
    //       syllabus s ON c.syllabus_id = s.id
    //   WHERE
    //       c.deleted = 0
    //     AND c.name like '%${searchText}%' ${statusString || ""}
    //   LIMIT ${limit}
    //   OFFSET ${offset};`
    // );

    // if (result.length == 0) {
    //   return undefined;
    // }

    // return result[0];
  } catch (error) {
    return undefined;
  }
}

async function searchClassWithStatusAndSession(
  searchText,
  session,
  status,
  limit,
  offset
) {
  try {
    var statusString = "";
    if (status.match("0"))
      statusString +=
        "AND c.start_date <= CURRENT_DATE() AND c.end_date >= CURRENT_DATE()";
    if (status.match("1")) {
      statusString !== ""
        ? (statusString += "OR c.end_date < CURRENT_DATE()")
        : (statusString += "AND c.end_date < CURRENT_DATE()");
    }

    if (status.match("2")) {
      statusString !== ""
        ? (statusString += "OR c.start_date > CURRENT_DATE()")
        : (statusString += "AND c.start_date > CURRENT_DATE()");
    }

    const response = await db.query(`
      SELECT 
          c.id,
          c.name as class_name,
          c.start_date,
          c.end_date,
          c.class_img,
          l.id as level_id,
          l.name as level_name,
          l.description as level_description,
          s.id as syllabus_id,
          s.name as syllabus_name,
          s.description as syllabus_description,
          c.members,
          c.member_limit,
          c.type,
          c.session,
          c.status,
          c.created,
          c.deleted,
          c.created_by
      FROM 
          classes c
      LEFT JOIN 
          levels l ON c.level_id = l.id
      LEFT JOIN 
          syllabus s ON c.syllabus_id = s.id
      WHERE 
          c.deleted = 0 AND c.session = ${session} AND  c.name LIKE '%${searchText}%' ${
      statusString || ""
    }
      LIMIT ${limit} OFFSET ${offset};
  `);

    if (response.length == 0) return undefined;

    for (const classItem in response) {
      const managers = await db.query(`
     SELECT cmr.name as role_name, cmr.id as role_id, t.id as teacher_id, t.name as teacher_name, t.avatar as teacher_avatar FROM class_managers cm LEFT JOIN  ${config.tb.managerRoles}  cmr ON cmr.id = cm.role  LEFT JOIN teachers t ON t.id = cm.teacher_id
     WHERE cm.class_id = ${response[classItem].id}`);

      response[classItem].managers = managers;
    }

    return response;

    // const result = await db.query(
    //   `SELECT
    //   JSON_ARRAYAGG(
    //       JSON_OBJECT(
    //           'id', c.id,
    //           'class_name', c.name,
    //           'start_date', c.start_date,
    //           'end_date', c.end_date,
    //           'class_img', c.class_img,
    //           'level', JSON_OBJECT(
    //               'id', l.id,
    //               'name', l.name,
    //               'description', l.description
    //           ),
    //           'syllabus', JSON_OBJECT(
    //               'id', s.id,
    //               'name', s.name,
    //               'description', s.description
    //           ),
    //           'members', c.members,
    //           'member_limit', c.member_limit,
    //           'type', c.type,
    //           'session', c.session,
    //           'status', c.status,
    //           'created', c.created,
    //           'deleted', c.deleted,
    //           'created_by', c.created_by,
    //           'managers', (
    //               SELECT JSON_OBJECTAGG(
    // 			cmr.name,
    //                 JSON_OBJECT(
    // 				'role_id', cmr.id,
    //                     'role_name', cmr.name,
    //                     'teachers', (
    // 					SELECT JSON_OBJECT(
    // 						'name', t.name,
    //                             'id', t.id
    // 					)
    //                         FROM teachers t
    //                         LEFT JOIN  class_managers cm1
    //                         ON cm1.teacher_id = t.id
    //                         WHERE cm1.role = cmr.id AND cm1.class_id = c.id AND t.deleted = 0
    //                     )
    //                 )
    //               )
    //               FROM class_manager_roles cmr
    //               LEFT JOIN class_managers cm
    //               ON cmr.id = cm.role
    //               WHERE cmr.deleted = 0
    //           )
    //       )
    //   ) AS classes
    //   FROM
    //       classes c
    //   LEFT JOIN
    //       levels l ON c.level_id = l.id
    //   LEFT JOIN
    //       syllabus s ON c.syllabus_id = s.id
    //   WHERE
    //       c.deleted = 0
    //     AND c.session = ${session}
    //     AND c.name like '%${searchText}%' ${statusString || ""}
    //   LIMIT ${limit}
    //   OFFSET ${offset};`
    // );

    // if (result.length == 0) {
    //   return undefined;
    // }

    // return result[0];
  } catch (error) {
    return undefined;
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
async function getClassManagerRoles() {
  try {
    const res = await db.select(
      config.tb.managerRoles,
      "*",
      "WHERE deleted= 0"
    );
    console.log(res);
    return res;
  } catch (err) {
    console.error("Error executing query", err);
  }
}
async function getClassManagerRolesByClassId(classId) {
  try {
    const result = await db.select(
      `${config.tb.managerRole} cmr LEFT JOIN ${config.tb.classManager} cm ON cm.role = cmr.id LEFT JOIN ${config.tb.teacher} tc ON tc.id = cm.teacher_id`,
      "cmr.id AS role_id, cmr.name AS role_name, tc.id AS teacher_id, tc.name AS teacher_name, tc.avatar AS teacher_avatar",
      `WHERE cm.class_id =${classId} AND cmr.deleted = 0`
    );

    return result;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
async function getClassTeachers(classId) {
  try {
    const result = await db.select(
      `${config.tb.classManager} cm LEFT JOIN ${config.tb.managerRoles} mr ON mr.id = cm.role LEFT JOIN ${config.tb.teacher} t ON t.id = cm.teacher_id`,
      "t.*, cm.role, mr.name as role_name",
      `WHERE cm.class_id = ${classId} AND mr.deleted = 0`
    );

    return result;
  } catch (error) {
    return false;
  }
}

async function getClassById(classID) {
  try {
    const result = await db.select(
      `${config.tb.class} c LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id`,
      " c.*, l.name AS levelName, s.name AS syllabusName",
      `WHERE c.id = ${classID} AND c.deleted = 0`
    );

    const teachers = await getClassTeachers(classID);

    if (teachers) {
      result[0].teachers = teachers;
    }

    return result[0];
  } catch (error) {
    return false;
  }
}

//Hàm dùng để tạo giáo viên quản lý cho lớp nếu chưa có
async function createClassManagerByClassId(data) {
  try {
    const result = db.insert(config.tb.classManager, data);
    if (result.effectedRows == 0) {
      return {
        success: false,
        error: "Thất bại",
      };
    }
    return {
      success: true,
      message: "Thành công.",
    };
  } catch (error) {
    return {
      success: false,
      error: error.sqlMessage,
    };
  }
}

async function updateClassManagerClassId(classId, role, teacherId) {
  try {
    const result = db.update(
      config.tb.classManager,
      { teacher_id: teacherId },
      { class_id: classId, role: role }
    );
    if (result.effectedRows == 0) {
      return {
        success: false,
        error: "Thất bại",
      };
    }
    return {
      success: true,
      error: "Thành công.",
    };
  } catch (error) {
    return {
      success: false,
      error: error.sqlMessage,
    };
  }
}

//Hàm kiểm tra lớp đã có role quản lý đó hay chưa
async function isExistManagementPosition(classId, role) {
  try {
    const result = await db.select(
      config.tb.classManager,
      "*",
      `WHERE class_id = ${classId} AND role = ${role}`
    );
    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
