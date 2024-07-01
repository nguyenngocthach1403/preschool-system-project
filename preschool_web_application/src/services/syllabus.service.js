import { api } from "../services/Api";

export default {
  getSyllabus,
  createSyllabus,
};

function getSyllabus() {
  return api().get("/syllabus");
}
function createSyllabus(syllabusToCreate) {
  return api().post(`/syllabus/create`, syllabusToCreate);
}
