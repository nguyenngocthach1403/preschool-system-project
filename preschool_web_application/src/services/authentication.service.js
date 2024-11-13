import { api } from "../services/Api";

export default { login };

function login(username, password) {
  return api().post("/login", { username, password });
}
