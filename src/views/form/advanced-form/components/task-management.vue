<template>
  <el-card class="task-management content-card">
    <template #header>
      <span>任务管理</span>
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
      <QueryFormItem label="任务名" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入任务名"
          clearable
        />
      </QueryFormItem>
      <QueryFormItem label="任务描述" prop="desc">
        <el-input
          v-model="ruleForm.desc"
          placeholder="请输入任务描述"
          clearable
        />
      </QueryFormItem>
      <QueryFormItem label="执行人" prop="executor">
        <el-select
          v-model="ruleForm.executor"
          placeholder="请选择执行人"
          clearable
        >
          <el-option label="张 三" value="zhangsan" />
          <el-option label="王小二" value="wangxiaoer" />
        </el-select>
      </QueryFormItem>
      <QueryFormItem label="负责人" prop="director">
        <el-select
          v-model="ruleForm.director"
          placeholder="请选择负责人"
          clearable
        >
          <el-option label="张 三" value="zhangsan" />
          <el-option label="王小二" value="wangxiaoer" />
        </el-select>
      </QueryFormItem>
      <QueryFormItem label="生效日期：" prop="date">
        <el-time-picker v-model="ruleForm.date" placeholder="请选择生效日期" />
      </QueryFormItem>
      <QueryFormItem label="任务类型" prop="type">
        <el-select
          v-model="ruleForm.type"
          placeholder="请选择任务类型"
          clearable
        >
          <el-option label="私密" value="private" />
          <el-option label="公开" value="public" />
        </el-select>
      </QueryFormItem>
    </QueryForm>
  </el-card>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { QueryForm, QueryFormItem } from "@/components/query-form";

const span = [
  [0, 24, "top"],
  [513, 12, "top"],
  [701, 12, "top"],
  [Infinity, 8, "top"],
];
const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  name: "",
  desc: "",
  executor: "",
  director: "",
  date: "",
  type: "",
});

const formRef = computed(() => {
  return ruleFormRef.value?.formRef;
});

const rules = reactive({
  name: [{ required: true, message: "请输入任务名", trigger: "blur" }],
  desc: [{ required: true, message: "请输入任务描述", trigger: "blur" }],
  executor: [
    {
      required: true,
      message: "请选择执行人",
      trigger: "change",
    },
  ],
  director: [
    {
      required: true,
      message: "请选择负责人",
      trigger: "change",
    },
  ],
  date: [{ type: "date", required: true, message: "请选择生效日期" }],
  type: [
    {
      required: true,
      message: "请选择任务类型",
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
