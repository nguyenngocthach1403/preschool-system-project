import { api } from "../services/Api";

export default { fetchClass };

function fetchClass(limit, offset) {
  return api().get(`/class?limit=${limit}&offset=${offset}`);
}
