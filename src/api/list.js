import axios from "axios";
import qs from "query-string";

export function getSearchTableList(data) {
  return axios.post("/api/list/searchTable", data);
}

export function getBasicList(data) {
  return axios.post("/api/list/basicList", data);
}

export function addBasicList(data) {
  return axios.post("/api/list/basicAdd", data);
}

export function editBasicList(data) {
  return axios.post("/api/list/basicEdit", data);
}

export function deleteBasicList(data) {
  return axios.post("/api/list/basicDelete", data);
}
