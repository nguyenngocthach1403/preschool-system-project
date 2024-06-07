import { api } from "../services/Api";

export default { createRelationship };

function createRelationship(data) {
  return api().post("/relationship/add", data);
}
