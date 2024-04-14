<template>
  <el-dropdown trigger="click" @command="command">
    <slot />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in densityOptions"
          :key="item.value"
          :command="item.value"
          :class="{ 'dropdown-item-selected': size === item.value }"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const mode = defineModel();
const size = computed({
  get: () => mode.value,
  set: (val) => {
    mode.value = val;
  },
});
const densityOptions = computed(() => [
  {
    value: "default",
    label: t("table.density.default"),
  },
  {
    value: "large",
    label: t("table.density.large"),
  },
  {
    value: "small",
    label: t("table.density.small"),
  },
]);
const command = (value) => {
  size.value = value;
};
</script>

<style scoped lang="scss"></style>
