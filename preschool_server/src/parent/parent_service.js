const db = require("../config/db.service");
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
  getParentByPhone,
  isExistParentByPhone,
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
    return db.select(
      `${config.tb.parent} p LEFT JOIN ${config.tb.account} a ON p.account_id = a.id`,
      "p.*, p.name AS NameParent, p.email AS EmailParent, p.phone AS PhoneParent, p.address AS AddressParent ,a.username, a.email AS EmailAccount, a.phone AS PhoneAccount ,a.status AS StatusAccount",
      id !== undefined ? `Where p.id = ${id}` : ""
    );
  } catch (error) {
    return error;
  }
}

async function getParentByPhone(phone) {
  try {
    const result = await db.select(
      `${config.tb.parent} p LEFT JOIN ${config.tb.account} a ON a.id = p.account_id`,
      "p.*,a.username, a.email AS account_email, a.phone AS account_phone, a.status AS account_status",
      `WHERE p.phone = ${phone}`
    );
    if (result.length == 0) {
      return {
        success: false,
        message: "Phụ huynh không tồn tại",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function getParentById(id) {
  try {
    return await db.select(
      `${config.tb.parent} p LEFT JOIN ${config.tb.account} a ON a.id = p.account_id`,
      "p.*,a.username, a.email AS account_email, a.phone AS account_phone, a.status AS account_status",
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
      `WHERE deleted = 0 AND name LIKE '%${txtSearch}%' OR email LIKE '%${txtSearch}%' OR phone LIKE '%${txtSearch}%' OR account_id LIKE '%${txtSearch}%'`,
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
async function isExistParentByPhone(phone) {
  try {
    const result = await db.select(
      config.tb.parent,
      "*",
      `WHERE deleted = 0 AND phone = ${phone}`
    );
    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function getParentByPhone(phone) {
  try {
    const result = await db.select(
      config.tb.parent,
      "*",
      `WHERE deleted = 0 AND phone = ${phone}`
    );
    return result[0];
    return true;
  } catch (error) {
    console.error(error);
  }
}

async function countSearchParent(txtSearch) {
  try {
    return db.select(
      config.tb.parent,
      "Count(*) AS total",
      `WHERE deleted = 0 AND name LIKE '%${txtSearch}%' OR email LIKE '%${txtSearch}%' OR phone LIKE '%${txtSearch}%' OR account_id LIKE '%${txtSearch}%'`
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
      `${config.tb.parent} p LEFT JOIN ${config.tb.account} a ON p.account_id = a.id`,
      "p.*, a.username, a.username",
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
      `WHERE email = '${email}' OR phone = '${phone}'`
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
      `WHERE username like '${username}'`
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
    if (parentId.effectedRows == 0) {
      return {
        success: false,
        message: "Quá trình thêm dữ liệu phụ huynh thất bại. Hãy thử lại.",
      };
    }
    return {
      success: true,
      message: "Tạo phụ huynh thành công",
      id: parentId.insertId,
    };
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function updateParent(id, dataToUpdate) {
  try {
    //Xóa các key bị trống
    const keys = Object.keys(dataToUpdate);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (dataToUpdate[key] == undefined) {
        delete dataToUpdate[key];
      }
    }

    const result = await db.update(config.tb.parent, dataToUpdate, { id: id });

    if (result == 0) {
      return {
        success: false,
        message: "Cập nhập phụ huynh thất bại. Hãy thử lại.",
      };
    }
    return {
      success: true,
      message: "Cập nhập phụ huynh thành công",
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
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
