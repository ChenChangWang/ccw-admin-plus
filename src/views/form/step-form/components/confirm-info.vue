<template>
  <el-row class="confirm-info">
    <el-col
      :sm="{ span: 20, offset: 2 }"
      :md="{ span: 16, offset: 4 }"
      :lg="{ span: 12, offset: 6 }"
      :xl="{ span: 12, offset: 6 }"
    >
      <Alert :closable="true">
        <template #icon>
          <Icon icon="material-symbols:info" />
        </template>
        确认转账后，资金将直接打入对方账户，无法退回。
      </Alert>

      <el-descriptions :column="1" border>
        <el-descriptions-item label="付款账号：" align="center">
          {{ submitData.payAccount }}
        </el-descriptions-item>
        <el-descriptions-item label="收款账号：" align="center">
          {{ submitData.receiverAccount }}
        </el-descriptions-item>
        <el-descriptions-item label="收款人姓名：" align="center">
          {{ submitData.receiverName }}
        </el-descriptions-item>
        <el-descriptions-item label="转账金额：" align="center">
          {{ submitData.amount }}
        </el-descriptions-item>
      </el-descriptions>

      <el-divider />

      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="支付密码：" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入支付密码"
          />
        </el-form-item>

        <el-form-item label=" " style="margin-top: 28px">
          <el-button
            @click="goNext(ruleFormRef)"
            type="primary"
            :loading="loading"
          >
            提交
          </el-button>
          <el-button @click="goPrev" :loading="loading">上一步</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, defineEmits, reactive } from "vue";
import useLoading from "@/hooks/use-loading";
import { stepFormSubmit } from "@/api/form";
import Alert from "@/components/alert/index.vue";
import { Icon } from "@iconify/vue";
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
const ruleFormRef = ref();
const ruleForm = reactive({
  password: "abc",
});
const rules = reactive({
  password: [
    {
      required: true,
      message: "请输入支付密码",
      trigger: "blur",
    },
  ],
});
const emits = defineEmits(["handleStep"]);
const [loading, setLoading] = useLoading(false);

const submit = async () => {
  setLoading(true);
  try {
    const { data } = await stepFormSubmit();
    emits("handleStep", "forward");
  } catch (err) {
  } finally {
    setLoading(false);
  }
};
const goPrev = () => {
  emits("handleStep", "backward");
};
const goNext = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      submit();
    }
  });
};
</script>

<style scoped lang="scss">
.confirm-info {
  :deep(.el-descriptions) {
    .el-descriptions__label {
      width: 110px;
    }
  }
  :deep(.alert) {
    margin: 0 0 20px 0;
  }
  :deep(.el-divider) {
    margin: 28px 0;
  }
}
</style>
