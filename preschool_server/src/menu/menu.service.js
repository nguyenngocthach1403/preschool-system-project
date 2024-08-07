const db = require("../config/db.service");
const config = require("../config/config");

/**
 * Phương thức lấy số lượng tất cả các món ăn
 * @returns {interger} Number or undefined
 */
const countDishes = async () => {
  try {
    const response = await db.select(
      `${config.tb.dishes}`,
      "COUNT(*) as total",
      `WHERE deleted = 0`
    );
    const countResponse = response[0];

    if (!countResponse) return 0;

    return countResponse["total"];
  } catch (error) {
    return undefined;
  }
};

/**
 *  Phương thức lấy danh sách các bữa ăn trong ngày
 * @returns {Array}  Array or undefined
 */
const getMeals = async () => {
  try {
    const result = await db.select(
      `${config.tb.meals} m LEFT JOIN ${config.tb.account} a ON a.id = m.created_by`,
      "m.*, a.username",
      "WHERE m.deleted = 0"
    );

    if (result.length == 0) return undefined;

    return result;
  } catch (error) {
    return undefined;
  }
};

/**
 *
 * @param {Object} dataCreate
 * @returns {Boolean} false
 * @return {interger} insertId
 */
const createMeal = async (dataCreate) => {
  try {
    const response = await db.insert(config.tb.meals, dataCreate);

    if (!response.insertId) return false;

    return response.insertId;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const isExistDailyMenu = async (dailyMenuId) => {
  try {
    const response = await db.select(
      "daily_menu",
      "*",
      `WHERE id = ${dailyMenuId}`
    );

    const dbResponse = response[0];

    if (!dbResponse) return false;

    return true;
  } catch (error) {
    return false;
  }
};

const isExistMealMenu = async (mealMenuId) => {
  try {
    const response = await db.select(
      "meal_menu",
      "*",
      `WHERE id=${mealMenuId}`
    );

    const dbResponse = response[0];

    if (!dbResponse) return false;

    return true;
  } catch (error) {
    return false;
  }
};

/**
 *
 * @param {Object} dataCreate
 * @returns {Boolean} false
 * @return {interger} insertId
 */
const createDish = async (dataCreate) => {
  try {
    const response = await db.insert(config.tb.dishes, dataCreate);

    if (!response.insertId) return false;

    return response.insertId;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const isExistDish = async (dishId) => {
  try {
    const response = await db.select(
      config.tb.dishes,
      "*",
      `WHERE id=${dishId} AND deleted = 0`
    );

    const dbResponse = response[0];

    if (!dbResponse) return false;

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * This is method to get dishes(foods)
 * @param {interger} limit
 * @param {interger} offset
 * @returns {Array, undefined} [Object object] || undefined
 * @type {async}
 */
const getDishes = async (limit, offset) => {
  try {
    const response = await db.selectLimit(
      `${config.tb.dishes} d LEFT JOIN ${config.tb.account} a ON a.id = d.created_by`,
      "d.*, a.username",
      `WHERE d.deleted = 0`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );
    if (response.length == 0) return undefined;
    return response;
  } catch (error) {
    return undefined;
  }
};

/**
 * Phương thức kiểm tra bữa ăn còn tồn tại hay không
 * @param {interger}  mealId
 * @returns {Boolean} Return True or False
 */
const isExistMeal = async (mealId) => {
  try {
    const response = await db.select(
      config.tb.meals,
      "*",
      `WHERE id=${mealId} AND deleted = 0`
    );

    const dbResponse = response[0];

    if (!dbResponse) return false;

    return true;
  } catch (error) {
    return false;
  }
};
const createDailyMenu = async (dataToCreated) => {
  try {
    const responseCreateDailyMenu = await db.insert(
      "daily_menu",
      dataToCreated
    );

    return responseCreateDailyMenu.insertId;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const createMealMenu = async (mealId, dailyMenuId) => {
  try {
    const response = await db.insert("meal_menu", {
      daily_menu_id: dailyMenuId,
      meal_id: mealId,
    });

    return response.insertId;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const deleteDetailMenu = async (mealMenuID, dishId) => {
  try {
    const reusult = await db.deleteRow(
      "detail_menu",
      `WHERE meal_menu_id = ${mealMenuID} AND dish_id = ${dishId}`
    );

    if (reusult == 0) throw new Error("Thất bại!");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDailyMenuByDateAndClassId = async (classId, date) => {
  try {
    const response = await db.select(
      "daily_menu dm left join classes c  On c.id = dm.class_id ",
      "*",
      `WHERE c.id = ${classId} AND dm.date = '${date}'`
    );

    const dbResponse = response[0];

    if (!dbResponse) {
      return undefined;
    }
    return dbResponse;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getDetailMenu = async (mealMenuId) => {
  try {
    const response = await db.select(
      "dishes d left join detail_menu dm  On d.id = dm.dish_id",
      "d.*",
      `WHERE dm.meal_menu_id = ${mealMenuId}`
    );

    const dbResponse = response[0];

    if (!dbResponse) {
      return undefined;
    }
    return dbResponse;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const createDetailMenu = async (dishId, mealMenuId) => {
  try {
    const responseCreateDetailMenu = await db.insert("detail_menu", {
      dish_id: dishId,
      meal_menu_id: mealMenuId,
    });

    if (responseCreateDetailMenu.affectedRows == 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Phương thức lấy dánh các ngày thực đơn của lớp
 * @param {ínterger} classId
 * @returns {Object} object
 */
const getMenuByClassId = async (classId, startDate, endDate) => {
  try {
    //     const result = await db.query(`
    //       SELECT JSON_OBJECTAGG(
    //       DATE_FORMAT(dam.date, '%d/%m/%Y'),
    //       JSON_OBJECT(
    //         'daily_menu_id', dam.id,
    //         'date', dam.date,
    //         'created', dam.created,
    //         'meals', (
    //           SELECT JSON_OBJECTAGG(
    //             m.meal,
    //             JSON_OBJECT(
    //               'meal_menu_id', mm.id,
    //               'meal_id', m.id,
    //               'meal_name', m.meal,
    //               'meal_start_time', TIME_FORMAT(m.start_time, '%H:%i'),
    //               'meal_end_time', TIME_FORMAT(m.end_time, '%H:%i'),
    //               'menu', (
    //                 SELECT JSON_ARRAYAGG(
    //                   JSON_OBJECT(
    //                     "dish_id", d.id,
    //                     "dish_name", d.name
    //                   )
    //                 )
    //                 FROM detail_menu dm
    //                 LEFT JOIN dishes d ON d.id = dm.dish_id
    //                 WHERE dm.meal_menu_id = mm.id
    //               )
    //             )
    //           )
    //           FROM meal_menu mm
    //           LEFT JOIN meals m ON m.id = mm.meal_id
    //           WHERE mm.daily_menu_id = dam.id
    //         )
    //       )
    //     )
    // AS daily_menu
    // FROM  daily_menu dam
    // LEFT JOIN classes c
    // ON c.id = dam.class_id
    // WHERE dam.class_id = ${classId} AND (dam.date BETWEEN '${startDate}' AND '${endDate}');
    // `);

    const result = await db.query(`
      SELECT dem.dish_id,d.name as dish_name, mm.daily_menu_id, dm.date, mm.meal_id,mm.id as meal_menu_id, m.meal as meal_name, m.end_time, m.start_time 
      FROM detail_menu dem LEFT JOIN dishes d ON dem.dish_id = d.id 
      LEFT JOIN  meal_menu mm ON dem.meal_menu_id = mm.id 
      LEFT JOIN daily_menu dm ON mm.daily_menu_id = dm.id 
      LEFT JOIN meals m ON m.id = mm.meal_id 
      WHERE dm.class_id = ${classId} AND dm.date between '${startDate}' and '${endDate}'
      `);
    const dbResponse = result;

    if (dbResponse.length == 0) return undefined;

    return dbResponse;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getWeeklyMenuById = async (id) => {
  try {
    const result = await db.query(
      `
      SELECT JSON_OBJECT(
        'id', wm.id,
        'type', wm.type,
        'start_date', wm.start_date,
        'end_date', wm.end_date,
        'created_by', wm.created_by,
        'created', wm.created,
        'days', (
            SELECT JSON_OBJECTAGG(
                DATE_FORMAT(dam.day_of_week, '%d/%m/%Y'),
                JSON_OBJECT(
                    'meals', (
                        SELECT JSON_OBJECTAGG(
                            m.meal,
                            JSON_OBJECT(
                                'meal_name', m.meal,
                                'meal_start_time', TIME_FORMAT(m.start_time, '%H:%i'),
                                'meal_end_time', TIME_FORMAT(m.end_time, '%H:%i'),
                                'menu', (
                                    SELECT JSON_ARRAYAGG(
                                        JSON_OBJECT(
                                            "dish_id", d.id,
                                            "dish_name", d.name
                                        )
                                    )
                                    FROM detail_menu dm
                                    LEFT JOIN dishes d ON d.id = dm.dish_id
                                    WHERE dm.menu_id = mm.menu_id
                                )
                            )
                        )
                        FROM meal_menu mm
                        LEFT JOIN meals m ON m.id = mm.meal_id
                        WHERE mm.daily_menu_id = dam.id
                    )
                )
            )
            FROM daily_menu dam
            WHERE dam.weekly_menu_id = wm.id
        )
      ) AS weekly_menu
      FROM weekly_menu wm
      WHERE wm.id = ?;
      `,
      [id]
    );

    const dbResponse = result[0];

    if (!dbResponse) return undefined;

    return dbResponse;
  } catch (error) {
    return undefined;
  }
};

const countDishWithSearch = async (searchText) => {
  try {
    const response = await db.select(
      `${config.tb.dishes}`,
      "COUNT(*) as total",
      `WHERE deleted = 0 AND name Like '%${searchText}%'`
    );
    const countResponse = response[0];

    if (!countResponse) return 0;

    return countResponse["total"];
  } catch (error) {
    return undefined;
  }
};

const searchDish = async (searchText, limit, offset) => {
  try {
    const response = await db.selectLimit(
      `${config.tb.dishes} d LEFT JOIN ${config.tb.account} a ON a.id = d.created_by`,
      "d.*, a.username",
      `WHERE d.deleted = 0 AND d.name like '%${searchText}%'`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );
    if (response.length == 0) return undefined;
    return response;
  } catch (error) {
    return undefined;
  }
};
const deleteDish = async (dishId) => {
  try {
    const response = await db.update(
      config.tb.dishes,
      { deleted: 1 },
      { id: dishId }
    );
    if (response == 0) throw new Error("Thất bại!");

    return true;
  } catch (error) {
    throw error;
  }
};
const updateDish = async (dishId, dataToUpData) => {
  const keys = Object.keys(dataToUpData);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    if (dataToUpData[key] == undefined) {
      delete dataToUpData[key];
    }
  }
  try {
    const response = await db.update(config.tb.dishes, dataToUpData, {
      id: dishId,
    });
    if (response == 0) throw new Error("Thất bại!");

    return true;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getMeals,
  getWeeklyMenuById,
  getDishes,
  countDishes,
  createMeal,
  createDish,
  getMenuByClassId,
  isExistMeal,
  isExistDish,
  createDailyMenu,
  createMealMenu,
  isExistDailyMenu,
  isExistMealMenu,
  createDetailMenu,
  getDailyMenuByDateAndClassId,
  getDetailMenu,
  deleteDetailMenu,
  countDishWithSearch,
  searchDish,
  deleteDish,
  updateDish,
};
