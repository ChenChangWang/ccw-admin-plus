<template>
  <el-card class="store-management content-card">
    <template #header>
      <span>仓库管理</span>
    </template>

    <QueryForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      :size="formSize"
      :span="span"
      :gutter="24"
    >
      <QueryFormItem label="仓库名" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入仓库名称"
          clearable
        />
      </QueryFormItem>
      <QueryFormItem label="仓库域名" prop="url">
        <el-input v-model="ruleForm.url" placeholder="请输入仓库域名" clearable>
          <template #prepend>Http://</template>
          <template #append>.com</template>
        </el-input>
      </QueryFormItem>
      <QueryFormItem label="仓库管理员" prop="owner">
        <el-select
          v-model="ruleForm.owner"
          placeholder="请选择仓库管理员"
          clearable
        >
          <el-option label="张 三" value="zhangsan" />
          <el-option label="王小二" value="wangxiaoer" />
        </el-select>
      </QueryFormItem>
      <QueryFormItem label="审批人" prop="approver">
        <el-select
          v-model="ruleForm.approver"
          placeholder="请选择审批人"
          clearable
        >
          <el-option label="张 三" value="zhangsan" />
          <el-option label="王小二" value="wangxiaoer" />
        </el-select>
      </QueryFormItem>
      <QueryFormItem label="生效日期：" prop="dateRange">
        <el-date-picker
          v-model="ruleForm.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="请选择"
          end-placeholder="请选择"
          clearable
        />
      </QueryFormItem>
      <QueryFormItem label="仓库类型" prop="type">
        <el-select
          v-model="ruleForm.type"
          placeholder="请选择仓库类型"
          clearable
        >
          <el-option label="私密" value="private" />
          <el-option label="公开" value="public" />
        </el-select>
      </QueryFormItem>
    </QueryForm>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { QueryForm, QueryFormItem } from "@/components/query-form";
import type { ComponentSize ,FormRules} from "element-plus";

type Type = "private" | "public" | "";
interface RuleForm {
  name: string;
  url: string;
  owner: string;
  approver: string;
  dateRange: string;
  type: Type;
}

const span = [
  [0, 24, "top"],
  [513, 12, "top"],
  [701, 12, "top"],
  [Infinity, 8, "top"],
];
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<InstanceType<typeof QueryForm>>();
const ruleForm = reactive<RuleForm>({
  name: "",
  url: "",
  owner: "",
  approver: "",
  dateRange: "",
  type: "",
});
const formRef = computed(() => {
  return ruleFormRef.value?.formRef;
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入仓库名称", trigger: "blur" }],
  url: [{ required: true, message: "请输入仓库域名", trigger: "blur" }],
  owner: [
    {
      required: true,
      message: "请选择仓库管理员",
      trigger: "change",
    },
  ],
  approver: [
    {
      required: true,
      message: "请选择审批人",
      trigger: "change",
    },
  ],
  dateRange: [
    {
      type: "array",
      required: true,
      message: "请选择生效日期",
      fields: {
        0: { type: "date", required: true, message: "请选择开始日期" },
        1: { type: "date", required: true, message: "请选择结束日期" },
      },
    },
  ],
  type: [
    {
      required: true,
      message: "请选择仓库类型",
      trigger: "change",
    },
  ],
});

const submitForm = () => {
  if (!formRef.value) return;
  return formRef.value.validate();
};

const resetForm = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
};

defineExpose({
  submitForm,
  resetForm,
});
</script>

<style scoped lang="scss"></style>
