<template>
  <div class="layout-tabs" :style="{ width: navWidth }">
    <div class="tabs-nav-main">
      <TabsNav />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import TabsNav from "../tabs-nav/index.vue";
import { useLayoutStore } from "@/store";

const layoutStore = useLayoutStore();
const navWidth = computed(() => {
  return `calc(100% - ${layoutStore.asideWidth}px)`;
});
</script>

<style scoped lang="scss"></style>
