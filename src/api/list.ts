import axios from "axios";
import type { PageParam } from "@/api/index.ts";
import type { PageResult } from "@/api/index.ts";

export type status = ["closed", "running", "online", "exception"];
export interface SearchTable {
  "id|6": string; //规则名称
  "ruleName|6-8": string; //规则名称
  describe: string; //描述
  "serviceCallNumber|2-4": number; //服务调用次数
  "status|1": status; //关闭 运行中 已上线 异常
  prevCallTime: string; //上次调用时间
}
export interface SearchTableParam extends PageParam {
  ruleName: string;
  describe: string;
  serviceCallNumber: string;
  status: string;
  prevCallTime: string;
}

export interface BasicData {
  title: string;
  description: string;
  logo?: string;
  name: string;
  startDate: string;
  percent?: number;
  id?: string;
}

export function getSearchTableList(data: SearchTableParam) {
  return axios.post<PageResult<SearchTable>>("/api/list/searchTable", data);
}

export function getBasicList(data: PageParam) {
  return axios.post<PageResult<BasicData>>("/api/list/basicList", data);
}

export function addBasicList(data: BasicData) {
  return axios.post("/api/list/basicAdd", data);
}

export function editBasicList(data: BasicData) {
  return axios.post("/api/list/basicEdit", data);
}

export function deleteBasicList(data: { id: string }) {
  return axios.post("/api/list/basicDelete", data);
}
