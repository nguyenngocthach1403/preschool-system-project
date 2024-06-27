import { api } from "../services/Api";

export default {
  fetchClass,
  searchClass,
  createClass,
  getMembers,
  addStudentIntoClass,
  updateClass,
  getClassManagerRoles,
};

function fetchClass(limit, offset) {
  return api().get(`/class?limit=${limit}&offset=${offset}`);
}

function searchClass(searchText, limit, offset) {
  return api().get(
    `/class/search?searchText=${searchText}&limit=${limit}&offset=${
      offset * limit
    }`
  );
}
function createClass(data) {
  return api().post("/class/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function updateClass(classID, data) {
  return api().post(`/class/update?classId=${classID}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function getClassManagerRoles() {
  return api().get(`/class/manager-roles`);
}

function getMembers(class_id) {
  return api().get(`/class/students?classID=${class_id}`);
}

function addStudentIntoClass(classID, accountID, studentsToAdd) {
  return api().post(
    `/class/add-students?classID=${classID}&accountID=${accountID}`,
    studentsToAdd
  );
}
