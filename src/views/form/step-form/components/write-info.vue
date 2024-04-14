<template>
  <el-row class="write-info">
    <el-col
      :sm="{ span: 20, offset: 2 }"
      :md="{ span: 16, offset: 4 }"
      :lg="{ span: 12, offset: 6 }"
      :xl="{ span: 12, offset: 6 }"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="130px"
        :label-position="labelPosition"
      >
        <el-form-item label="付款账号：" prop="payAccount">
          <el-select
            v-model="ruleForm.payAccount"
            placeholder="请选择付款账号"
            clearable
          >
            <el-option label="admin@aa.com" value="admin@aa.com" />
          </el-select>
        </el-form-item>

        <el-form-item label="收款账号：" prop="receiverAccount">
          <el-input v-model="ruleForm.receiverAccount">
            <template #prepend>
              <el-select v-model="ruleForm.receiverMode" style="width: 90px">
                <el-option label="支付宝" value="alipay" />
                <el-option label="微信" value="weChat" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="收款人姓名：" prop="receiverName">
          <el-input
            v-model="ruleForm.receiverName"
            placeholder="请输收款人姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="转账金额：" prop="amount">
          <el-input
            v-model="ruleForm.amount"
            type="number"
            placeholder="请输入转账金额"
            clearable
            :prefix-icon="AmountIcon"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onNext(ruleFormRef)">
            下一步
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { h, reactive, ref, defineEmits } from "vue";
import { useResponsive } from "@/hooks/use-responsive";
import { breakpointQueryMap } from "@/utils/media-query-listener";
import { Icon } from "@iconify/vue";

const AmountIcon = h(Icon, { icon: "fa:usd", width: 25 });
const emits = defineEmits(["handleStep"]);
const labelPosition = ref("right");
const ruleFormRef = ref();
const ruleForm = reactive({
  payAccount: "admin@aa.com",
  receiverMode: "alipay",
  receiverAccount: "test@aa.com",
  receiverName: "张三",
  amount: 500,
});
const rules = reactive({
  payAccount: [
    { required: true, message: "请选择付款账号", trigger: "change" },
  ],
  receiverAccount: [
    { required: true, message: "请输入账户名", trigger: "blur" },
    { type: "email", message: "账户名因为邮箱格式" },
  ],
  receiverName: [
    { required: true, message: "请输入收款人姓名", trigger: "blur" },
  ],
  amount: [{ required: true, message: "请输入转账金额", trigger: "blur" }],
});

useResponsive(
  (matches, query) => {
    labelPosition.value = matches === true ? "top" : "right";
  },
  { query: breakpointQueryMap.xs },
);

const onNext = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits("handleStep", "forward", ruleForm);
    }
  });
};
</script>

<style scoped lang="scss">
.write-info {
  :deep(.el-form) {
    .el-form-item {
      margin-bottom: 24px;
      .el-form-item__content {
        .el-input,
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>
