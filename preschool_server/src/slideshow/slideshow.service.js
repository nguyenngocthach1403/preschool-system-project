const db = require("../config/db.service");
const config = require("../config/config");
module.exports = {
  createSlide,
  getSlide,
  countSlide,
  updateSlide,
  deleteSlide,
  getByID,
};

async function getSlide() {
  try {
    const result = await db.select(
      config.tb.slideshow,
      "*",
      "WHERE deleted = 0 ORDER BY created DESC"
    );
    return result;
  } catch (error) {
    return {
      data: data,
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function getByID(id) {
  try {
    return db.select(
      `${config.tb.slideshow}`,
      "*",
      id !== undefined ? `Where id = ${id}` : ""
    );
  } catch (error) {
    return error;
  }
}

async function createSlide(dataToCreate) {
  try {
    const data = await db.insert(config.tb.slideshow, dataToCreate);
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

async function countSlide() {
  try {
    return db.select(
      `${config.tb.slideshow}`,
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
async function updateSlide(id, dataToUpdate) {
  try {
    //Xóa các key bị trống
    const keys = Object.keys(dataToUpdate);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (dataToUpdate[key] == undefined) {
        delete dataToUpdate[key];
      }
    }

    const result = await db.update(config.tb.slideshow, dataToUpdate, {
      id: id,
    });

    if (result == 0) {
      return {
        success: false,
        message: "Cập nhập thất bại. Hãy thử lại",
      };
    }
    return {
      success: true,
      message: "Cập nhập thành công",
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.code,
      error: error.sqlMessage,
    };
  }
}
async function deleteSlide(id) {
  try {
    return db.update(config.tb.slideshow, { deleted: 1 }, { id: id });
  } catch (error) {
    return {
      code: error.code,
      message: "Delete Fail",
    };
  }
}
