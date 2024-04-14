import { MenuData } from "@/router/constants.ts";

export type LightDark = "light" | "dark";

export type MenuMode = "side" | "top" | "mix";

export type WidthMode = "fixed" | "fluid";

export interface LayoutState {
  menuCollapse: boolean; //菜单是否折叠
  isDrawerMenu: boolean; //是否显示抽屉菜单
  isToppingHeader: boolean; //是否置顶头部
  isAutoHideHeader: boolean; //是否下滑时隐藏顶栏
  menuUniqueOpened: boolean; //左侧菜单是否保持打开一个
  isRouteBreadcrumb: boolean; //是否显示全局面包屑导航
  isReload: boolean; //是否显示页面重载按钮
  isTabs: boolean; //是否开启多页签
  isFooter: boolean; //是否显示底部
  headerEffect: LightDark; //头部主题 dark,light
  asideEffect: LightDark; //头部主题 dark,light
  fixMenuWidth: number; //菜单宽度
  menuLayoutMode: MenuMode; //导航模式 侧边：side 顶部：top   混合：mix
  contentWidthMode: WidthMode; //fixed：定宽  fluid：流式
  weakMode: boolean; //色弱模式
  mixLeftMenuList: MenuData[]; //混合菜单布局的左侧菜单数据
}
