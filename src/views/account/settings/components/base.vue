<template>
  <div class="settings-base">
    <el-form
      ref="infoFormRef"
      :model="userForm"
      :rules="rules"
      label-width="120px"
      label-position="top"
      class="base-form"
    >
      <el-form-item label="昵称" prop="name">
        <el-input v-model="userForm.name" placeholder="请输入昵称" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="所在区域" prop="area">
        <el-cascader
          :options="pcTextArr"
          v-model="userForm.area"
          placeholder="请选择"
        >
        </el-cascader>
      </el-form-item>

      <el-form-item label="具体地址" prop="address">
        <el-input v-model="userForm.address" placeholder="请输入您的地址" />
      </el-form-item>

      <el-form-item label="个人简介" prop="profile">
        <el-input
          v-model="userForm.profile"
          type="textarea"
          placeholder="请输入您的个人简介"
        />
      </el-form-item>

      <el-form-item class="btn-group">
        <el-button type="primary" @click="submitForm(infoFormRef)">
          更新基本信息
        </el-button>
        <el-button @click="resetForm(infoFormRef)">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="upload-warp">
      <el-avatar :size="100" :src="imageUrl" class="info-avatar" />
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
        <el-button class="upload-btn">
          <Icon icon="ant-design:upload-outlined" style="margin-right: 5px" />
          更换头像
        </el-button>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import {
  ElMessage,
  type FormInstance,
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
  UploadRawFile,
  UploadRequestOptions,
} from "element-plus";
import { accountUpload } from "@/api/account";
import { pcTextArr } from "element-china-area-data";
import { Icon } from "@iconify/vue";
import type { UploadAjaxError } from "element-plus/es/components/upload/src/ajax";

const { userInfo } = defineProps({
  userInfo: { type: Object, default: () => {} },
});
const imageUrl = ref(userInfo.avatar);
const infoFormRef = ref<FormInstance>();
const userForm = reactive({
  name: userInfo.name,
  email: userInfo.email,
  area: userInfo.area,
  address: userInfo.address,
  profile: userInfo.profile,
});
const rules = reactive({
  name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  area: [
    {
      required: true,
      message: "请选择所在区域",
      trigger: "change",
    },
  ],
});

// =========================== 头像上传 =======================
const uploadAction = async (option: UploadRequestOptions) => {
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
    option.onError(error as UploadAjaxError);
  }
};

const success = (
  response: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles,
) => {
  console.log("success", response, uploadFile, uploadFiles);

  imageUrl.value = response.data.url;
  ElMessage.success("上传成功！");
};

const error = (
  error: Error,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles,
) => {
  console.log("error", error, uploadFile, uploadFiles);
};

const progress = (
  evt: UploadProgressEvent,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles,
) => {
  console.log("progress", evt, uploadFile, uploadFiles);
};

const beforeUpload = (file: UploadRawFile) => {
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

// =========================== 表单 =======================

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/var" as var;
.settings-base {
  display: flex;
  .base-form {
    width: 60%;
    :deep(.el-form-item) {
      margin-bottom: 22px;
      .el-form-item__content {
        .el-input,
        .el-cascader {
          width: 100%;
        }
      }
    }
    .btn-group {
      :deep(.el-form-item__content) {
        justify-content: center;
      }
    }
  }
  .upload-warp {
    padding-left: 24px;
    width: 40%;
    margin-bottom: 24px;
    text-align: center;
    .upload-btn {
      margin-top: 10px;
    }
  }
  @media screen and (max-width: var.$lg) {
    flex-direction: column-reverse;
    .base-form {
      width: 100%;
    }
    .upload-warp {
      padding-left: 0;
      width: 100%;
    }
  }
}
</style>
