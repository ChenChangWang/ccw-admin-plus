import axios from "axios";

export function getRecentSituationData(data) {
  return axios.post("/api/queryRecentSituation", data);
}
