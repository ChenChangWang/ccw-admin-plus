import axios from "axios";
import qs from "query-string";

export function getIntroduceData(data) {
  return axios.post("/api/queryIntroduce", data);
}
export function getSalesData(data) {
  return axios.post("/api/querySales", data);
}

export function getSearchUserData(data) {
  return axios.post("/api/querySearchUser", data);
}

export function getTopSearchData(data) {
  return axios.post("/api/queryTopSearchList", data);
}

export function getSalesProportionData(data) {
  return axios.post("/api/querySalesProportion", data);
}
