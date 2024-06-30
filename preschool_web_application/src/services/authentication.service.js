import { api } from "../services/Api";

export default { login, isExistUser };

function login(username, password) {
  return api().post("/login", { username, password });
}
function isExistUser(username) {
  return api().get(`/login/isExist/${username}`);
}
