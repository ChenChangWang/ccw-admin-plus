<template>
  <el-header
    class="layout-header"
    :class="{
      dark: layoutStore.headerEffect === 'dark',
      topping: layoutStore.isToppingHeader,
    }"
    :style="headerStyle"
    height="62px"
  >
    <HeaderBar />
  </el-header>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import HeaderBar from "../header-bar/index.vue";
import { useLayoutStore } from "@/store";

const layoutStore = useLayoutStore();

const headerWidth = computed(() => {
  return `calc(100% - ${
    layoutStore.isToppingHeader ? 0 : layoutStore.asideWidth
  }px)`;
});

const headerStyle = computed(() => {
  let result = { width: headerWidth.value };
  if (layoutStore.headerEffect === "dark") {
    Object.assign(result, {
      ["--el-bg-color"]: "#141414",
      ["--el-text-color-primary"]: "#E5EAF3",
      ["--el-text-color-regular"]: "#CFD3DC",
      ["--el-fill-color-light"]: "#262727",
    });
  }
  return result;
});
</script>

<style scoped lang="scss"></style>
