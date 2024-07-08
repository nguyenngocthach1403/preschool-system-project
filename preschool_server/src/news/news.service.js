const db = require("../config/db.service");
const config = require("../config/config");
module.exports = {
  createNews,
  isExistNewsByTitle,
  getNewsAll,
  getNews,
  searchNews,
  countSearchNews,
  countNews,
  updateNews,
  deleteNews,
  getByID,
};

async function getNewsAll(limit, page) {
  try {
    const result = await db.select(
      config.tb.news,
      "*",
      "WHERE deleted = 0",
      `LIMIT ${limit}`,
      `OFFSET ${limit * page}`
    );
    return result;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}

async function getNews() {
  try {
    const result = await db.select(
      config.tb.news,
      "*",
      "WHERE deleted = 0 ORDER BY created DESC"
    );
    return result;
  } catch (error) {
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function getByID(id) {
  try {
    return db.select(
      `${config.tb.news}`,
      "*",
      id !== undefined ? `Where id = ${id}` : ""
    );
  } catch (error) {
    return error;
  }
}

async function createNews(dataToCreate) {
  try {
    const data = await db.insert(config.tb.news, dataToCreate);
    if (data.affectedRows == 0) {
      return {
        success: false,
        message: "Quá trình thêm tin tức thất bại, hãy thử lại.",
      };
    }
    return {
      success: true,
      message: "Tạo tin tức thành công",
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function isExistNewsByTitle(title) {
  try {
    const result = await db.select(
      `${config.tb.news}`,
      "*",
      `WHERE title like '${title}' AND deleted = 0`
    );

    if (result.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
async function searchNews(txtSearch, page, limit) {
  try {
    return db.selectLimit(
      `${config.tb.news}`,
      "*",
      `WHERE deleted = 0 AND title LIKE '%${txtSearch}%' OR description LIKE '%${txtSearch}%'`,
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
async function countSearchNews(txtSearch) {
  try {
    return db.select(
      `${config.tb.news}`,
      "Count(*) AS total",
      `WHERE deleted = 0 AND title LIKE '%${txtSearch}%' OR description LIKE '%${txtSearch}%'`
    );
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}
async function countNews() {
  try {
    return db.select(
      `${config.tb.news}`,
      "Count(*) AS total",
      `WHERE deleted = 0`
    );
  } catch (error) {
    return {
      code: error.code,
      message: "An error occusred while excuted query",
    };
  }
}
async function updateNews(id, dataToUpdate) {
  try {
    //Xóa các key bị trống
    const keys = Object.keys(dataToUpdate);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (dataToUpdate[key] == undefined) {
        delete dataToUpdate[key];
      }
    }

    const result = await db.update(config.tb.news, dataToUpdate, { id: id });

    if (result == 0) {
      return {
        success: false,
        message: "Cập nhập tin tức thất bại. Hãy thử lại",
      };
    }
    return {
      success: true,
      message: "Cập nhập tin tức thành công",
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function deleteNews(id) {
  try {
    return db.update(config.tb.news, { deleted: 1 }, { id: id });
  } catch (error) {
    return {
      code: error.code,
      message: "Delete Fail",
    };
  }
}
