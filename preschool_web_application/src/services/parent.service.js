import { api } from "../services/Api";

export default {
  search,
  countParent,
  getParent,
};

function search(txtSearch, page, limit) {
  return api().get(
    `/parents/search?text=${txtSearch}&page=${page}&limit=${limit}`
  );
}

function countParent() {
  return api().get("/parents/total");
}

function getParent(page, limit) {
  return api().get(`/parents?limit=${limit}&page=${page}`);
}