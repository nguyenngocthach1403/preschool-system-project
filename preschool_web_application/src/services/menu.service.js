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
 * Hàm gọi lấy danh sách món ăn
 * @param {interger} limit
 * @param {interger} page
 * @return {HttpResponse}
 */
const featchDishes = (limit, page) => {
  return api().get(`/menu/dish/get?limit=${limit}&offset=${page * limit}`);
};

export default { getWeeklyMenubById, featchDishes };
