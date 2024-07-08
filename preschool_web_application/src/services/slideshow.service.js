import { api } from "../services/Api";

export default {
  getSlide,
  getSlideById,
  createSlide,
  getTotal,
  updateSlide,
  deleleSlide,
};

//Trang chu
function getSlide() {
  return api().get("/slide");
}

function getSlideById(id) {
  return api().get(`/slide/id/${id}`);
}
function getTotal() {
  return api().get("/slide/total");
}
function createSlide(DataToCreate) {
  return api().post(`/slide/create`, DataToCreate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function updateSlide(id, dataToUpdate) {
  return api().post(`/slide/update/${id}`, dataToUpdate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
function deleleSlide(id) {
  return api().get(`/slide/delete?id=${id}`);
}
