import { api } from "../services/Api";

export default {
  search,
  countParent,
  getParent,
  deleleParent,
  getParentById,
  createParent,
  updateParent,
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
function deleleParent(idParentToDel) {
  return api().get(`/parents/delete?id=${idParentToDel}`);
}
function getParentById(id) {
  return api().get(`/parents/get/id/${id}`);
}
function createParent(dataToCreate) {
  return api().post(`/parents/insert`, dataToCreate);
}

function updateParent(id, dataToUpdate) {
  return api().put(`/parents/${id}`, dataToUpdate);
}
