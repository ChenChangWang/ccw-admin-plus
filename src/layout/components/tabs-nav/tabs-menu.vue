<template>
  <el-dropdown-menu>
    <el-dropdown-item
      :disabled="index !== currentRouteTagIndex"
      command="reload"
    >
      <i class="icon"><Icon icon="iconoir:refresh" /></i>
      {{ $t("layout.tabs.reload") }}
    </el-dropdown-item>
    <el-dropdown-item command="current">
      <i class="icon"><Icon icon="ep:minus" /></i>
      {{ $t("layout.tabs.close") }}
    </el-dropdown-item>
    <el-dropdown-item :disabled="index < 1" command="left">
      <i class="icon"><Icon icon="ant-design:arrow-left-outlined" /></i>
      {{ $t("layout.tabs.closeLeft") }}
    </el-dropdown-item>
    <el-dropdown-item :disabled="index >= tagList.length - 1" command="right">
      <i class="icon"><Icon icon="ant-design:arrow-right-outlined" /></i>
      {{ $t("layout.tabs.closeRight") }}
    </el-dropdown-item>
    <el-dropdown-item command="others">
      <i class="icon"><Icon icon="ep:switch" /></i>
      {{ $t("layout.tabs.closeOther") }}
    </el-dropdown-item>
    <el-dropdown-item command="all">
      <i class="icon"><Icon icon="ep:circle-close" /></i>
      {{ $t("layout.tabs.closeAll") }}
    </el-dropdown-item>
  </el-dropdown-menu>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { PropType } from "vue";
import { TabsNavProps } from "@/store/modules/tabs-nav/types.ts";
defineProps({
  index: {
    type: Number,
    default: 1,
  },
  currentRouteTagIndex: {
    type: Number,
    default: 1,
  },
  tagList: {
    type: Array as PropType<TabsNavProps[]>,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
