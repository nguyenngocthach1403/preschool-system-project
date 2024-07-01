import { api } from "./Api";

export default {
  getClassCurrent,
};

// function getClassCurrent(teacher_id, limit, offset) {
//   return api().get(`/classCurrent?teacher_id=${teacher_id}`);
// }
function getClassCurrent(teacher_id, page, limit) {
  return api().get(`/classCurrent/${teacher_id}&page=${page}&limit=${limit}`);
}
