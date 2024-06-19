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
  getRegisterByID,
  updateRegister,
};

function createRegister(data) {
  return api().post("/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
function getRegisterByID(id) {
  return api().get(`/registrations/id/${id}`);
}

function isExistRegistration(phone) {
  return api().get(`/registrations?phone=${phone}`);
}

function getRegistrations(admission_period_id, limit, page) {
  console.log(`/registrations?limit=${limit}&page=${page}`);
  return api().get(
    `/registrations/${admission_period_id}/?limit=${limit}&page=${page}`
  );
}

function getRegistrationsWithStatus(admission_period_id, status, page, limit) {
  return api().get(
    `/registrations/${admission_period_id}/status?status=${status}&limit=${limit}&offset=${
      page * limit
    }`
  );
}

function getRegistrationTotal(admission_period_id) {
  console.log("/registrations/total");
  return api().get(`/registrations/${admission_period_id}/total`);
}
function updateStatus(id, status, by, status_before) {
  return api().get(
    `/registrations/update/status/${id}?status=${status}&status_before=${status_before}&by=${by}`
  );
}

function getTotalOfStatus(admission_period_id) {
  return api().get(`/registrations/${admission_period_id}/status/total`);
}

function searchRegister(admission_period_id, searchText, page, limit) {
  return api().get(
    `registrations/${admission_period_id}/search?searchText=${searchText}&limit=${limit}&offset=${
      page * limit
    }`
  );
}

function getRegistrationWithStatusAndSearch(
  admission_period_id,
  searchText,
  status,
  page,
  limit
) {
  return api().get(
    `registrations/${admission_period_id}/search/status?searchText=${searchText}&status=${status}&limit=${limit}&offset=${
      page * limit
    }`
  );
}

function deleteRegistration(id, phone) {
  return api().get(`/registrations/delete?id=${id}&phone=${phone}`);
}
function updateRegister(id, data) {
  return api().post(`/registrations/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
