<template>
  <div class="header-bar">
    <div class="left">
      <div class="header-logo" :style="{ width: logoWidth }" v-if="isLogo">
        <Logo class="side-logo" :collapse="layoutStore.isDrawerMenu" />
      </div>

      <div
        v-if="isMenuToggle"
        class="header-action-item"
        @click="menuToggleHandler()"
      >
        <span class="icon item-target">
          <Icon
            icon="ant-design:menu-fold-outlined"
            :rotate="layoutStore.menuCollapse ? 2 : null"
          />
        </span>
      </div>

      <div
        v-if="!layoutStore.menuLayoutModeTop && layoutStore.isReload"
        class="header-action-item"
        @click="reload()"
      >
        <span class="icon item-target">
          <Icon icon="iconoir:refresh" style="font-size: 15px" />
        </span>
      </div>

      <RouteBreadcrumb
        v-if="layoutStore.menuLayoutModeLeft && layoutStore.isRouteBreadcrumb"
      />

      <div class="menu-warp" v-if="!layoutStore.menuLayoutModeLeft">
        <HeaderMenu />
      </div>
    </div>

    <div class="right">
      <!--暗黑模式-->
      <div class="header-action-item item-target" @click="toggleDark()">
        <span class="icon">
          <Icon :icon="isDark ? 'carbon:sunny' : 'ph:moon'" />
        </span>
      </div>

      <!--消息-->
      <Message class="header-action-item" />

      <!--全屏-->
      <div class="header-action-item" @click="toggleFullScreen()">
        <span class="icon item-target">
          <Icon
            :icon="
              isFullscreen
                ? 'material-symbols:fullscreen-exit'
                : 'material-symbols:fullscreen'
            "
          />
        </span>
      </div>

      <!--语言-->
      <Language class="header-action-item" />

      <!-- 用户 -->
      <User class="header-action-item user" />

      <!-- 主题配置 -->
      <ThemeConfig class="header-action-item" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import Language from "./language.vue";
import User from "./user.vue";
import Message from "./message/index.vue";
import { useDark, useToggle, useFullscreen } from "@vueuse/core";
import { useLayoutStore } from "@/store";
import RouteBreadcrumb from "./route-breadcrumb.vue";
import Logo from "@/components/logo/index.vue";
import ThemeConfig from "./theme-config/index.vue";
import HeaderMenu from "./header-menu.vue";
import bus from "@/utils/bus";

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
const layoutStore = useLayoutStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

//是否显示logo
const isLogo = computed(() => {
  return layoutStore.isToppingHeader || layoutStore.hideAside;
});
//logo的宽度
const logoWidth = computed(() => {
  if (layoutStore.isDrawerMenu) {
    return "56px";
  } else if (!layoutStore.hideAside) {
    return `${layoutStore.fixMenuWidth}px`;
  } else {
    return "auto";
  }
});
//是否显示菜单切换
const isMenuToggle = computed(() => {
  return !layoutStore.hideAside || layoutStore.isDrawerMenu;
});

const menuToggleHandler = () => {
  if (layoutStore.isDrawerMenu === true) {
    bus.emit("toggleDrawerMenu");
  } else {
    layoutStore.setMenuCollapsed(!layoutStore.menuCollapse);
  }
};

const reload = () => {
  bus.emit("reloadPage");
};
</script>

<style scoped lang="scss">
.header-bar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  &.dark {
  }

  .left {
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
    .header-logo {
      flex-shrink: 0;
      padding: 0 12px;
      .top-nav-logo {
      }
    }
    .menu-warp {
      flex: 1;
      overflow: hidden;
      padding-right: 12px;

      :deep(.el-menu) {
        &.el-menu--horizontal {
          border-bottom: none;
        }
        .el-sub-menu__title {
          transition: none;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .header-action-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--el-text-color-regular);
    cursor: pointer;
    height: 100%;
    &.item-target,
    .item-target {
      padding: 0 12px;
    }
    :deep(.item-target) {
      @extend .item-target;
    }

    &:hover {
      background-color: var(--el-fill-color-light);
    }
    :deep(.action-message),
    :deep(.action-language),
    :deep(.action-user) {
      height: 100%;
      vertical-align: text-top;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 12px;
      outline: none;
    }
    :deep(.action-user) {
      .action-user-name {
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
