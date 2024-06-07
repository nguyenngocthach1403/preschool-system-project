const db = require("../config/db.service");
const db1 = require("../config/db");
const config = require("../config/config");

module.exports = {
  getAll,
  getByID,
  countParent,
  searchParent,
  countSearchParent,
  isDuplicate,
  isDuplicateAccount,
  insertParent,
  updateParent,
  deleteParent,
  getPage,
  getParentById,
  isExistAccount,
  isExistParent,
};

async function getAll() {
  try {
    return db.select(
      config.tb.parent,
      "id, name, gender, birthday, address, job, email, phone, role, status"
    );
  } catch (error) {
    return error;
  }
}
// async function getByID(id) {
//   try {
//     return db1.select(
//       config.tb.parent,
//       "name, gender, birthday, address, job, email, phone, role, status",
//       id !== undefined ? `Where id = ${id}` : ""
//     );
//   } catch (error) {
//     return error;
//   }
// }
// async function getByID(id) {
//   try {
//     return db1.select(
//       `${config.tb.parent} p LEFT JOIN ${config.tb.account} a ON p.account = a.username LEFT JOIN ${config.tb.register} r ON p.account = r.accountId`,
//       "p.*, p.name AS NameParent, p.email AS EmailParent, p.phone AS PhoneParent, p.address AS AddressParent ,a.username, r.*, r.name, r.email, r.phone",
//       id !== undefined ? `Where p.id = ${id}` : ""
//     );
//   } catch (error) {
//     return error;
//   }
// }
async function getByID(id) {
  try {
    return db1.select(
      `${config.tb.parent} p LEFT JOIN ${config.tb.account} a ON p.account = a.username`,
      "p.*, p.name AS NameParent, p.email AS EmailParent, p.phone AS PhoneParent, p.address AS AddressParent ,a.username, a.email AS EmailAccount, a.phone AS PhoneAccount ,a.status AS StatusAccount",
      id !== undefined ? `Where p.id = ${id}` : ""
    );
  } catch (error) {
    return error;
  }
}

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
    console.log("Count parent:");
    return await db.select(
      config.tb.parent,
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
async function searchParent(txtSearch, page, limit) {
  try {
    return db.selectLimit(
      config.tb.parent,
      "*",
      `WHERE deleted = 0 AND name LIKE '%${txtSearch}%' OR email LIKE '%${txtSearch}%' OR phone LIKE '%${txtSearch}%' OR account LIKE '%${txtSearch}%'`,
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

async function isExistParent(id) {
  try {
    const result = await db.select(
      config.tb.parent,
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

async function countSearchParent(txtSearch) {
  try {
    return db.select(
      config.tb.parent,
      "Count(*) AS total",
      `WHERE deleted = 0 AND name LIKE '%${txtSearch}%' OR email LIKE '%${txtSearch}%' OR phone LIKE '%${txtSearch}%' OR account LIKE '%${txtSearch}%'`
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
      `${config.tb.parent} p LEFT JOIN ${config.tb.account} ac ON p.account = ac.username`,
      "p.*,ac.username",
      "WHERE p.deleted = 0",
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
async function isDuplicate(email, phone, account) {
  try {
    const result = await db.select(
      config.tb.parent,
      "*",
      `WHERE email = '${email}' OR phone = '${phone}' OR account = '${account} '`
    );
    return result.length > 0;
  } catch (error) {
    throw error;
  }
}
async function isDuplicateAccount(account) {
  try {
    const result = await db.select(
      config.tb.parent,
      "*",
      `WHERE account = '${account}'`
    );
    return result.length > 0;
  } catch (error) {
    throw error;
  }
}

async function isExistAccount(username) {
  try {
    const classData = await db.select(
      config.tb.account,
      "*",
      `WHERE username = ${username}`
    );

    if (classData.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function insertParent(dataToCreate) {
  try {
    const parentId = await db.insert(config.tb.parent, dataToCreate);
    return parentId;
  } catch (error) {
    console.error("Error inserting parent:", error);
    throw error;
  }
}

async function updateParent(id, newData) {
  try {
    await db1.updateParent(config.tb.parent, newData, `id = ${id}`);
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
    return db.update(config.tb.parent, { deleted: 1 }, { id: idParentToDel });
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}
