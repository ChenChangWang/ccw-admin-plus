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

<script setup>
import { computed, onUnmounted, ref, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";
import TabsMenu from "./tabs-menu.vue";
import { HOME_PATH } from "@/router/constants";
import { routeI18n } from "@/locale";
import { useI18n } from "vue-i18n";
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
  itemData: Object,
  index: Number,
  isActive: Boolean,
  tagList: Array,
});
const emits = defineEmits(["toPage", "handleTagsOption", "handleClose"]);
const dropdownRef = ref();
const isDropdown = ref(false);
const currentRoute = useRoute();
const router = useRouter();
const i18n = useI18n();

const title = computed(() => {
  return routeI18n(props.itemData, i18n.locale.value);
});

const isHomeTag = computed(() => {
  return props.itemData.path === HOME_PATH;
});

const currentRouteTagIndex = computed(() => {
  return props.tagList.findIndex((item) => {
    return routeEqual(item, currentRoute);
  });
});

// =========================== 控制下拉选择dropdown =======================
const visibleChange = (visible) => {
  isDropdown.value = visible;
};

const handleMouseDown = (event) => {
  if (isDropdown.value) {
    const ref = dropdownRef.value;
    const trigger = ref.triggeringElementRef.$el;
    const content = ref.contentRef;
    if (!trigger.contains(event.target) && !content.contains(event.target)) {
      ref.handleClose();
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

const command = (type) => {
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
