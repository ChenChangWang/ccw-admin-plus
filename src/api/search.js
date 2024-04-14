import axios from "axios";
import qs from "query-string";

export function getArticleList(data) {
  return axios.post("/api/search/articleList", data);
}

export function getProjectList(data) {
  return axios.post("/api/search/projectList", data);
}

export function getApplicationList(data) {
  return axios.post("/api/search/applicationList", data);
}
