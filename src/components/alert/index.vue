<template>
  <div class="alert" v-show="visible">
    <div class="alert-icon">
      <slot name="icon" />
    </div>
    <div class="alert-content">
      <slot />
    </div>
    <div class="alert-operation">
      <slot name="operation" />

      <template v-if="closable">
        <span @click="close" style="cursor: pointer">
          <Icon icon="ep:close" />
        </span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { Icon } from "@iconify/vue";
const props = defineProps({
  closable: {
    type: Boolean,
    default: false,
  },
});
const visible = ref(true);
const close = (evt) => {
  visible.value = false;
};
</script>

<style scoped lang="scss">
.alert {
  display: flex;
  align-items: center;
  background: var(--el-color-primary-light-9);
  border: 1px solid var(--el-color-primary-light-7);
  border-radius: 3px;
  padding: 8px 12px;
  margin: 10px 0;
  .alert-icon {
    margin-right: 8px;
    color: var(--el-color-primary);
    font-size: 15px;
    display: flex;
    align-items: center;
  }
  .alert-content {
    flex: 1;
  }
  .alert-operation {
    margin-left: 8px;
    :deep(.el-button--text) {
      height: auto;
      padding: 0;
    }
  }
}
</style>
