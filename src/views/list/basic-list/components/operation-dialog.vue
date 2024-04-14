<template>
  <el-dialog v-model="model" width="530px">
    <template #header>
      <span class="el-dialog__title">
        {{ title }}
      </span>
    </template>
    <el-form
      class="full-form"
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="top"
      status-icon
    >
      <el-form-item label="任务名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入任务名称" />
      </el-form-item>

      <el-form-item label="开始时间" prop="startDate">
        <el-date-picker
          v-model="form.startDate"
          type="datetime"
          placeholder="请选择开始时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>

      <el-form-item label="负责人" prop="name">
        <el-select v-model="form.name" placeholder="请选择负责人">
          <el-option label="张 三" value="张 三" />
          <el-option label="王小明" value="王小明" />
          <el-option label="大侠" value="大侠" />
          <el-option label="吴十一" value="吴十一" />
          <el-option label="王 五" value="王 五" />
          <el-option label="狂 人" value="狂 人" />
        </el-select>
      </el-form-item>

      <el-form-item label="任务描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="请输入任务描述"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel()">取消</el-button>
        <el-button type="primary" @click="onSubmit()" :loading="loading">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, nextTick, PropType } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { BasicData } from "@/api/list.ts";

const model = defineModel();
const props = defineProps({
  formData: Object as PropType<BasicData>,
  title: String,
  loading: Boolean,
});
const emit = defineEmits(["onSubmit"]);
const ruleFormRef = ref<FormInstance>();
let form = reactive<BasicData>({
  title: "",
  startDate: "",
  name: "",
  description: "",
});
const rules = reactive<FormRules>({
  title: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
  startDate: [
    {
      type: "date",
      required: true,
      message: "请选择开始时间",
      trigger: "change",
    },
  ],
  name: [{ required: true, message: "请选择负责人", trigger: "change" }],
});

watch(model, (value) => {
  if (!model.value) {
    resetForm();
    return;
  }
  resetForm();
  nextTick(() => {
    if (!props.formData) {
      return;
    }
    Object.keys(props.formData).forEach((key) => {
      form[key] = props.formData?.[key];
    });
  });
});

// =========================== 事件处理 =======================

// 重置表单
const resetForm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
};

const onCancel = () => {
  model.value = false;
};
const onSubmit = async () => {
  await ruleFormRef.value?.validate((valid, fields) => {
    if (valid) {
      emit("onSubmit", form);
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="scss"></style>
