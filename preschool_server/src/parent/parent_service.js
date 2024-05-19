const db = require("../config/db");

module.exports = {
  getAll,
  getByID,
  insertParent,
  updateParent,
  deleteParent,
};

async function getAll() {
  try {
    db.createConnection();
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
    db.createConnection();
    return db.select(
      "Parent",
      "name, gender, birthday, address, job, email, phone, role, status, account_id",
      id !== undefined ? `Where Parent.id = ${id}` : ""
    );
  } catch (error) {
    db.disconnect();
  }
}
async function insertParent(data) {
  try {
    db.createConnection();
    const parentId = await db.insert("Parent", data);
    console.log(`Parent created with ID: ${parentId}`);
    return parentId;
  } catch (error) {
    console.error("Error inserting parent:", error);
    throw error;
  }
}

async function updateParent(id, newData) {
  try {
    db.createConnection();
    await db.updateParent("Parent", newData, `id = ${id}`);
    console.log(`updated ${id}`);
  } catch (error) {
    console.error(`Error updating ID ${id}:`, error);
    throw error;
  }
}
async function deleteParent(where) {
  try {
    db.createConnection();
    console.log(`delete`);
    return db.deleteParent("Parent", where);
  } catch (error) {
    console.error("Error deleting parent:", error);
    throw error;
  }
}
