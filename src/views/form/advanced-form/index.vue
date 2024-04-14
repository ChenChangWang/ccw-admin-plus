<template>
  <div class="advanced-form">
    <div class="page-header">
      <span class="page-header-title"> 高级表单 </span>
      <div class="page-header-container">
        高级表单常见于一次性输入和提交大批量数据的场景。
      </div>
    </div>
    <StoreManagement ref="storeRef" style="margin-top: 14px" />
    <TaskManagement ref="taskRef" style="margin-top: 14px" />
    <UserManagement style="margin-top: 14px" />

    <div class="actions-warp">
      <div class="actions">
        <el-button @click="onReset">重置</el-button>
        <el-button type="primary" @click="onSubmit" :loading="loading">
          提交
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import StoreManagement from "./components/store-management.vue";
import TaskManagement from "./components/task-management.vue";
import UserManagement from "./components/user-management.vue";
import useLoading from "@/hooks/use-loading";
import { userFormSubmit } from "@/api/form";
import { ElMessage } from "element-plus";

defineOptions({
  name: "AdvancedForm", //不命名组件，keep-alive的include不属性生效
});
const storeRef = ref();
const taskRef = ref();
const [loading, setLoading] = useLoading(false);

const onSubmit = () => {
  const p1 = storeRef.value.submitForm();
  const p2 = taskRef.value.submitForm();

  Promise.all([p1, p2])
    .then((res) => {
      //校验通过
      submit();
    })
    .catch((e) => {
      //校验不通过
    });
};
const submit = async () => {
  setLoading(true);
  try {
    const { data } = await userFormSubmit();
    ElMessage.success("操作成功！");
  } catch (err) {
  } finally {
    setLoading(false);
  }
};
const onReset = () => {
  storeRef.value.resetForm();
  taskRef.value.resetForm();
};
</script>

<style scoped lang="scss">
.advanced-form {
  :deep(.content-card) {
    .el-card__header {
      font-size: 16px;
      color: var(--el-text-color-primary);
    }
  }
  margin-bottom: 74px;
  .actions-warp {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 3;
    bottom: 0;
    height: 56px;
    line-height: 56px;
    padding: 0 24px;
    background: var(--el-bg-color);
    text-align: right;
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
