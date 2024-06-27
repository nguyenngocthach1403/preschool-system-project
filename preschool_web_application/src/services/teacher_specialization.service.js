import { api } from "../services/Api";

export default { createTeacherSpecialization };

function createTeacherSpecialization(dataToCreate) {
  return api().post(`/teacherSpecialization/create`, dataToCreate);
}
