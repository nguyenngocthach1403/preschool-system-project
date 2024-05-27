import { api } from "../services/Api";

export default {
  getRegistrations,
  getRegistrationTotal,
  updateStatus,
};

function getRegistrations(limit, page) {
  console.log(`/registrations?limit=${limit}&page=${page}`);
  return api().get(`/registrations?limit=${limit}&page=${page}`);
}

function getRegistrationTotal() {
  console.log("/registrations/total");
  return api().get("/registrations/total");
}
function updateStatus(id, status) {
  return api().get(`/registrations/update/status/${id}?status=${status}`);
}
