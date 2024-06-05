import { api } from "../services/Api";

export default {
  getLevels,
};

function getLevels() {
  return api().get("/levels");
}
