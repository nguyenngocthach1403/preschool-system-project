import { api } from "../services/Api";

export default {
  getRegistrations,
  getRegistrationTotal,
  updateStatus,
  getTotalOfStatus,
  searchRegister,
  getRegistrationWithStatusAndSearch,
  getRegistrationsWithStatus,
  createRegister,
  isExistRegistration,
  deleteRegistration,
};

function createRegister(data) {
  return api().post("/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function isExistRegistration(phone) {
  return api().get(`/registrations?phone=${phone}`);
}

function getRegistrations(limit, page) {
  console.log(`/registrations?limit=${limit}&page=${page}`);
  return api().get(`/registrations?limit=${limit}&page=${page}`);
}

function getRegistrationsWithStatus(status, page, limit) {
  return api().get(
    `/registrations/status?status=${status}&limit=${limit}&offset=${
      page * limit
    }`
  );
}

function getRegistrationTotal() {
  console.log("/registrations/total");
  return api().get("/registrations/total");
}
function updateStatus(id, status) {
  return api().get(`/registrations/update/status/${id}?status=${status}`);
}

function getTotalOfStatus() {
  return api().get("/registrations/status/total");
}

function searchRegister(searchText, page, limit) {
  return api().get(
    `registrations/search?searchText=${searchText}&limit=${limit}&offset=${
      page * limit
    }`
  );
}

function getRegistrationWithStatusAndSearch(searchText, status, page, limit) {
  return api().get(
    `registrations/search/status?searchText=${searchText}&status=${status}&limit=${limit}&offset=${
      page * limit
    }`
  );
}

function deleteRegistration(id, phone) {
  return api().get(`/registrations/delete?id=${id}&phone=${phone}`);
}
