<template>
  <el-col :class="className" :span="span">
    <el-form-item v-bind="$attrs">
      <slot />
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
import {
  inject,
  computed,
  reactive,
  getCurrentInstance,
  onMounted,
  onUnmounted,
} from "vue";
import {
  formContextKey,
  FormItemData,
  QueryFormProvide,
} from "@/components/query-form/constants";

defineOptions({
  inheritAttrs: false,
  name: "QueryFormItem",
});

const instance = getCurrentInstance();

const formItem = reactive<FormItemData>({
  uid: instance?.uid!,
  index: null,
  visible: false,
});

const formContext = inject(formContextKey) as QueryFormProvide;

const className = computed(() => {
  return ["query-form-item", formItem.visible ? "col-hide" : ""];
});

const span = computed(() => {
  const { span } = formContext.form.value;
  return span;
});

onMounted(() => {
  formContext.registerForm(formItem);
});

onUnmounted(() => {
  formContext.unregisterForm(formItem.uid);
});
</script>

<style scoped lang="scss">
.col-hide {
  display: none;
}
</style>
