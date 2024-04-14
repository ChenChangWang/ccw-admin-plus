<template>
  <el-aside
    class="layout-side"
    :class="{ dark: layoutStore.asideEffect === 'dark' }"
    :width="layoutStore.asideWidth + 'px'"
    v-if="layoutStore.isAside"
  >
    <SideMenu :collapse="layoutStore.menuCollapse" />
  </el-aside>

  <!--  抽屉菜单  -->
  <el-drawer
    v-if="layoutStore.isDrawerMenu"
    v-model="drawerVisible"
    direction="ltr"
    :with-header="false"
    :size="layoutStore.fixMenuWidth"
    class="drawer-menu"
    append-to-body
  >
    <template #default>
      <SideMenu :collapse="false" />
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from "vue";
import SideMenu from "./side-menu.vue";
import bus from "@/utils/bus";
import { useLayoutStore } from "@/store";

const drawerVisible = ref(false);
const layoutStore = useLayoutStore();

const toggleDrawerMenu = () => {
  drawerVisible.value = !drawerVisible.value;
};

bus.on("setDrawerMenuVisible", (val:boolean) => {
  drawerVisible.value = val;
});

bus.on("toggleDrawerMenu", () => {
  toggleDrawerMenu();
});

onUnmounted(() => {
  bus.off("setDrawerMenuVisible");
  bus.off("toggleDrawerMenu");
});
</script>

<style scoped lang="scss"></style>
