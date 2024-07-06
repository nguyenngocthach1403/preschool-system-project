import { api } from "../services/Api";

export default {
  getNews,
  getNewsById,
  createNews,
  getAllNews,
  searchNews,
  getTotal,
  updateNews,
  deleleNews,
};

//Admin
function getAllNews(page, limit) {
  return api().get(`/news?limit=${limit}&page=${page}`);
}
//Trang chu
function getNews() {
  return api().get("/news/getNews");
}

function getNewsById(id) {
  return api().get(`/news/id/${id}`);
}
function getTotal() {
  return api().get("/news/total");
}
function createNews(DataToCreate) {
  return api().post(`/news/create`, DataToCreate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
function searchNews(searchText, page, limit) {
  return api().get(
    `/news/search?text=${searchText}&page=${page}&limit=${limit}`
  );
}
function updateNews(id, dataToUpdate) {
  return api().post(`/news/update/${id}`, dataToUpdate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
function deleleNews(id) {
  return api().get(`/news/delete?id=${id}`);
}
