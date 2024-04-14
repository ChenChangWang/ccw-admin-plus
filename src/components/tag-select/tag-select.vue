<template>
  <div :class="{ 'tag-select': true, 'tag-select-expanded': !collapse }">
    <el-check-tag
      :checked="allChecked"
      @change="allChange"
      class="tag-select-item"
      >全部
    </el-check-tag>
    <slot />
    <div class="tag-select-expand-btn" @click="toggleCollapse()">
      <el-button type="primary" link>
        {{ collapse ? $t("form.expand") : $t("form.shrink") }}
        <Icon :icon="collapse ? 'uiw:down' : 'uiw:up'" />
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, provide, getCurrentInstance, defineModel, computed } from "vue";
import { Icon } from "@iconify/vue";
import {
  TagItemData,
  tagSelectContextKey,
  TagSelectProvider,
} from "./constants";
import useOrderedChildren from "@/hooks/use-ordered-children";

const model = defineModel<string[]>();
const collapse = ref(true);
const emit = defineEmits(["change"]);
const instance = getCurrentInstance();
const {
  children: tagItems,
  addChild: registerTagItem,
  removeChild: unregisterTagItem,
} = useOrderedChildren<TagItemData>(instance!, "TagItem");

const checkedChange = (value: string, status: boolean) => {
  let newValue = model.value;
  if (status) {
    newValue?.push(value);
  } else {
    newValue = model.value?.filter((val) => val !== value);
  }
  model.value = newValue;
  emit("change", newValue);
};

provide<TagSelectProvider>(tagSelectContextKey, {
  model,
  checkedChange,
  registerTagItem,
  unregisterTagItem,
});

const allChecked = computed(() => {
  return model.value?.length === tagItems.value.length;
});

const allChange = (status: boolean) => {
  let newValue =
    status === true ? tagItems.value.map((item) => item.value) : [];
  model.value = newValue;
  emit("change", newValue);
};

const toggleCollapse = () => {
  collapse.value = !collapse.value;
};
</script>

<style scoped lang="scss">
.tag-select {
  padding-right: 50px;
  max-height: 32px;
  position: relative;
  overflow: hidden;
  line-height: 32px;
  user-select: none;
  /*  transition: all 0.3s;*/
  width: 100%;
  &.tag-select-expanded {
    max-height: 200px;
  }
  :deep(.tag-select-item) {
    display: inline-block;
    margin-right: 24px;
    background-color: transparent;
    color: var(--el-text-color-primary);
    font-weight: 500;
    font-size: 12px;
    padding: 4px 8px;
    &:hover {
      background-color: transparent;
    }
    &.is-checked {
      background-color: var(--el-color-primary);
      color: #ffffff;
    }
  }
  .tag-select-expand-btn {
    position: absolute;
    top: 0px;
    right: 0;
  }
}
</style>
