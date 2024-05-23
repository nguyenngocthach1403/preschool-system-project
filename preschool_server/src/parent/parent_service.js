const db = require("../config/db");
const config = require("../config/config");

module.exports = {
  getAll,
  // getByID,
  countParent,
  searchParent,
  countSearchParent,
  isDuplicate,
  insertParent,
  updateParent,
  deleteParent,
  getPage,
  getParentById,
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

// async function getByID(id) {
//   try {
//     return db.select(
//       "Parent",
//       "name, gender, birthday, address, job, email, phone, role, status, account_id",
//       id !== undefined ? `Where Parent = ${id}` : ""
//     );
//   } catch (error) {
//     db.disconnect();
//   }
// }

async function getParentById(id) {
  try {
    return await db.select(
      `${config.tb.parent} AS p`,
      "p.*",
      `WHERE p.id = ${id}`
    );
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function countParent() {
  try {
    db.createConnection();
    console.log("Count parent:");
    return await db.select("Parent", "Count(*) AS total", "WHERE deleted = 0");
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  } finally {
    if (db.connection) {
      db.disconnect();
    }
  }
}
async function searchParent(txtSearch, page, limit) {
  try {
    db.createConnection();
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
  } finally {
    if (db.connection) {
      db.disconnect();
    }
  }
}

async function countSearchParent(txtSearch) {
  try {
    db.createConnection();
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
  } finally {
    if (db.connection) {
      db.disconnect();
    }
  }
}
async function getPage(page, limit) {
  try {
    db.createConnection();

    return db.selectLimit(
      "Parent",
      "*",
      `LIMIT ${limit}`,
      `OFFSET ${limit * page}`
    );
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  } finally {
    if (db.connection) {
      db.disconnect();
    }
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
