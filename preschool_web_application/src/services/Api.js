import axios from "axios";

function api() {
  return axios.create({
    baseURL: "http://localhost:9000",
    timeout: 10000,
  });
}

export { api };
