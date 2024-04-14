<template>
  <el-dropdown
    ref="dropdownRef"
    :disabled="isHomeTag"
    :popper-options="popperOptions"
    popper-class="no-arrow-popper tag-close-popper"
    trigger="contextmenu"
    @command="command"
    @visible-change="visibleChange"
  >
    <el-tag
      :class="[
        'tags-tag',
        {
          'is-active': isActive,
          'is-dropdown': isDropdown,
        },
      ]"
      :closable="!isHomeTag"
      :disable-transitions="true"
      size="large"
      type="info"
      @click="onClick()"
      @close="onClose()"
    >
      {{ title }}
    </el-tag>

    <template #dropdown>
      <TabsMenu
          :currentRouteTagIndex="currentRouteTagIndex"
          :index="index"
          :tagList="tagList"
      />
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, defineEmits, PropType } from "vue";
import { useRoute } from "vue-router";
import TabsMenu from "./tabs-menu.vue";
import { HOME_PATH } from "@/router/constants";
import { routeI18n } from "@/locale";
import { useI18n } from "vue-i18n";
import { TabsNavProps } from "@/store/modules/tabs-nav/types.ts";
import {DropdownInstance, ElDropdown} from "element-plus";
import { OptionType } from "@/layout/components/tabs-nav/types.ts";
import { routeEqual } from "@/utils/util";

const popperOptions = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 3],
      },
    },
  ],
};
const props = defineProps({
  itemData: Object as PropType<TabsNavProps>,
  index: Number,
  isActive: Boolean,
  tagList: {
    type: Array as PropType<TabsNavProps[]>,
    default: () => [],
  },
});
const emits = defineEmits(["toPage", "handleTagsOption", "handleClose"]);
const dropdownRef = ref<DropdownInstance>();
const isDropdown = ref(false);
const currentRoute = useRoute();
const i18n = useI18n();

const title = computed(() => {
  return routeI18n(props.itemData, i18n.locale.value);
});

const isHomeTag = computed(() => {
  return props.itemData?.path === HOME_PATH;
});

const currentRouteTagIndex = computed(() => {
  return props.tagList.findIndex((item) => {
    return routeEqual(item, currentRoute);
  });
});

// =========================== 控制下拉选择dropdown =======================
const visibleChange = (visible: boolean) => {
  isDropdown.value = visible;
};

const handleMouseDown = (event: MouseEvent) => {
  if (isDropdown.value) {
    const trigger = dropdownRef.value?.triggeringElementRef.$el;
    const content = dropdownRef.value?.contentRef;
    if (
      !trigger.contains(event.target as HTMLElement) &&
      !content?.contains(event.target as HTMLElement)
    ) {
      dropdownRef.value?.handleClose();
    }
  }
};

document.addEventListener("mousedown", handleMouseDown);
onUnmounted(() => {
  document.removeEventListener("mousedown", handleMouseDown);
});

// =========================== 事件处理 =======================

const onClick = () => {
  emits("toPage", props.itemData);
};

const onClose = () => {
  emits("handleClose", props.itemData, currentRoute);
};

const command = (type: OptionType) => {
  emits("handleTagsOption", type, props.itemData, currentRoute);
};
</script>

<style lang="scss" scoped>
.tags-tag {
  background-color: var(--el-bg-color);
  cursor: pointer;
  font-size: 14px;
  padding: 0 16px;
  &:hover {
    color: var(--el-text-color-regular);
  }
  &.is-active {
    color: var(--el-color-primary);
  }
  &.is-dropdown {
    color: var(--el-color-danger);
  }

  :deep(.el-tag__close) {
    margin-left: 4px;
    &:hover {
      background-color: transparent;
      color: var(--el-text-color-primary);
    }
  }
}
</style>
