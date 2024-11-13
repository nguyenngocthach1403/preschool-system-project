import axios from "axios";
import { getToken } from "../utils/resources/validator";

function api() {
  return axios.create({
    baseURL: "http://localhost:9000/api/v1",
    timeout: 10000,
    headers: {
      Authorization: getToken(),
    },
  });
}

export { api };
