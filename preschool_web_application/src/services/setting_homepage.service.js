import { api } from "./Api";

export default {
  getSetting,
  updateSetting,
};

function getSetting() {
  return api().get("/setting");
}
function updateSetting(dataToUpdate) {
  return api().post(`/setting/update`, dataToUpdate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
