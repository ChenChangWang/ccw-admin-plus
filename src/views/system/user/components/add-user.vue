<template>
  <el-drawer
    class="add-user-drawe"
    :size="550"
    ref="drawerRef"
    v-model="dialog"
    title="添加用户"
  >
    <el-form
      :model="form"
      :rules="rules"
      class="add-user-form"
      ref="ruleFormRef"
      label-position="top"
      label-width="140px"
    >
      <el-row :gutter="18">
        <el-col :span="12">
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="登录账号：" prop="loginUser">
            <el-input v-model="form.loginUser" placeholder="请输入登录账号" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="性别：">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" value="man" />
              <el-option label="女" value="girl" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色分配：">
            <RoleSelector v-model="form.role" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="状态：">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider style="margin: 12px 0 24px 0" />

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="所在区域：" prop="area">
            <el-cascader
              :options="pcTextArr"
              v-model="form.area"
              placeholder="请选择"
            >
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生日：" prop="area">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="请选择"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="个人介绍：">
        <el-input v-model="form.introduction" type="textarea" />
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
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { pcTextArr } from "element-china-area-data";
import RoleSelector from "./role-selector.vue";
import statusOptions from "../statusOptions";

const ruleFormRef = ref();
const model = defineModel();
const dialog = computed({
  get: () => model.value,
  set: (val) => {
    model.value = val;
  },
});
const form = reactive({
  name: "",
  phone: "",
  email: "",
  loginUser: "",
  sex: "man",
  role: [],
  status: "normal",
  area: [],
  birthday: "",
  introduction: "",
});
const rules = reactive({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  loginUser: [{ required: true, message: "请输入登录账号", trigger: "blur" }],
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
</script>

<style lang="scss">
.add-user-drawe {
  .add-user-form {
    padding: 6px 0 0 0;
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
