<template>
  <el-menu-item :index="item.name" class="menu-item">
    <i v-if="item.meta?.icon || isItemMustIcon" class="icon">
      <Icon :icon="item.meta?.icon ? item.meta.icon : 'ep:link'" />
    </i>
    <template #title>
      <span class="label">{{ title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup>
import { computed, getCurrentInstance, inject, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useLayoutStore } from "@/store";
import { useI18n } from "vue-i18n";
import { routeI18n } from "@/locale";
const props = defineProps({ item: Object });
const i18n = useI18n();
const instance = getCurrentInstance();
const menuContext = inject("menu");
const layoutStore = useLayoutStore();

const isItemMustIcon = computed(() => {
  return layoutStore.menuLayoutModeMix;
});

const title = computed(() => {
  return routeI18n(props.item, i18n.locale.value);
});

onMounted(() => {
  const el = instance.subTree?.el;
  if (el) {
    el.addEventListener(
      "click",
      (e) => {
        menuContext.onItemClick(props.item, e);
      },
      { capture: true },
    );
  }
});
</script>

<style lang="scss" scoped></style>
