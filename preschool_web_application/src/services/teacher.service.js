import { api } from "../services/Api";

export default {
  getTeacher,
  countTeacher,
  search,
};

function getTeacher(offset, limit) {
  return api().get(`/teacher?limit=${limit}&offset=${offset}`);
}
function search(txtSearch, page, limit) {
  return api().get(
    `/teacher/search?text=${txtSearch}&page=${page}&limit=${limit}`
  );
}
function countTeacher() {
  return api().get("/teacher/total");
}
