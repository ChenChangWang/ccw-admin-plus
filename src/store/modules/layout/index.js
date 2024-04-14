import { defineStore } from "pinia";
import { computed } from "vue";
import { isEmpty } from "@/utils/util";

const useLayoutStore = defineStore("layout", {
  state: () => {
    return {
      menuCollapse: false, //菜单是否折叠
      isDrawerMenu: false, //是否显示抽屉菜单
      isToppingHeader: false, //是否置顶头部
      isAutoHideHeader: false, //是否下滑时隐藏顶栏
      menuUniqueOpened: true, //左侧菜单是否保持打开一个
      isRouteBreadcrumb: true, //是否显示全局面包屑导航
      isReload: true, //是否显示页面重载按钮
      isTabs: true, //是否开启多页签
      isFooter: true, //是否显示底部
      headerEffect: "light", //头部主题 dark,light
      asideEffect: "dark", //头部主题 dark,light
      fixMenuWidth: 250, //菜单宽度
      menuLayoutMode: "side", //导航模式 侧边：side 顶部：top   混合：mix
      contentWidthMode: "fixed", //fixed：定宽  fluid：流式
      weakMode: false, //色弱模式
      mixLeftMenuList: [], //混合菜单布局的左侧菜单数据
    };
  },
  getters: {
    isAside() {
      return !this.menuLayoutModeTop;
    },

    hideAside() {
      return (
        !this.isAside ||
        this.isDrawerMenu ||
        (this.menuLayoutModeMix && isEmpty(this.mixLeftMenuList))
      );
    },

    //当前菜单宽度
    asideWidth() {
      if (this.hideAside) {
        return 0;
      } else {
        return this.menuCollapse ? 64 : this.fixMenuWidth;
      }
    },

    //侧边菜单布局模式
    menuLayoutModeLeft() {
      return this.isDrawerMenu ? true : this.menuLayoutMode === "side";
    },
    //顶部菜单布局模式
    menuLayoutModeTop() {
      return this.isDrawerMenu ? false : this.menuLayoutMode === "top";
    },
    //混合菜单模式
    menuLayoutModeMix() {
      return this.isDrawerMenu ? false : this.menuLayoutMode === "mix";
    },
  },
  actions: {
    updatePatch(partialState) {
      this.$patch(partialState);
    },
    setMenuCollapsed(val) {
      this.menuCollapse = val;
    },
    setIsDrawerMenu(val) {
      this.isDrawerMenu = val;
    },
  },
});

export default useLayoutStore;
