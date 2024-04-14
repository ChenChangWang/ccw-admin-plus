import axios from "axios";
import type { UserState } from "@/store/modules/user/types.ts";
import {AppRouteRecordRaw, MenuData} from "@/router/constants.ts";

export interface LoginParam {
  username: string;
  password: string;
  autoLogin: boolean;
}
export interface LoginRes {
  token: string;
}

export function login(data: LoginParam) {
  return axios.post<LoginRes>("/api/user/login", data);
}

export function logout() {
  return axios.post<LoginRes>("/api/user/logout");
}
export function getUserInfo() {
  return axios.post<UserState>("/api/user/queryInfo");
}
export function getMenuList() {
  return axios.post<MenuData>("/api/user/queryMenu");
}
