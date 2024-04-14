<template>
  <el-container class="layout">
    <!-- aside   -->
    <LayoutAside />
    <el-container
      class="layout-container"
      :class="containerClass"
      :style="containerStyle"
    >
      <!-- 头部 -->
      <Transition name="hide">
        <LayoutHeader v-show="headerVisible" />
      </Transition>

      <div :class="['layout-content', { 'tabs-fix': layoutStore.isTabs }]">
        <!-- 标签栏 -->
        <Transition name="hide">
          <LayoutTabsNav v-show="headerVisible" v-if="layoutStore.isTabs" />
        </Transition>

        <el-main class="layout-content-main">
          <router-view v-slot="{ Component, route }">
            <keep-alive :include="cacheList" :exclude="noCache">
              <component
                v-if="reloadFlag"
                :is="Component"
                :key="route.fullPath"
              />
            </keep-alive>
          </router-view>
        </el-main>
      </div>

      <LayoutFooter v-if="layoutStore.isFooter" />
    </el-container>
  </el-container>
</template>

<script setup>
import {
  ref,
  defineOptions,
  computed,
  provide,
  onUnmounted,
  nextTick,
} from "vue";
import LayoutFooter from "./components/layout-footer/index.vue";
import LayoutAside from "./components/layout-aside/index.vue";
import LayoutHeader from "./components/layout-header/index.vue";
import LayoutTabsNav from "./components/layout-tabs-nav/index.vue";
import { useLayoutStore, useTabsNavStore } from "@/store";
import { useResponsive } from "@/hooks/use-responsive";
import { breakpointQueryMap } from "@/utils/media-query-listener";
import { listenerRoute, removeRouteListener } from "@/utils/route-listener";
import { useRoute } from "vue-router";
import useAutoHideHeader from "./use-auto-hide-header";
import bus from "@/utils/bus";

defineOptions({
  name: "Main",
});

const layoutStore = useLayoutStore();

const reloadFlag = ref(true);
const noCache = ref("");
const route = useRoute();
const { visible: headerVisible } = useAutoHideHeader();

// =========================== 路由变化监听 新增tabs =======================
const tabsNavStore = useTabsNavStore();
tabsNavStore.loadLocalTagList();
//监听路由发生变化 新增tag
listenerRoute((route) => {
  tabsNavStore.addTag(route);
}, true);

// =========================== 变量计算属性 =======================

const cacheList = computed(() => {
  return tabsNavStore.getCacheList;
});

const containerStyle = computed(() => {
  return { paddingLeft: layoutStore.asideWidth + "px" };
});

const containerClass = computed(() => {
  return {
    "layout-container-top-nav": layoutStore.menuLayoutModeTop,
    "layout-container-fluid-width":
      layoutStore.menuLayoutModeTop && layoutStore.contentWidthMode === "fixed",
  };
});

// =========================== 响应式控制菜单 =======================

useResponsive(
  (matchs) => {
    layoutStore.setMenuCollapsed(!matchs);
  },
  { query: breakpointQueryMap.lg },
);

useResponsive(
  (matchs) => {
    layoutStore.setIsDrawerMenu(!matchs);
    if (layoutStore.isDrawerMenu) {
      layoutStore.setMenuCollapsed(true);
    }
    bus.emit("setDrawerMenuVisible", false);
  },
  { query: breakpointQueryMap.md },
);

// =========================== 事件处理 =======================

const reloadPage = async () => {
  noCache.value = route.name;
  reloadFlag.value = false;

  await nextTick();

  reloadFlag.value = true;
  noCache.value = "";
};

bus.on("reloadPage", reloadPage);

onUnmounted(() => {
  removeRouteListener();
  bus.off("reloadPage");
});
</script>

<style lang="scss">
.layout {
  background-color: var(--el-bg-color);

  @mixin set-transition($property: all) {
    transition: $property 0.3s ease;
  }

  .layout-side {
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    background-color: var(--el-bg-color);
    @include set-transition(width);
    z-index: 2010;

    &.dark {
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.32);
    }
  }

  .layout-container {
    min-height: 100vh;
    background-color: var(--el-bg-color-page);
    flex-direction: column;
    @include set-transition(padding);

    /*顶部菜单*/
    &.layout-container-top-nav {
      .layout-header {
        padding-left: 12px;
      }
      /*定宽*/
      &.layout-container-fluid-width {
        $width: 1200px;
        @mixin width-margin {
          max-width: $width;
          margin-left: auto;
          margin-right: auto;
        }
        .layout-header {
          padding-left: 0;
          .header-bar {
            @include width-margin;
          }
        }
        .layout-content {
          .layout-tabs {
            .tabs-nav-main {
              @include width-margin;
            }
          }
          .layout-content-main {
            @include width-margin;
            .page-header {
              margin-left: 0;
              margin-right: 0;
            }
          }
        }
      }
    }

    .layout-header {
      background-color: var(--el-bg-color);
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      padding: 0;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 2009;
      @include set-transition(width);
      &.topping {
        z-index: 2010;
      }
      &.dark {
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.32);
      }
    }
    .layout-content {
      padding-top: 62px;
      flex: auto;
      .layout-tabs {
        position: fixed;
        right: 0;
        z-index: 2001;
        background-color: var(--el-bg-color-page);
        padding: 6px 12px;
        @include set-transition(width);
        .tabs-nav-main {
          display: flex;
        }
      }
      &.tabs-fix {
        .layout-content-main {
          margin-top: 44px;
        }
      }
      .layout-content-main {
        margin: 16px 16px;
        padding: 0;
        overflow: initial;
      }
    }
    .layout-footer {
      margin: 48px 0 24px;
      padding: 0 16px;
      text-align: center;
      height: auto;
      background-color: var(--el-bg-color-page);
    }
  }
}
</style>
<style lang="scss">
.drawer-menu {
  .el-drawer__body {
    padding: 0;
  }
}
</style>
