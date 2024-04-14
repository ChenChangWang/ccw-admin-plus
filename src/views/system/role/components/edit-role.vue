<template>
  <el-drawer
    class="edit-role-drawer"
    :size="340"
    ref="drawerRef"
    v-model="dialog"
    title="添加角色"
  >
    <el-form
      :model="form"
      :rules="rules"
      class="add-role-form"
      ref="ruleFormRef"
      label-position="top"
      label-width="140px"
    >
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名称" />
      </el-form-item>

      <el-form-item label="说明:" prop="explain">
        <el-input v-model="form.explain" placeholder="请输入说明" />
      </el-form-item>

      <el-form-item label="是否默认角色:">
        <el-switch
          v-model="form.isDefault"
          inline-prompt
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        提交
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";

const props = defineProps({ current: Object });
const ruleFormRef = ref();
const model = defineModel();
const dialog = computed({
  get: () => model.value,
  set: (val) => {
    model.value = val;
  },
});
let form = reactive({
  name: "",
  explain: "",
  isDefault: false,
});

const rules = reactive({
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
});

watch([() => props.current, () => dialog.value], () => {
  if (!dialog.value) {
    return;
  }
  resetForm();
  for (let key in form) {
    form[key] = props.current[key];
  }
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage({
        type: "error",
        message: "抱歉，您没有该权限",
      });
    }
  });
};

const resetForm = () => {
  ruleFormRef.value?.resetFields();
};
</script>

<style lang="scss">
.edit-role-drawer {
  .add-role-form {
    padding: 6px 0 0 0;
    .el-form-item {
      margin-bottom: 24px;
    }
  }
}
</style>
