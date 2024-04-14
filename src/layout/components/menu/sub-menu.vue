<template>
  <el-sub-menu
    :index="data.name"
    popper-class="sub-menu-popper"
    v-if="data.children && data.children.length"
    :popper-offset="2"
    class="sub-menu"
  >
    <template #title>
      <i class="icon" v-if="data.meta?.icon">
        <Icon :icon="data.meta.icon" />
      </i>
      <span class="label">{{ title }}</span>
    </template>
    <template v-for="child in data.children" :key="child.name">
      <SubMenu :data="child" />
    </template>
  </el-sub-menu>
  <MenuItem v-else :item="data" />
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { Icon } from "@iconify/vue";
import MenuItem from "./menu-item.vue";
import { routeI18n } from "@/locale";
import { useI18n } from "vue-i18n";

const props = defineProps({ data: Object });
const i18n = useI18n();

const title = computed(() => {
  return routeI18n(props.data, i18n.locale.value);
});
</script>

<style scoped lang="scss"></style>
