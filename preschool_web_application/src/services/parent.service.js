import { api } from "../services/Api";

export default {
  search,
  countParent,
  getParent,
  deleleParent,
  getParentById,
  createParent,
  updateParent,
  getParentByIdParam,
  searchParent,
  addAccountForParent,
  getStudentByParentId,
  countStudentByParentId,
  getHistoryClassStudentByTeacherId,
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
function getParentByIdParam(id) {
  return api().get(`/parents/${id}`);
}
function createParent(dataToCreate) {
  return api().post(`/parents/insert`, dataToCreate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function updateParent(id, dataToUpdate) {
  return api().post(`/parents/update/${id}`, dataToUpdate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function searchParent(searchText, page, limit) {
  return api().get(
    `/parents/search?text=${searchText}&page=${page}&limit=${limit}`
  );
}

function addAccountForParent(parentId, username) {
  return api().get(`/parents/add/account/${parentId}?username=${username}`);
}
function getStudentByParentId(id) {
  return api().get(`/parents/getStudent/${id}`);
}
function countStudentByParentId(id) {
  return api().get(`/parents/totalStudent/${id}`);
}
function getHistoryClassStudentByTeacherId(id) {
  return api().get(`/parents/get/classhistory/${id}`);
}
