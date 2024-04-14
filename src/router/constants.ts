import type { RouteMeta, RouteRecordRaw } from "vue-router";
import { defineComponent } from "vue";

export const HOME_PATH = "/dashboard/console";

export const Layout = () => import("@/layout/index.vue");

export const WHITE_PATH_LIST = ["/login"];

/**
 * 菜单元数据
 */
export interface MenuMeta extends RouteMeta {
  title: string; //导航、面包屑导航以及页面中展示的标题
  lang?: Record<string, string>; //国际化语言包根据对应的key生成标题
  noCache?: boolean; //如果设置为true页面将不会被缓存
  noAffix?: boolean; //如果设置为true，标签将不会添加到tabs-nav页签中
  hideInMenu?: boolean; // 如果设置为true后，左侧菜单中隐藏该选项
  icon?: string; // 菜单配置的iconify图标字符串，更多配置详情前往https://iconify.design/查看
  roles?: string[]; // 配置能够访问该页面的角色，默认不配置则都能访问
  link?: string; //外部网页链接
  orderNum?: number; //路由的排序字段
  parentName?: string; //新增路由时的父路由名称
}

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

export interface MenuData {
  id?: string;
  parentId?: string;
  path: string; //菜单地址
  name?: string | symbol; //路由名称
  meta?: MenuMeta; //路由元数据
  redirect?: string; //路由重定向
  component?: string; //路由组件
  children?: MenuData[];
  query?: any;
}

/**
 * 菜单数据
 */
export interface AppRouteRecordRaw {
  path: string; //菜单地址
  name?: string | symbol; //路由名称
  meta?: MenuMeta; //路由元数据
  redirect?: string; //路由重定向
  component?: Component | string; //路由组件
  children?: AppRouteRecordRaw[];
  alias?: string | string[];
  props?: Record<string, any>;
  fullPath?: string;
}
