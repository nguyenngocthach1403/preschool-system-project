import { api } from "./Api";

export default {
  getAddmissionPeriodOpenning,
  getAddmissionPeriod,
  createAddmissionPeriod,
};

function getAddmissionPeriodOpenning() {
  return api().get("/addmission_period/openning");
}

function getAddmissionPeriod() {
  return api().get("/addmission_period");
}

function createAddmissionPeriod(dataToCreate) {
  return api().post("/addmission_period/add", dataToCreate);
}
