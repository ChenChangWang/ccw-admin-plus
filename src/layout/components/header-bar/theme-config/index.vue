<template>
  <div @click="setVisible">
    <span class="icon item-target">
      <Icon icon="ep:setting" />
    </span>
    <el-drawer
      v-model="drawerVisible"
      direction="rtl"
      :size="300"
      append-to-body
      title="主题风格配置"
      :show-close="true"
    >
      <template #default><ConfigSetting /> </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import ConfigSetting from "./components/config-setting.vue";

const drawerVisible = ref(false);
const setVisible = () => {
  drawerVisible.value = true;
};
</script>

<style scoped lang="scss"></style>
