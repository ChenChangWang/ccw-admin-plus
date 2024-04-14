<template>
  <el-drawer
    class="edit-user-drawe"
    :size="550"
    ref="drawerRef"
    v-model="dialog"
    title="添加用户"
  >
    <el-form
      :model="form"
      :rules="rules"
      class="edit-user-form"
      ref="ruleFormRef"
      label-position="top"
      label-width="140px"
    >
      <!--  基本信息展示    -->
      <el-row :gutter="18">
        <el-col :span="10" class="upload-warp">
          <el-avatar
            shape="square"
            :size="60"
            :src="current.avatar"
            class="avatar"
          />
          <el-upload
            class="avatar-uploader"
            :http-request="uploadAction"
            :show-file-list="false"
            :before-upload="beforeUpload"
            accept="image/jpeg,image/jpg, image/png"
            :on-success="success"
            :on-error="error"
            :on-progress="progress"
          >
            <el-button class="upload-btn" link>
              修改
              <Icon icon="bxs:edit" style="margin-left: 5px" />
            </el-button>
          </el-upload>
        </el-col>

        <el-col :span="14" class="base-warp">
          <div>用户 ID：{{ current.userId }}</div>
          <div>登录账号：{{ current.loginUser }}</div>
          <div>创建时间：{{ current.createDate }}</div>
        </el-col>
      </el-row>

      <el-divider style="margin: 24px 0 24px 0" />

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
import { ref, reactive, computed, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { pcTextArr } from "element-china-area-data";
import RoleSelector from "@/views/system/user/components/role-selector.vue";
import statusOptions from "../statusOptions";
import { Icon } from "@iconify/vue";
import { accountUpload } from "@/api/account";

const ruleFormRef = ref();
const model = defineModel();
const dialog = computed({
  get: () => model.value,
  set: (val) => {
    model.value = val;
  },
});
const props = defineProps({ current: Object });

const form = reactive({
  avatar: "",
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

watch([() => props.current, () => dialog.value], () => {
  if (!dialog.value) {
    return;
  }
  resetForm();
  for (let key in form) {
    form[key] = props.current[key];
  }
});

// =========================== 头像上传 =======================

const uploadAction = async (option) => {
  let param = new FormData();
  param.append("file", option.file);
  const onUploadProgress = (evt) => {
    const progressEvt = evt;
    progressEvt.percent = evt.total > 0 ? (evt.loaded / evt.total) * 100 : 0;
    option.onProgress(progressEvt);
  };
  try {
    const res = await accountUpload(param, {
      onUploadProgress,
    });
    option.onSuccess(res);
  } catch (error) {
    option.onError(error);
  }
};
const success = (response, uploadFile, uploadFiles) => {
  form.avatar = response.data.url;
  ElMessage.success("上传成功！");
};
const error = (error, uploadFile, uploadFiles) => {
  console.log("error", error, uploadFile, uploadFiles);
};
const progress = (evt, uploadFile, uploadFiles) => {
  console.log("progress", evt, uploadFile, uploadFiles);
};
const beforeUpload = (file) => {
  const type = ["image/jpeg", "image/jpg", "image/png"];
  if (type.indexOf(file.type) === -1) {
    ElMessage.error("上传文件必须为jpeg、jpg、png类型！");
    return false;
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不能超过2MB!");
    return false;
  }
  return true;
};

// =========================== 表单操作 =======================

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
.edit-user-drawe {
  .edit-user-form {
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
    .upload-warp {
      text-align: center;
      .avatar {
        margin-bottom: 10px;
      }
    }
    .base-warp {
      > * {
        margin-bottom: 12px;
        color: var(--el-text-color-regular);
        &:last-child {
          margin: 0;
        }
      }
    }
  }
}
</style>
