const db = require("../config/db.service");
const db1 = require("../config/db");

module.exports = {
  getAll,
  getByID,
  countParent,
  searchParent,
  countSearchParent,
  isDuplicate,
  insertParent,
  updateParent,
  deleteParent,
  getPage,
};

async function getAll() {
  try {
    return db.select(
      "Parent",
      "id, name, gender, birthday, address, job, email, phone, role, status"
    );
  } catch (error) {
    return error;
  }
}

async function getByID(id) {
  try {
    return db1.select(
      "Parent",
      "name, gender, birthday, address, job, email, phone, role, status",
      id !== undefined ? `Where id = ${id}` : ""
    );
  } catch (error) {
    return error;
  }
}
async function countParent() {
  try {
    console.log("Count parent:");
    return await db.select("Parent", "Count(*) AS total", "WHERE deleted = 0");
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}
async function searchParent(txtSearch, page, limit) {
  try {
    return db.selectLimit(
      "Parent",
      "*",
      `WHERE name LIKE "%${txtSearch}%"`,
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

async function countSearchParent(txtSearch) {
  try {
    return db.select(
      "Parent",
      "Count(*) AS total",
      `WHERE deleted = 0 AND name LIKE '%${txtSearch}%'`
    );
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}
async function getPage(page, limit) {
  try {
    return db.selectLimit(
      "Parent",
      "*",
      "WHERE deleted = 0",
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
async function isDuplicate(email, phone, account_id) {
  try {
    const result = await db.select(
      "Parent",
      "*",
      `WHERE email = '${email}' OR phone = '${phone}' OR account_id = '${account_id}'`
    );
    return result.length > 0;
  } catch (error) {
    throw error;
  }
}
async function insertParent(data) {
  try {
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
    await db1.updateParent("Parent", newData, `id = ${id}`);
    console.log(`updated ${id}`);
  } catch (error) {
    console.error(`Error updating ID ${id}:`, error);
    throw error;
  }
}
// async function deleteParent(where) {
//   try {
//     console.log(`delete`);
//     return db.deleteRow("Parent", where);
//   } catch (error) {
//     console.error("Error deleting parent:", error);
//     throw error;
//   }
// }
async function deleteParent(idParentToDel) {
  try {
    return db.update("Parent", { deleted: 1 }, { id: idParentToDel });
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}
