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
const fetchMenuList = (classId, startDate, endDate) => {
  return api().get(
    `/menu/class?classId=${classId}&startDate=${startDate}&endDate=${endDate}`
  );
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
 * @param {Object} dataToCreate
 */
const createMenu = (classId, dataToCreate) => {
  return api().post(`/menu/create?classId=${classId}`, dataToCreate);
};

const updateMenu = (mealMenuId, dataToUpdate) => {
  return api().post(`/menu/update?mealMenuId=${mealMenuId}`, dataToUpdate);
};

const searchDishes = (searchText, limit, page) => {
  return api().get(
    `/menu/dish/search?searchText=${searchText}&limit=${limit}&offset=${
      limit * page
    }`
  );
};

const deleteDish = (dishId) => {
  return api().delete(`/menu/dish/delete?dishId=${dishId}`);
};

const updateDish = (dishId, dataToUpdate) => {
  return api().post(`/menu/dish/update?dishId=${dishId}`, dataToUpdate);
};

export default {
  getWeeklyMenubById,
  featchDishes,
  fetchMeals,
  addMeals,
  addDish,
  fetchMenuList,
  createMenu,
  updateMenu,
  searchDishes,
  deleteDish,
  updateDish,
};
