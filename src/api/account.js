import axios from "axios";

export function accountUpload(data, config) {
  return axios.post("/account/user/upload", data, config);
}
