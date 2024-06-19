import { api } from "../services/Api";

export default { fetchClass, searchClass, createClass };

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
function createClass(data) {
  return api().post("/class/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
