import { api } from "../services/Api";

export default {
  getSpecialization,
};

function getSpecialization() {
  return api().get("/specialization");
}
