import axios from "axios";

export function stepFormSubmit() {
  return axios.post("/api/form/stepSubmit");
}

export function userFormSubmit() {
  return axios.post("/api/form/userSubmit");
}
