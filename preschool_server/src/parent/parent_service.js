const db = require("../config/db");

module.exports = {
  getAll,
  getByID,
<<<<<<< HEAD
=======
  isDuplicateEmailOrPhone,
>>>>>>> 1637cf83c0620e2faf000a77893904a64a96e945
  insertParent,
  updateParent,
  deleteParent,
};

async function getAll() {
  try {
<<<<<<< HEAD
    db.createConnection();
=======
    db.connect();
>>>>>>> 1637cf83c0620e2faf000a77893904a64a96e945
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
<<<<<<< HEAD
    db.createConnection();
=======
>>>>>>> 1637cf83c0620e2faf000a77893904a64a96e945
    return db.select(
      "Parent",
      "name, gender, birthday, address, job, email, phone, role, status, account_id",
      id !== undefined ? `Where Parent.id = ${id}` : ""
    );
  } catch (error) {
    db.disconnect();
  }
}
<<<<<<< HEAD
async function insertParent(data) {
  try {
    db.createConnection();
    const parentId = await db.insert("Parent", data);
    console.log(`Parent created with ID: ${parentId}`);
=======
async function isDuplicateEmailOrPhone(email, phone) {
  try {
    const result = await db.select(
      "Parent",
      "*",
      `WHERE email = '${email}' OR phone = '${phone}'`
    );
    return result.length > 0;
  } catch (error) {
    throw error;
  }
}

async function insertParent(data) {
  try {
    const parentId = await db.insert("Parent", data);
    // console.log(`Parent created with ID: ${parentId}`);
>>>>>>> 1637cf83c0620e2faf000a77893904a64a96e945
    return parentId;
  } catch (error) {
    console.error("Error inserting parent:", error);
    throw error;
  }
}

async function updateParent(id, newData) {
  try {
<<<<<<< HEAD
    db.createConnection();
    await db.updateParent("Parent", newData, `id = ${id}`);
=======
    await db.update("Parent", newData, `id = ${id}`);
>>>>>>> 1637cf83c0620e2faf000a77893904a64a96e945
    console.log(`updated ${id}`);
  } catch (error) {
    console.error(`Error updating ID ${id}:`, error);
    throw error;
  }
}
async function deleteParent(where) {
  try {
<<<<<<< HEAD
    db.createConnection();
    console.log(`delete`);
    return db.deleteParent("Parent", where);
=======
    // console.log(`delete`);
    return db.delete("Parent", where);
>>>>>>> 1637cf83c0620e2faf000a77893904a64a96e945
  } catch (error) {
    console.error("Error deleting parent:", error);
    throw error;
  }
}
