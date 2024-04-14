<template>
  <el-check-tag :checked="checked" @change="onChange" class="tag-select-item">
    <slot />
  </el-check-tag>
</template>

<script setup>
import {
  defineProps,
  inject,
  computed,
  onMounted,
  onUnmounted,
  reactive,
  getCurrentInstance,
} from "vue";
import { tagSelectContextKey } from "./constants";
defineOptions({
  name: "TagItem",
});
const props = defineProps({
  value: String,
});
const tagSelect = inject(tagSelectContextKey);
const instance = getCurrentInstance();

const checked = computed(() => {
  return tagSelect.model.value.some((val) => val === props.value);
});

const onChange = (status) => {
  tagSelect.checkedChange(props.value, status);
};

const tagItem = reactive({
  uid: instance.uid,
  value: props.value,
});

onMounted(() => {
  tagSelect.registerTagItem(tagItem);
});

onUnmounted(() => {
  tagSelect.unregisterTagItem(tagItem.uid);
});
</script>

<style scoped lang="scss"></style>
