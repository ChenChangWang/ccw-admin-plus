<template>
  <el-menu-item :index="item.name" class="menu-item">
    <i class="icon" v-if="item.meta?.icon || isItemMustIcon">
      <Icon :icon="item.meta?.icon ? item.meta.icon : 'ep:link'" />
    </i>
    <template #title>
      <span class="label">{{ title }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import {
  ComponentInternalInstance,
  computed,
  getCurrentInstance,
  inject,
  onMounted,
  PropType,
} from "vue";
import { Icon } from "@iconify/vue";
import { useLayoutStore } from "@/store";
import { useI18n } from "vue-i18n";
import { routeI18n } from "@/locale";
import { MENU_CONTEXT_KEY, MenuProvider } from "./constants.ts";
import type { MenuData } from "@/router/constants.ts";

const props = defineProps({
  item: {
    type: Object as PropType<MenuData>,
    default: () => {},
  },
});
const i18n = useI18n();
const instance: ComponentInternalInstance | null = getCurrentInstance();
const menuContext = inject<MenuProvider>(MENU_CONTEXT_KEY);
const layoutStore = useLayoutStore();

const isItemMustIcon = computed(() => {
  return layoutStore.menuLayoutModeMix;
});

const title = computed(() => {
  return routeI18n(props.item, i18n.locale.value);
});

onMounted(() => {
  const el = instance?.subTree?.el;
  if (el) {
    el.addEventListener(
      "click",
      (e: Event) => {
        menuContext?.onItemClick(props.item, e);
      },
      { capture: true },
    );
  }
});
</script>

<style scoped lang="scss"></style>
