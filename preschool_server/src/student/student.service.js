const config = require("../../src/config/config");
const db = require("../config/db.service");

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
};

async function createNewStudent(studentToCreate) {
  try {
    const id = await createIDStudent();
    studentToCreate.id = parseInt(id, 10);
    return await db.insert(config.tb.student, studentToCreate);
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
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
  console.log(keys);
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
      `${config.tb.student} s LEFT JOIN ${config.tb.class} c ON s.classID = c.classID LEFT JOIN ${config.tb.relationship} r ON s.id = r.studentID LEFT JOIN ${config.tb.parent} p ON p.id = r.parentID`,
      "s.id, s.name, s.avatarPath, s.birthday, s.gender, s.fork, s.nation, s.placeOfBirth, s.status, s.created, c.classID, c.className, r.relationship, p.name AS parentName, p.id AS parentId",
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
      `${config.tb.student} s LEFT JOIN ${config.tb.class} c ON s.classID = c.classID`,
      "s.id, s.name, s.avatarPath, s.birthday, s.gender, s.fork, s.nation, s.placeOfBirth, s.status, s.created, c.classID, c.className",
      `WHERE s.deleted = 0 AND s.name LIKE '%${txtSearch}%' OR s.id = '%${txtSearch}%'`,
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
      `${config.tb.student} s LEFT JOIN ${config.tb.class} c ON s.classID = c.classID`,
      "Count(*) AS total",
      `WHERE s.deleted = 0 AND s.name LIKE '%${txtSearch}%' OR s.id = '%${txtSearch}%'`
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
      `${config.tb.student} s LEFT JOIN ${config.tb.class} c ON s.classID = c.classID`,
      "s.id, s.name, s.avatarPath, s.birthday, s.gender, s.fork, s.nation, s.placeOfBirth, s.status, s.created, c.classID, c.className",
      `WHERE s.deleted = 0 AND s.id = ${id} `
    );

    const parents = await getParentBuStudentId(id);
    if (parents.length === 0) {
      element.parents = [];
    } else {
      element.parents = parents;
    }

    return data;
  } catch (error) {
    return {
      code: error.code,
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

async function getParentBuStudentId(id) {
  try {
    const data = await db.select(
      `${config.tb.relationship} r 
    LEFT JOIN ${config.tb.parent} p ON r.parentId = p.id `,
      "p.* , r.relationship",
      `WHERE r.studentId = ${id}`
    );
    return data;
  } catch (error) {
    return error;
  }
}

async function getStudent(offset, limit) {
  try {
    const data = await db.selectLimit(
      `${config.tb.student} s LEFT JOIN ${config.tb.class} c ON s.classID = c.classID`,
      "s.id, s.name, s.avatarPath, s.birthday, s.gender, s.fork, s.nation, s.placeOfBirth, s.status, s.created, c.classID, c.className",
      "WHERE s.deleted = 0",
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
