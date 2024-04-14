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

<script setup>
import { Icon } from "@iconify/vue";
defineProps({
  index: Number,
  currentRouteTagIndex: Number,
  tagList: Array,
});
</script>

<style lang="scss" scoped></style>
