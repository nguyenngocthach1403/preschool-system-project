import { api } from "../services/Api";

export default { createTeacherCertificate };

function createTeacherCertificate(dataToCreate) {
  return api().post(`/teacherCertificate/create`, dataToCreate);
}
