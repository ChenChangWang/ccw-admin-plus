import axios from "axios";

export function stepFormSubmit(data) {
  return axios.post("/api/form/stepSubmit", data);
}

export function userFormSubmit(data) {
  return axios.post("/api/form/userSubmit", data);
}
