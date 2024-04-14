<template>
  <el-form
    ref="ruleFormRef"
    :model="userInfo"
    status-icon
    :rules="rules"
    @submit.prevent="handleSubmit"
    class="login-form"
    size="large"
  >
    <el-form-item prop="username">
      <el-input v-model="userInfo.username" placeholder="admin 或者 user">
        <template #prefix>
          <Icon icon="ph:user-bold" width="18" height="18" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="userInfo.password"
        type="password"
        placeholder="123456"
      >
        <template #prefix>
          <Icon icon="mdi:password-outline" width="18" height="18" />
        </template>
      </el-input>
    </el-form-item>

    <div class="login-form-auto">
      <el-checkbox
        v-model="userInfo.autoLogin"
        :label="$t('login.autoLogin')"
      />
      <el-link type="primary" :underline="false" style="float: right">
        {{ $t("login.forgotPassword") }}
      </el-link>
    </div>

    <el-form-item>
      <el-button
        type="primary"
        class="btn-long"
        native-type="submit"
        :loading="loading"
      >
        {{ $t("login.login") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { ElForm, ElMessage, FormInstance } from "element-plus";
import useLoading from "@/hooks/use-loading";
import { useTabsNavStore, useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { LoginParam } from "@/api/user";

const ruleFormRef = ref<FormInstance>();
const userInfo = reactive<LoginParam>({
  username: "admin",
  password: "123456",
  autoLogin: false,
});
const { t } = useI18n();
const rules = computed(() => {
  return {
    username: [
      { required: true, message: t("login.username"), trigger: "blur" },
    ],
    password: [
      { required: true, message: t("login.password"), trigger: "blur" },
    ],
  };
});

const [loading, setLoading] = useLoading(false);
const userStore = useUserStore();
const tabsNavStore = useTabsNavStore();
const router = useRouter();
const handleSubmit = () => {
  if (loading.value) {
    return;
  }
  ruleFormRef.value?.validate(async (valid) => {
    if (!valid) {
      return;
    }
    setLoading(true);
    try {
      await userStore.login(userInfo);
      tabsNavStore.clear();
      //跳转
      router.push({ path: "/" });
    } catch (error) {
      ElMessage({
        message: (error as Error).message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style scoped lang="scss">
.login-form {
  .el-form-item {
    margin-bottom: 24px;
  }
  .login-form-auto {
    width: 100%;
    position: relative;
    margin-bottom: 24px;
    :deep(.el-checkbox) {
      height: auto;
    }
  }
}
</style>
