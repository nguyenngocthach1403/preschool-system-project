const db = require("../config/db.service");
const config = require("../config/config");
const classManagerService = require("../class_manager/class_manager.service");

module.exports = {
  getTeacher,
  getClassManagedByTeacher,
  countTeacher,
  countSearchTeacher,
  searchTeacher,
  isDuplicate,
  createTeacher,
  isExistTeacher,
  updateTeacher,
  getByID,
  deleteTeacher,
  getSpecializationByTeacher,
  getCertificateByTeacher,
  createTeacherSpecialization,
  createTeacherCertificate,
  getClassCurrent,
  getClassHistory,
  getTeacherForAssignment,
  isExistTeacherByID,
  getAssignmentTeacher,
  getScheduleTeacher,
  getTeacherByAccountId,
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
//Lấy danh sách giáo viên và số lượng được phân công.
async function getAssignmentTeacher(limit, offset) {
  try {
    const result = await db.query(
      `
      WITH TeacherList AS (
          SELECT
            *
          FROM teachers t
          WHERE t.deleted = 0
          LIMIT ${limit}
          OFFSET ${offset}
      )
      SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
              'id', tl.id,
              'name', tl.name,
              'gender', tl.gender,
              'birthday', tl.birthday,
              'phone', tl.phone,
              'email', tl.email,
              'address', tl.address,
              'status', tl.status,
              'description', tl.description,
              'seniority', tl.seniority,
              'type', tl.type,
              'city', tl.city,
              'district', tl.district,
              'ward', tl.ward,
              'managed_classes', (
                  SELECT JSON_ARRAYAGG(
                      JSON_OBJECT(
                          'class_id', c.id,
                          'class_name', c.name,
                          'class_start_date', c.start_date,
                          'class_end_date', c.end_date,
                          'class_img', c.class_img,
                          'members', c.members,
                          'member_limit', c.member_limit,
                          'class_type', c.type,
                          'session', c.session,
                          'class_status', c.status,
                          'manager_role', JSON_OBJECT(
                              'role_id', cmr.id,
                              'role_name', cmr.name
                          )
                      )
                  )
                  FROM class_managers cm
                  LEFT JOIN class_manager_roles cmr ON cm.role = cmr.id
                  LEFT JOIN classes c ON cm.class_id = c.id
                  WHERE cm.teacher_id = tl.id
                    AND CURRENT_DATE() > c.end_date
              ),
              'current_classes_list', (
                  SELECT JSON_ARRAYAGG(
                      JSON_OBJECT(
                          'class_id', c.id,
                          'class_name', c.name,
                          'class_start_date', c.start_date,
                          'class_end_date', c.end_date,
                          'class_img', c.class_img,
                          'members', c.members,
                          'member_limit', c.member_limit,
                          'class_type', c.type,
                          'session', c.session,
                          'class_status', c.status,
                          'manager_role', JSON_OBJECT(
                              'role_id', cmr.id,
                              'role_name', cmr.name
                          )
                      )
                  )
                  FROM class_managers cm
                  LEFT JOIN class_manager_roles cmr ON cm.role = cmr.id
                  LEFT JOIN classes c ON cm.class_id = c.id
                  WHERE cm.teacher_id = tl.id
                    AND CURRENT_DATE() BETWEEN c.start_date AND c.end_date
              )
          )
      ) AS assignmented
      FROM TeacherList tl;
      `
    );
    if (result.length == 0) return undefined;

    return result[0];
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
//Lấy danh sách giao viên để phân công giáo viên chủ nhiệm vào lớp
async function getTeacherForAssignment(
  searchText,
  startDate,
  endDate,
  limit,
  offset
) {
  //Điều kiện giáo viên chưa có phân công nào là chủ nhệm của một lớp đang diễn ra hoặc sắp diễm ra
  try {
    const query = `
    SELECT 
        t.id, 
        t.avatar, 
        t.name, 
        t.gender, 
        t.birthday, 
        t.phone, 
        t.email, 
        t.address, 
        t.status, 
        t.account_id, 
        t.description, 
        t.seniority, 
        t.type, 
        t.city, 
        t.district, 
        t.ward, 
        t.created, 
        t.deleted
    FROM 
        teachers t
    LEFT JOIN 
        class_managers cm ON t.id = cm.teacher_id AND cm.role = 1
    LEFT JOIN 
        classes c ON cm.class_id = c.id
    WHERE (t.name like ? OR t.phone like ? OR t.email like ?) AND
        (cm.class_id IS NULL OR NOT (
            (c.start_date BETWEEN ? AND ?) OR
            (c.end_date BETWEEN ? AND ?) OR
            (? BETWEEN c.start_date AND c.end_date) OR
            (? BETWEEN c.start_date AND c.end_date)
        )) LIMIT ? OFFSET ?;
`;
    const data = await db.query(query, [
      `%${searchText}%`,
      `%${searchText}%`,
      `%${searchText}%`,
      startDate,
      endDate,
      startDate,
      endDate,
      startDate,
      endDate,
      parseInt(limit),
      parseInt(offset),
    ]);

    const uniqueTeachers = data.filter(
      (teacher, index, self) =>
        index === self.findIndex((t) => t.id === teacher.id)
    );
    for (let index = 0; index < uniqueTeachers.length; index++) {
      const teacher = uniqueTeachers[index];
      const specialization = await getSpecializationByTeacher(teacher.id);
      const certificates = await getCertificateByTeacher(teacher.id);
      const class_attended_count = await countClassManagerByTeacher(teacher.id);
      teacher.specialization_managed = specialization || [];
      teacher.certificate_managed = certificates || [];
      teacher.class_attended_count = class_attended_count || 0;
    }
    return uniqueTeachers;
  } catch (error) {
    console.error(error);
    return undefined;
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

//Đếm số lượng class mà giáo viên đã tham gia
async function countClassManagerByTeacher(teacherId) {
  //   `SELECT COUNT(cm.class_id) AS class_manager_count FROM teachers t LEFT JOIN class_managers cm ON t.id = cm.teacher_id WHERE t.id = teacherId
  //Điều kiện lớp phải có mã giáo viên(teacherID)
  try {
    const result = await db.select(
      `${config.tb.teacher} t LEFT JOIN ${config.tb.classManager} cm ON t.id = cm.teacher_id`,
      "COUNT(cm.class_id) AS class_manager_count",
      `WHERE t.id = ${teacherId}`
    );
    if (result.length == 0) return undefined;

    return result[0]["class_manager_count"];
  } catch (error) {
    return undefined;
  }
}

async function getSpecializationByTeacher(teacherId) {
  try {
    const data = await db.select(
      `${config.tb.teacher} tea LEFT JOIN ${config.tb.teacher_specialization} teaSpe ON tea.id = teaSpe.teacher_id LEFT JOIN ${config.tb.specialization} spe ON spe.id = teaSpe.specialization_id`,
      "tea.id as TeacherId, tea.name as TeacherName, spe.name AS SpecializationName",
      `WHERE tea.deleted = 0 AND teaSpe.teacher_id = ${teacherId}`
    );
    return data || [];
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
async function getCertificateByTeacher(teacherId) {
  try {
    const data = await db.select(
      `${config.tb.teacher} tea LEFT JOIN ${config.tb.teacher_certificates} teaCer ON tea.id = teaCer.teacher_id LEFT JOIN ${config.tb.certificates} cer ON cer.id = teaCer.certificate_id`,
      "tea.id as TeacherId, tea.name as TeacherName, cer.name AS CertificateName",
      `WHERE tea.deleted = 0 AND teaCer.teacher_id = ${teacherId}`
    );
    return data || [];
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
async function getByID(id) {
  try {
    return db.select(
      `${config.tb.teacher} t LEFT JOIN ${config.tb.account} a ON t.account_id = a.id`,
      "t.*, a.*,t.email AS EmailTeacher, t.phone AS PhoneTeacher , t.status AS StatusTeacher,a.username, a.email AS EmailAccount, a.phone AS PhoneAccount ,a.status AS StatusAccount",
      id !== undefined ? `Where t.id = ${id}` : ""
    );
  } catch (error) {
    return error;
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
// async function searchTeacher(txtSearch, page, limit) {
//   try {
//     return db.selectLimit(
//       config.tb.teacher,
//       "*",
//       `WHERE deleted = 0 AND name LIKE '%${txtSearch}%' OR email LIKE '%${txtSearch}%' OR phone LIKE '%${txtSearch}%'`,
//       `LIMIT ${limit}`,
//       `OFFSET ${limit * page}`
//     );
//   } catch (error) {
//     return {
//       code: error.code,
//       message: "An error occusred while excuted query",
//     };
//   }
// }
async function searchTeacher(txtSearch, page, limit) {
  try {
    const data = await db.selectLimit(
      config.tb.teacher,
      "*",
      `WHERE deleted = 0 AND (name LIKE '%${txtSearch}%' OR email LIKE '%${txtSearch}%')`,
      `LIMIT ${limit}`,
      `OFFSET ${limit * page}`
    );

    console.log(txtSearch);

    for (let index = 0; index < data.length; index++) {
      const teacher = data[index];
      const specialization = await getSpecializationByTeacher(teacher.id);
      const certificates = await getCertificateByTeacher(teacher.id);
      teacher.specialization_managed = specialization || [];
      teacher.certificate_managed = certificates || [];
    }

    return data;
  } catch (error) {
    console.error("An error occurred while searching for teachers:", error);
    return {
      code: error.code,
      message: "An error occurred while executing query",
    };
  }
}

async function isDuplicate(email, phone) {
  try {
    const result = await db.select(
      config.tb.teacher,
      "*",
      `WHERE email = '${email}' OR phone = '${phone}'`
    );
    return result.length > 0;
  } catch (error) {
    throw error;
  }
}
async function createTeacher(dataToCreate) {
  try {
    const data = await db.insert(config.tb.teacher, dataToCreate);
    if (data.affectedRows == 0) {
      return {
        success: false,
        message: "Quá trình thêm dữ liệu giáo viên thất bại. Hãy thử lại.",
      };
    }
    return {
      success: true,
      message: "Tạo giáo viên thành công",
      data: data.insertId,
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function isExistTeacher(id) {
  try {
    const result = await db.select(
      config.tb.teacher,
      "*",
      `WHERE deleted = 0 AND id = ${id}`
    );
    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
async function updateTeacher(id, dataToUpdate) {
  try {
    //Xóa các key bị trống
    const keys = Object.keys(dataToUpdate);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (dataToUpdate[key] == undefined) {
        delete dataToUpdate[key];
      }
    }

    const result = await db.update(config.tb.teacher, dataToUpdate, { id: id });

    if (result == 0) {
      return {
        success: false,
        message: "Cập nhập giáo viên thất bại. Hãy thử lại.",
      };
    }
    return {
      success: true,
      message: "Cập nhập giáo viên thành công",
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function deleteTeacher(idTeacherToDel) {
  try {
    return db.update(config.tb.teacher, { deleted: 1 }, { id: idTeacherToDel });
  } catch (error) {
    return {
      code: error.code,
      message: "Delete Fail",
    };
  }
}
async function createTeacherSpecialization(dataToCreate) {
  try {
    const teacherId = await db.insert(
      config.tb.teacher_specialization,
      dataToCreate
    );
    if (teacherId.effectedRows == 0) {
      return {
        success: false,
        message: "Quá trình thêm dữ liệu thất bại. Hãy thử lại.",
      };
    }
    return {
      success: true,
      message: "Tạo thành công",
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function createTeacherCertificate(dataToCreate) {
  try {
    const teacherId = await db.insert(
      config.tb.teacher_certificates,
      dataToCreate
    );
    if (teacherId.effectedRows == 0) {
      return {
        success: false,
        message: "Quá trình thêm dữ liệu thất bại. Hãy thử lại.",
      };
    }
    return {
      success: true,
      message: "Tạo thành công",
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function getClassCurrent(teacherId) {
  try {
    const now = new Date().toLocaleDateString();
    const date = now.split("/");
    return await db.select(
      `${config.tb.class} c
      LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id
      LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id
      LEFT JOIN ${config.tb.classManager} cm ON c.id = cm.class_id
      LEFT JOIN ${config.tb.managerRole} cmr ON cm.role = cmr.id`,
      "c.*, c.name AS ClassName, l.name AS levelsName, s.name AS syllabusName, cmr.name AS RoleName",
      `WHERE c.deleted = 0 AND c.end_date > '${date[2]}-${date[0]}-${date[1]}'  AND cm.teacher_id = ${teacherId}`
    );
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}
async function getClassHistory(teacherId) {
  try {
    const now = new Date().toLocaleDateString();
    const date = now.split("/");
    return await db.select(
      `${config.tb.class} c
      LEFT JOIN ${config.tb.sysllabus} s ON c.syllabus_id = s.id
      LEFT JOIN ${config.tb.levels} l ON c.level_id = l.id
      LEFT JOIN ${config.tb.classManager} cm ON c.id = cm.class_id
      LEFT JOIN ${config.tb.managerRole} cmr ON cm.role = cmr.id`,
      "c.*, c.name AS ClassName, l.name AS levelsName, s.name AS syllabusName, cmr.name AS RoleName",
      `WHERE c.deleted = 0 AND c.end_date < '${date[2]}-${date[0]}-${date[1]}'  AND cm.teacher_id = ${teacherId}`
    );
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}
async function isExistTeacherByID(teacherId) {
  try {
    const result = await db.select(
      config.tb.teacher,
      "*",
      `WHERE id = ${teacherId} AND deleted = 0`
    );
    if (result.length == 0) return false;
    return true;
  } catch (error) {
    return false;
  }
}
//Lấy danh sách các lớp giảng dạy để đưa lên lịch
async function getScheduleTeacher(teacherId) {
  try {
    return await db.select(
      `${config.tb.class} c LEFT JOIN ${config.tb.classManager} cm ON c.id = cm.class_id`,
      "c.*",
      `WHERE cm.teacher_id = ${teacherId} AND c.deleted = 0`
    );
  } catch (error) {
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}
async function getTeacherByAccountId(accountId) {
  try {
    const data = await db.select(
      `${config.tb.teacher}`,
      "*",
      `WHERE account_id = ${accountId}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
