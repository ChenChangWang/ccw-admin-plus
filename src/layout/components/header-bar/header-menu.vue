<template>
  <Menu
    class="scrollbar-hide"
    :effect="layoutStore.headerEffect"
    mode="horizontal"
    :menuList="menuList"
    :beforeItemClick="beforeItemClick"
    :matched="menuActiveRoute ? [menuActiveRoute] : undefined"
    :route="menuActiveRoute"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import Menu from "@/layout/components/menu/index.vue";
import { useLayoutStore, useRouterStore } from "@/store";
import { useRoute } from "vue-router";

const layoutStore = useLayoutStore();
const routerStore = useRouterStore();
const route = useRoute();

const menuList = computed(() => {
  if (layoutStore.menuLayoutModeMix) {
    return routerStore.menuList.map((item) => {
      const { children, ...other } = item;
      return other;
    });
  } else {
    return routerStore.menuList;
  }
});

const menuActiveRoute = computed(() => {
  if (layoutStore.menuLayoutModeMix) {
    const matched = route.matched;
    return routerStore.menuList.find((menu) => {
      return matched.find((item) => item.path === menu.path);
    });
  }
});

const updLeftMenuList = (data) => {
  const leftMenuList = routerStore.menuList.find((item) => {
    return item.path === data.path;
  })?.children;
  layoutStore.updatePatch({ mixLeftMenuList: leftMenuList });
};

const init = () => {
  if (layoutStore.menuLayoutModeMix) {
    updLeftMenuList(route.matched[0]);
  }
};
init();

// 递归查找第一个叶子节点
function findFirstLeafNode(data) {
  if (!data.children || data.children.length === 0) {
    return data;
  } else {
    const result = findFirstLeafNode(data.children[0]);
    if (result) {
      return result;
    }
  }
}

const beforeItemClick = (data, isLink, event) => {
  //混合模式   跳转到第一个路由
  if (layoutStore.menuLayoutModeMix) {
    if (!isLink) {
      updLeftMenuList(data);
      if (layoutStore.mixLeftMenuList && layoutStore.mixLeftMenuList.length) {
        return findFirstLeafNode(layoutStore.mixLeftMenuList[0]);
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
