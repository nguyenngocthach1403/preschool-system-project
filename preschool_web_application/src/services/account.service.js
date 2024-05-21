import { api } from "../services/Api";

export default { getTotalAccount, getAccount, createAccount };

function getTotalAccount() {
  return api().get("/account/total");
}

function getAccount(page, limit) {
  return api().get(`/account?limit=${limit}&page=${page}`);
}

function createAccount(accountToCreate) {
  return api().post(`/account/create`, accountToCreate);
}
