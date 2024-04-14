import { MenuMeta } from "@/router/constants.ts";

export interface TabsNavProps {
  name: string;
  query?: any;
  fullPath: string;
  path: string;
  meta: MenuMeta;
  children?: TabsNavProps[];
}
export interface TabsNavState {
  tagList: TabsNavProps[];
}
