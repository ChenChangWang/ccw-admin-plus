<template>
  <el-result
    class="success-form"
    icon="success"
    title="操作成功"
    sub-title="预计两小时到账"
  >
    <template #extra>
      <el-form label-width="110px" :label-position="labelPosition">
        <el-form-item label="付款账号：">
          {{ submitData.payAccount }}
        </el-form-item>
        <el-form-item label="收款账号：">
          {{ submitData.receiverAccount }}
        </el-form-item>
        <el-form-item label="收款人姓名：">
          {{ submitData.receiverName }}
        </el-form-item>
        <el-form-item label="转账金额：">
          {{ submitData.amount }}
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="onAgent">再转一笔</el-button>
      <el-button>查看账单</el-button>
    </template>
  </el-result>
</template>

<script setup>
import { defineEmits, ref } from "vue";
import { useResponsive } from "@/hooks/use-responsive";
import { breakpointQueryMap } from "@/utils/media-query-listener";
const props = defineProps({
  submitData: {
    type: Object,
    default: () => {
      return {
        payAccount: String,
        receiverMode: String,
        receiverAccount: String,
        receiverName: String,
        amount: Number,
      };
    },
  },
});
const labelPosition = ref("right");

const emits = defineEmits(["handleStep"]);
useResponsive(
  (matches, query) => {
    labelPosition.value = matches === true ? "top" : "right";
  },
  { query: breakpointQueryMap.xs },
);
const onAgent = () => {
  emits("handleStep", "set", 1);
};
</script>

<style scoped lang="scss">
.success-form {
  padding: 0;
  width: 70%;
  margin: 0 auto;
  :deep(.el-result__extra) {
    width: 100%;
    .el-form {
      padding: 24px 40px 6px 24px;
      margin-bottom: 24px;
      background-color: var(--el-fill-color-light);
      .el-form-item {
        margin-bottom: 24px;
      }
    }
  }
}
</style>
