<template>
  <div class="account-tags">
    <div class="tag-title">标签</div>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      :disable-transitions="false"
      effect="plain"
      type="info"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="btn-dashed" size="small" @click="showInput">
      +
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";

const inputValue = ref("");
const dynamicTags = ref([
  "极客精神",
  "单手一个6~",
  "T技术狂热者",
  "细节控",
  "最强王者",
  "不错不错！",
]);
const inputVisible = ref(false);
const InputRef = ref();

const handleClose = (tag:string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.input.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value && dynamicTags.value.indexOf(inputValue.value) === -1) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};
</script>

<style scoped lang="scss">
.account-tags {
  .tag-title {
    margin-bottom: 16px;
  }
  :deep(.el-tag),
  :deep(.el-button),
  :deep(.el-input) {
    margin: 0 6px 8px 0;
  }
  :deep(.el-tag) {
  }
  :deep(.el-input) {
    width: 70px;
  }
}
</style>
