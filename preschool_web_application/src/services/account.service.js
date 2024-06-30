import { api } from "../services/Api";

export default {
  getTotalAccount,
  getAccount,
  createAccount,
  updateAccount,
  getParentById,
  getTeacherById,
};

function getTotalAccount() {
  return api().get("/account/total");
}

function getAccount(page, limit) {
  return api().get(`/account?limit=${limit}&page=${page}`);
}

function createAccount(accountToCreate) {
  return api().post(`/account/create`, accountToCreate);
}
function updateAccount(username, dataToUpdate) {
  return api().put(`/account/${username}`, dataToUpdate);
}
function getParentById(id) {
  return api().get(`/account/parent/${id}`);
}
function getTeacherById(id) {
  return api().get(`/account/teacher/${id}`);
}
