<template>
  <el-check-tag :checked="checked" @change="onChange" class="tag-select-item">
    <slot />
  </el-check-tag>
</template>

<script lang="ts" setup>
import {
  defineProps,
  inject,
  computed,
  onMounted,
  onUnmounted,
  reactive,
  getCurrentInstance,
  PropType,
} from "vue";
import {
  TagItemData,
  tagSelectContextKey,
  TagSelectProvider,
} from "./constants";

defineOptions({
  name: "TagItem",
});
const props = defineProps({
  value: String as PropType<string>,
});
const tagSelect = inject(tagSelectContextKey) as TagSelectProvider;
const instance = getCurrentInstance();

const checked = computed(() => {
  return tagSelect.model.value?.some((val: string) => val === props.value);
});

const onChange = (status: boolean) => {
  tagSelect.checkedChange(props.value!, status);
};

const tagItem = reactive<TagItemData>({
  uid: instance?.uid!,
  value: props.value!,
});

onMounted(() => {
  tagSelect.registerTagItem(tagItem);
});

onUnmounted(() => {
  tagSelect.unregisterTagItem(tagItem.uid);
});
</script>

<style scoped lang="scss"></style>
