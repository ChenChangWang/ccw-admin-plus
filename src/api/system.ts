import axios, { CancelTokenSource } from "axios";
import {PageParam, PageResult} from "@/api/index.ts";

export interface UserParma extends PageParam {
  name: string;
  userId: string;
  phone: string;
  sex: string;
  loginUser: string;
  status: string;
  createDate: string;
}

export interface UserData {
  avatar: string;
  name: string;
  userId: string;
  loginUser: string;
  createDate: string;
  phone: string;
  email: string;
  sex: "man" | "girl";
  status: string;
  role: string[];
  area: string[];
  birthday: string;
  introduction: string;
}

export interface RoleData {
  name: string;
  explain: string;
  createDate: string;
  updateDate: string;
  isDefault: boolean;
  defaultCheckedKeys: number[];
}

export interface SystemMenuData {
  path?: string;
  icon?: string;
  menuName?: string;
  menuType?: string;
  orderNum?: number;
  isLink?: boolean;
  query?: string;
  isCache?: boolean;
  status?: boolean;
  hideInMenu?: boolean;
  createDate?: string;
  id?: number;
  component?: string;
  permission?: string;
  isTop?: boolean;
  children?: SystemMenuData[];
}

export function getUserList(data: UserParma) {
  return axios.post<PageResult<UserData>>("/api/user/list", data);
}

export function getRoleList(data: PageParam) {
  return axios.post<PageResult<RoleData>>("/api/role/list", data);
}

export function getMenuList() {
  return axios.post<SystemMenuData[]>("/api/menu/list");
}

export function queryIconList(
  params: { query: string },
  source: CancelTokenSource,
) {
  const instance = axios.create();
  return instance.get("https://api.simplesvg.com/search", {
    cancelToken: source?.token,
    params,
  });
}

export function collectionIconList(prefix = "ep", source) {
  const instance = axios.create();
  return instance.get("https://api.simplesvg.com/collection", {
    cancelToken: source?.token,
    params: { prefix: prefix, pretty: 1 },
  });
}
