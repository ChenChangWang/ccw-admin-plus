<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>
<script lang="ts" setup>
import { RouterView } from "vue-router";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
import { computed, provide } from "vue";
import useLocale from "@/hooks/use-locale";
import { LOCALE_ZH_CN, LOCALE_EN } from "./locale";

const { localeValue } = useLocale();

const locale = computed(() => {
  switch (localeValue.value) {
    case LOCALE_ZH_CN:
      return zhCn;
    case LOCALE_EN:
      return en;
    default:
      return zhCn;
  }
});
</script>
<style scoped></style>
