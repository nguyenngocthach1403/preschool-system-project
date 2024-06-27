import { api } from "../services/Api";

export default {
  getCertificate,
};

function getCertificate() {
  return api().get("/certificate");
}
