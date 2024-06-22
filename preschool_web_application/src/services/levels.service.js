import { api } from "../services/Api";

export default {
  getLevels,
  getTotalSyllabusByAdmission,
};

function getLevels() {
  return api().get("/levels");
}

function getTotalSyllabusByAdmission(admission_period_id, level_id) {
  return api().get(
    `/levels/admission/total/syllabus?admission_period_id=${admission_period_id}&level_id=${level_id}`
  );
}
