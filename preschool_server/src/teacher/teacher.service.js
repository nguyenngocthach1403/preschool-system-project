const db = require("../config/db.service");
const config = require("../config/config");

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
async function getByID(id) {
  try {
    return db.select(
      `${config.tb.teacher} t LEFT JOIN ${config.tb.account} a ON t.account_id = a.id`,
      "t.*, t.email AS EmailTeacher, t.phone AS PhoneTeacher , t.status AS StatusTeacher,a.username, a.email AS EmailAccount, a.phone AS PhoneAccount ,a.status AS StatusAccount",
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
    };
  } catch (error) {
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
