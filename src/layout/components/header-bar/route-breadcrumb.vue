<template>
  <el-breadcrumb separator="/" class="route-breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in list" :key="item.name">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { routeI18n } from "@/locale";

const route = useRoute();
const i18n = useI18n();
const list = computed(() => {
  return route.matched.map((r) => {
    const { name, meta } = r;
    return { name, title: routeI18n(r, i18n.locale.value) };
  });
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/var" as var;

.route-breadcrumb {
  margin-left: 12px;
  :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      color: var(--el-text-color-secondary);
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: var(--el-text-color-regular);
      }
    }
  }

  @media screen and (max-width: var.$sm) {
    display: none;
  }
}
</style>
