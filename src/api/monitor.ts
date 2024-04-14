import axios from "axios";

export interface RecentSituationData{
  x: string,
  visitY: number,
  orderY: number,
}
export function getRecentSituationData() {
  return axios.post<RecentSituationData>("/api/queryRecentSituation");
}
