import axios from "axios";

function api() {
  return axios.create({
    baseURL: "http://localhost:9000",
    timeout: 2000,
  });
}

export { api };
