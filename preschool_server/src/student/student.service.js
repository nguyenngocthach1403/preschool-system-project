const db = require("../config/db");

module.exports = {
  getAll,
  getByID,
  getPage,
};

async function getAll() {
  try {
    db.connect();
    return db.select(
      "Students LEFT JOIN Classes ON Students.classID = Classes.classID",
      "Students.id, Students.avatarPath, Students.name, Classes.className, Students.gender, Students.birthday, Students.studentStatus"
    );
  } catch (error) {
    db.disconnect();
  }
}

async function getByID(id) {
  try {
    return db.select(
      "Students LEFT JOIN Classes ON Students.classID = Classes.classID",
      "Students.id, Students.avatarPath, Students.name, Classes.className, Students.gender, Students.birthday, Students.studentStatus",
      id !== undefined ? `Where Students.id = ${id}` : ""
    );
  } catch (error) {
    db.disconnect();
  }
}

async function getPage(page, limit) {
  try {
    return db.selectLimit(
      "Students LEFT JOIN Classes ON Students.classID = Classes.classID",
      "Students.id, Students.avatarPath, Students.name, Classes.className, Students.gender, Students.birthday, Students.studentStatus",
      limit,
      page * limit
    );
  } catch (error) {
    db.disconnect();
  }
}
