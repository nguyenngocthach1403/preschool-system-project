import { api } from "../services/Api";

/**
 * Phương thức gọi api lấy thực đơn tuần
 * @param {interger} id
 * @returns {Response}
 */
const getWeeklyMenubById = (id) => {
  return api().get(`/menu?weeklyMenuId=${id}`);
};

/**
 * Phương thức lấy danh sách menu
 * @param {interger} classId
 * @returns {Response}
 */
const fetchMenuList = (classId) => {
  return api().get(`/menu/class?classId=${classId}`);
};

const addMeals = (dataToCreate) => {
  return api().post(`/menu/meals/add`, dataToCreate);
};

const addDish = (dataToCreate) => {
  return api().post(`/menu/dish/add`, dataToCreate);
};

/**
 * Phương thức lấy các bữa ăn trong ngày
 * @return {HttpResponse}
 */
const fetchMeals = () => {
  return api().get("/menu/meals");
};

/**
 * Hàm gọi lấy danh sách món ăn
 * @param {interger} limit
 * @param {interger} page
 * @return {HttpResponse}
 */
const featchDishes = (limit, page) => {
  return api().get(`/menu/dish/get?limit=${limit}&offset=${page * limit}`);
};

/**
 *
 * @param {interger} classId
 * @param {String} date
 * @param {interger} createBy
 * @param {interger} mealId
 * @param {Object} dishes
 */
const createMenu = (classId, date, createBy, mealId, dishes) => {
  return api().post(`/menu/create?classId=${classId}`, {
    date: date,
    createBy: createBy,
    mealId: mealId,
    dishes: dishes,
  });
};

export default {
  getWeeklyMenubById,
  featchDishes,
  fetchMeals,
  addMeals,
  addDish,
  fetchMenuList,
  createMenu,
};
