import { api } from "../services/Api";

export default {
  createStudent,
  search,
  countStudent,
  getStudent,
  deleleStudent,
  updateStudent,
};

function createStudent(dataToCreate) {
  return api().post("/students/create", dataToCreate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function updateStudent(id, dataToUpdate) {
  return api().post(`/students/update/${id}`, dataToUpdate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function search(txtSearch, page, limit) {
  return api().get(
    `/students/search?text=${txtSearch}&page=${page}&limit=${limit}`
  );
}

function countStudent() {
  return api().get("/students/total");
}

function getStudent(page, limit) {
  return api().get(`/students?page=${page}&limit=${limit}`);
}

function deleleStudent(idStudentToDel) {
  return api().get(`/students/delete?id=${idStudentToDel}`);
}
