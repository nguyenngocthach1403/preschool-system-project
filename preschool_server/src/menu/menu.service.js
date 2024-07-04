const db = require("../config/db.service");
const config = require("../config/config");

const getMeals = async () => {
  try {
    const result = await db.select(config.tb.meals, "*", "WHERE deleted = 0");

    if (result.length == 0) return undefined;

    return result;
  } catch (error) {
    return undefined;
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
    const response = await db.select(
      `${config.tb.dishes}`,
      "*",
      `WHERE deleted = 0`
    );
    if (response.length == 0) return undefined;
    return response;
  } catch (error) {
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

module.exports = { getMeals, getWeeklyMenuById, getDishes };
