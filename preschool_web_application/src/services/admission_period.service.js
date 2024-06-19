import { api } from "./Api";

export default { getAddmissionPeriodOpenning, getAddmissionPeriod };

function getAddmissionPeriodOpenning() {
  return api().get("/addmission_period/openning");
}

function getAddmissionPeriod() {
  return api().get("/addmission_period");
}
