const db = require("../config/db");

module.exports = {
  getAll,
  getByID,
};

async function getAll() {
  try {
    db.connect();
    return db.select(
      "Parent",
      "id, name, gender, birthday, address, job, email, phone, role, status"
    );
  } catch (error) {
    db.disconnect();
  }
}

async function getByID(id) {
  try {
    return db.select(
      "Parent",
      "id, name, gender, birthday, address, job, email, phone, role, status",
      id !== undefined ? `Where Parent.id = ${id}` : ""
    );
  } catch (error) {
    db.disconnect();
  }
}
