const config = require("../../src/config/config");
const db = require("../config/db.service");
const checkService = require("../config/check.service");

module.exports = {
  getAllStudents,
  getStudentByID,
  getStudent,
  countStudent,
  searchStudent,
  countSearchStudent,
  deleteStudent,
  createNewStudent,
  getParentBuStudentId,
  createRelatioship,
  updateStudent,
  isExistStudent,
  isExistRelationship,
  deleteRelationship,
  getStudentWithoutClass,
  searchStudentWithoutClass,
};

async function createNewStudent(studentToCreate) {
  try {
    const result = await db.insert(config.tb.student, studentToCreate);

    if (result.effectedRows == 0) {
      return false;
    }

    return {
      success: true,
      insertId: result.insertId,
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      message: error.sqlMessage,
    };
  }
}

async function deleteRelationship(studentId, parentId) {
  try {
    const result = await db.deleteRow(
      config.tb.relationship,
      `WHERE parent_id = ${parentId} AND student_id = ${studentId}`
    );

    if (result == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function getStudentWithoutClass(limit, offset) {
  try {
    const data = await db.selectLimit(
      config.tb.student,
      "*",
      "WHERE deleted = 0 AND class_id is NULL AND status = 1 AND study_status = 0",
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function searchStudentWithoutClass(searchText, limit, offset) {
  try {
    const data = await db.selectLimit(
      config.tb.student,
      "*",

      checkService.isNumber(searchText)
        ? `WHERE (id = ${searchText} OR name like '%${searchText}%') AND deleted = 0 AND class_id is NULL AND status = 1`
        : `WHERE name like '%${searchText}%' AND deleted = 0 AND class_id is NULL AND status = 1 AND study_status = 0`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function isExistRelationship(studentId, parentId) {
  try {
    const result = await db.select(
      config.tb.relationship,
      "*",
      `WHERE parent_id = ${parentId} AND student_id = ${studentId}`
    );

    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function createRelatioship(data) {
  try {
    const result = await db.insert(config.tb.relationship, data);
    if (result.effectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function createIDStudent() {
  try {
    const year = new Date().getFullYear();
    const res = await db.select(
      `${config.tb.student}`,
      "Count(*) AS total",
      `WHERE Students.created like '%${year}%'`
    );

    const idCreated = `${year}` + `${padNumber(res[0]["total"] + 1)}`;

    return idCreated;
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}

function padNumber(number) {
  if (number < 10) {
    return "000" + number;
  } else if (number < 100) {
    return "00" + number;
  } else if (number < 1000) {
    return "0" + number;
  } else {
    return number;
  }
}

function getKey(studentToCreate) {
  const keys = Object.keys(studentToCreate);
  return keys;
}

function formatStudentJson(data) {
  let students = [];
  data.forEach((element) => {
    if (students.some((obj) => obj.id === element.id)) {
      const elementExited = students.find((obj) => obj.id === element.id);
      elementExited.parent = [
        ...elementExited.parent,
        {
          parentId: element["parentId"],
          parentName: element["parentName"],
          relationship: element["relationship"],
        },
      ];
    } else {
      if (element.parentId) {
        element.parent = [
          {
            parentId: element["parentId"],
            parentName: element["parentName"],
            relationship: element["relationship"],
          },
        ];
        delete element.parentId;
        delete element.parentName;
        delete element.relationship;
      } else {
        element.parent = [];
      }
      students.push(element);
    }
  });

  return students;
}

async function getAllStudents() {
  try {
    const data = await db.select(
      `${config.tb.student} s LEFT JOIN ${config.tb.class} c ON s.class_id = c.id LEFT JOIN ${config.tb.relationship} r ON s.id = r.student_id LEFT JOIN ${config.tb.parent} p ON p.id = r.parent_id`,
      "s.id, s.name, s.avatar, s.birthday, s.gender, s.fork, s.nation, s.place_of_birth, s.status, s.created, c.id AS classID, c.name AS className, r.relationship, p.name AS parentName, p.id AS parentId",
      "WHERE s.deleted = 0"
    );
    return formatStudentJson(data);
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}

async function countStudent() {
  try {
    //Excute query select
    return await db.select(
      `${config.tb.student} AS s`,
      "Count(*) AS total",
      "WHERE s.deleted = 0"
    );
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}

async function searchStudent(txtSearch, offset, limit) {
  try {
    const data = await db.selectLimit(
      `${config.tb.student} s LEFT JOIN ${config.tb.class} c ON s.class_id = c.id`,
      "s.*, c.id AS classID, c.name AS className",
      `WHERE s.deleted = 0 AND s.name LIKE '%${txtSearch}%' OR s.id = '%${txtSearch}%' AND s.status = 1`,
      `LIMIT ${limit}`,
      `OFFSET ${offset * limit}`
    );

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const parents = await getParentBuStudentId(element.id);
      if (parents.length === 0) {
        element.parents = [];
      } else {
        element.parents = parents;
      }
    }

    return data;
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}

async function countSearchStudent(txtSearch) {
  try {
    return await db.select(
      `${config.tb.student} s LEFT JOIN ${config.tb.class} c ON s.class_id = c.id`,
      "Count(*) AS total",
      `WHERE s.deleted = 0 AND s.name LIKE '%${txtSearch}%' OR s.id = '%${txtSearch}%' AND s.status = 1`
    );
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}

async function getStudentByID(id) {
  try {
    const data = await db.selectLimit(
      `${config.tb.student} s LEFT JOIN ${config.tb.class} c ON s.class_id = c.id`,
      "s.*, c.id AS classID, c.name AS className",
      `WHERE s.deleted = 0 AND s.id = ${id} `
    );

    const parents = await getParentBuStudentId(id);
    if (parents.length === 0) {
      data[0].parents = [];
    } else {
      data[0].parents = parents;
    }

    return data[0];
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
      message: "An error occusred while excuted query",
    };
  }
}

async function isExistStudent(id) {
  try {
    const student = await db.select(
      config.tb.student,
      "*",
      `WHERE deleted = 0 AND id = ${id}`
    );

    if (student.length == 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function updateStudent(id, dataToUpdate) {
  try {
    const keys = Object.keys(dataToUpdate);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (dataToUpdate[key] == undefined) {
        delete dataToUpdate[key];
      }
    }

    const result = await db.update(config.tb.student, dataToUpdate, { id: id });

    if (result != 1) {
      return false;
    }

    return true;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
      message: "An error occusred while excuted query",
    };
  }
}

async function deleteStudent(idStudentToDel) {
  try {
    return db.update(
      config.tb.student,
      { deleted: true },
      { id: idStudentToDel }
    );
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}

async function deleteStudenPermanently(idStudentToDel) {
  try {
    const result = await db.deleteRow(
      config.tb.student,
      `WHERE id = ${idStudentToDel}`
    );
    if (result == 0) {
      return { success: false, message: "Xóa thất bại." };
    }
    return { success: true, message: "Xóa thành công." };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function getParentBuStudentId(id) {
  try {
    const data = await db.select(
      `${config.tb.relationship} r 
    LEFT JOIN ${config.tb.parent} p ON r.parent_id = p.id `,
      "p.* , r.relationship",
      `WHERE r.student_id = ${id}`
    );
    return data;
  } catch (error) {
    return error;
  }
}

async function getStudent(offset, limit) {
  try {
    // const result = db.query(
    //   `SELECT
    //     JSON_ARRAYAGG(
    //       JSON_OBJECT(
    //           'id', s.id,
    //           'avatar', s.avatar,
    //           'name', s.name,
    //           'gender', s.gender,
    //           'birthday', s.birthday,
    //           'address', s.address,
    //           'fork', s.fork,
    //           'nation', s.nation,
    //           'place_of_birth', s.place_of_birth,
    //           'place_of_origin', s.place_of_origin,
    //           'class', (SELECT
    //                       JSON_OBJECT(
    //                         'class_id', c.id,
    //                         'class_name', c.name
    //                       )
    //                     FROM
    //                       classes c
    //                     WHERE
    //                       c.id = s.class_id
    //                     ),
    //           'study_status', s.study_status,
    //           'status', s.status,
    //           'created', s.created,
    //           'parents', (
    //               SELECT
    //                   JSON_ARRAYAGG(
    //                       JSON_OBJECT(
    //                           'id', p.id,
    //                           'avatar', p.avatar,
    //                           'name', p.name,
    //                           'gender', p.gender,
    //                           'birthday', p.birthday,
    //                           'phone', p.phone,
    //                           'email', p.email,
    //                           'job', p.job,
    //                           'address', p.address,
    //                           'role', p.role,
    //                           'status', p.status,
    //                           'account_id', p.account_id,
    //                           'created', p.created,
    //                           'relationship', r.relationship
    //                       )
    //                   )
    //               FROM
    //                   relationship r
    //               JOIN
    //                   parents p ON r.parent_id = p.id
    //               WHERE
    //                   r.student_id = s.id
    //           )
    //       )
    // ) AS students
    // FROM
    //   students s
    // LEFT JOIN
    //   classes c
    // ON
    //   s.class_id = c.id
    // WHERE
    //   s.deleted = 0
    // LIMIT ?
    // OFFSET ?;`,
    //   [parseInt(limit), parseInt(offset)]
    // );
    // if (result.length == 0) return undefined;

    // return result;

    const studentResponse = await db.selectLimit(
      `${config.tb.student} s LEFT JOIN ${config.tb.class} c ON s.class_id = c.id`,
      "s.*, c.id as class_id, c.name as class_name",
      `WHERE s.deleted = 0`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );

    if (studentResponse.length == 0) return undefined;

    for (const student in studentResponse) {
      const parents = await db.select(
        `${config.tb.relationship} r LEFT JOIN ${config.tb.parent} p ON p.id = r.parent_id`,
        "p.id, p.name, r.relationship",
        `WHERE r.student_id = ${studentResponse[student].id}`
      );

      console.log(parents);

      studentResponse[student].parents = parents;
    }
    return studentResponse;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
