import { api } from "../services/Api";

export default { fetchClass, searchClass };

function fetchClass(limit, offset) {
  return api().get(`/class?limit=${limit}&offset=${offset}`);
}

function searchClass(searchText, limit, offset) {
  return api().get(
    `/class/search?searchText=${searchText}&limit=${limit}&offset=${
      offset * limit
    }`
  );
}
