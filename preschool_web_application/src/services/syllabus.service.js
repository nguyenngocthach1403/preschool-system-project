import { api } from "../services/Api";

export default {
  getSyllabus,
};

function getSyllabus() {
  return api().get("/syllabus");
}
