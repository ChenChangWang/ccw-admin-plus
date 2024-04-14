import { MenuData } from "@/router/constants.ts";
import { RouteRecordRaw } from "vue-router";

export interface RouterState {
  menuList: MenuData[];
  routers: RouteRecordRaw[];
}
