<template>
  <div
    :class="['side-menu', { 'side-dark': layoutStore.asideEffect === 'dark' }]"
    :style="style"
  >
    <Logo class="side-logo" :collapse="collapse" />
    <Menu
      class="menu scrollbar-hide"
      v-bind="$attrs"
      :effect="layoutStore.asideEffect"
      :collapse="collapse"
      :menuList="menuList"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Menu from "../menu/index.vue";
import Logo from "@/components/logo/index.vue";
import { useLayoutStore, useRouterStore } from "@/store";
defineOptions({
  inheritAttrs: false,
  name: "SideMenu",
});

const props = defineProps({
  collapse: Boolean,
});
const layoutStore = useLayoutStore();
const routerStore = useRouterStore();

const style = computed(() => {
  if (layoutStore.asideEffect === "dark") {
    return {
      ["--el-bg-color"]: "#141414",
      ["--el-text-color-primary"]: "#E5EAF3",
      ["--el-text-color-regular"]: "#CFD3DC",
      ["--el-fill-color-light"]: "#262727",
    };
  }
});

const menuList = computed(() => {
  if (layoutStore.menuLayoutModeMix) {
    return layoutStore.mixLeftMenuList;
  } else {
    return routerStore.menuList;
  }
});
</script>

<style scoped lang="scss">
html.dark .side-menu,
.side-dark.side-menu {
  --side-logo-border-color: #090909;
}
.side-menu {
  --side-logo-border-color: #f2f6fc;
  .side-logo {
    height: 61px;
    border-bottom: 1px solid var(--side-logo-border-color);
  }
  .menu {
    height: calc(100vh - 61px);
    overflow-y: auto;
  }
}
.side-dark {
  .side-logo {
    border-bottom: 1px solid var(--side-logo-border-color);
  }
}
</style>
