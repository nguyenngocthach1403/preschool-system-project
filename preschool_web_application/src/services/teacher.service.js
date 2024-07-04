import { api } from "../services/Api";

export default {
  getTeacher,
  countTeacher,
  search,
  createTeacher,
  updateTeacher,
  getTeacherById,
  addAccountForTeacher,
  deleleTeacher,
  getClassCurrent,
  getHistoryClass,
  getTeacherForAssignment,
  getTeacherAssignment,
};

function getTeacher(offset, limit) {
  return api().get(`/teacher?limit=${limit}&offset=${offset}`);
}
function getTeacherById(id) {
  return api().get(`/teacher/get/id/${id}`);
}
function search(txtSearch, page, limit) {
  return api().get(
    `/teacher/search?text=${txtSearch}&page=${page}&limit=${limit}`
  );
}
function countTeacher() {
  return api().get("/teacher/total");
}
function createTeacher(dataToCreate) {
  return api().post(`/teacher/create`, dataToCreate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
function updateTeacher(id, dataToUpdate) {
  return api().post(`/teacher/update/${id}`, dataToUpdate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
function addAccountForTeacher(teacherId, username) {
  return api().get(`/teacher/add/account/${teacherId}?username=${username}`);
}
function deleleTeacher(idTeacherToDel) {
  return api().get(`/teacher/delete?id=${idTeacherToDel}`);
}
function getClassCurrent(teacher_id, page, limit) {
  return api().get(`/teacher/get/classCurrent/${teacher_id}`);
}
function getHistoryClass(teacher_id) {
  return api().get(`/teacher/get/classHistory/${teacher_id}`);
}
function getTeacherForAssignment(searchText, startDate, endDate, limit, page) {
  return api().get(
    `/teacher/get/assign-class-manager?searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&offset=${
      page * limit
    }`
  );
}

function getTeacherAssignment(limit, page) {
  return api().get(
    `teacher/get/assignment?limit=${limit}&offset=${page * limit}`
  );
}
