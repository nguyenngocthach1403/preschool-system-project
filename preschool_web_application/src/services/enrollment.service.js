import { api } from "./Api";

export default {
  getEnrollmentSessionsOpenning,
  getEnrollmentSessions,
  createEnrollmentSessions,
};

function getEnrollmentSessionsOpenning() {
  return api().get("/enrollment/openning");
}

function getEnrollmentSessions() {
  return api().get("/enrollment");
}

function createEnrollmentSessions(dataToCreate) {
  return api().post("/enrollment/create", dataToCreate);
}
