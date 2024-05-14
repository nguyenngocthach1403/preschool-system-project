const db = require("../config/db");
require("dotenv").config();

module.exports = {
  getAll,
  getByID,
  getPage,
  countStudent,
  searchStudent,
  countSearchStudent,
  deleteStudent,
  createNewStudent,
};

async function createNewStudent(studentToCreate) {
  //Add ID for student
  // Structure Id -> [year][stt]
  //get total student this year
  const id = await createIDStudent();
  studentToCreate.id = parseInt(id, 10);
  return await db.insert(process.env.STUDENT_TB, studentToCreate);
}

async function createIDStudent() {
  const year = new Date().getFullYear();

  console.log(year);
  const res = await db.select(
    "Students",
    "Count(*) AS total",
    `WHERE Students.created like '%${year}%'`
  );

  const idCreated = `${year}` + `${padNumber(res[0]["total"] + 1)}`;

  console.log("ID studetn gerenated: ", idCreated);

  return idCreated;
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

async function getAll() {
  try {
    db.connect();
    return db.select(
      `${process.env.STUDENT_TB} LEFT JOIN Classes ON Students.classID = Classes.classID`,
      "Students.id, Students.avatarPath, Students.name, Classes.className, Students.gender, Students.birthday, Students.status",
      "WHERE Students.deleted = 0"
    );
  } catch (error) {
    db.disconnect();
  }
}

async function countStudent() {
  try {
    db.connect();
    return db.select(
      "Students",
      "Count(*) AS total",
      "WHERE Students.deleted = 0"
    );
  } catch (error) {
    db.disconnect();
  }
}

async function searchStudent(txtSearch, page, limit) {
  return db.selectLimit(
    `${process.env.STUDENT_TB} LEFT JOIN Classes ON Students.classID = Classes.classID`,
    "Students.id, Students.avatarPath, Students.name, Classes.className, Students.gender, Students.birthday, Students.status",
    `WHERE Students.deleted = 0 AND Students.name LIKE '%${txtSearch}%' OR Students.id Like '%${txtSearch}%'`,
    limit !== undefined ? `LIMIT ${limit}` : "",
    limit !== undefined ? `OFFSET ${page * limit}` : ""
  );
}

async function countSearchStudent(txtSearch) {
  try {
    db.connect();
    return db.select(
      "Students LEFT JOIN Classes ON Students.classID = Classes.classID",
      "Count(*) AS total",
      `WHERE Students.deleted = 0 AND Students.name LIKE '%${txtSearch}%' OR Students.id Like '%${txtSearch}%'`
    );
  } catch (error) {
    db.disconnect();
  }
}

async function getByID(id) {
  try {
    return db.select(
      "Students LEFT JOIN Classes ON Students.classID = Classes.classID",
      "Students.id, Students.avatarPath, Students.name, Classes.className, Students.gender, Students.birthday, Students.status",
      id !== undefined
        ? `WHERE Students.deleted = 0 AND Students.id = ${id}`
        : ""
    );
  } catch (error) {
    db.disconnect();
  }
}

async function deleteStudent(idStudentToDel) {
  return db.update(
    process.env.STUDENT_TB,
    { deleted: true },
    { id: idStudentToDel }
  );
}

async function getPage(page, limit) {
  try {
    return db.selectLimit(
      "Students LEFT JOIN Classes ON Students.classID = Classes.classID",
      "Students.id, Students.avatarPath, Students.name, Classes.className, Students.gender, Students.birthday, Students.status",
      "WHERE Students.deleted = 0",
      limit !== undefined ? `LIMIT ${limit}` : "",
      limit !== undefined ? `OFFSET ${page * limit}` : ""
    );
  } catch (error) {
    db.disconnect();
  }
}
