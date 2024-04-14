<template>
  <el-dropdown
    @command="command"
    popper-class="no-arrow-popper"
    :popper-options="{
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 3],
          },
        },
      ],
    }"
  >
    <span class="action-user" v-loading="loading">
      <el-avatar :src="userStore.avatar" :size="24" />
      <span class="action-user-name">{{ userStore.name }}</span>
    </span>

    <template #dropdown>
      <el-dropdown-menu class="user-dropdown">
        <el-dropdown-item command="user">
          <span class="icon"><Icon icon="ph:user-bold" /></span>
          {{ $t("layout.header.userCenter") }}
        </el-dropdown-item>
        <el-dropdown-item command="set">
          <span class="icon"> <Icon icon="ant-design:setting-outlined" /></span>
          {{ $t("layout.header.userSettings") }}
        </el-dropdown-item>
        <el-dropdown-item divided command="logout">
          <span class="icon"><Icon icon="bitcoin-icons:exit-filled" /></span>
          {{ $t("layout.header.logout") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import useLoading from "@/hooks/use-loading";
import { Icon } from "@iconify/vue";

const userStore = useUserStore();
const router = useRouter();
const [loading, setLoading] = useLoading(false);

const command = (val: "user" | "set" | "logout") => {
  if (loading.value) {
    return;
  }
  switch (val) {
    case "user":
      router.push({ name: "Center" });
      break;
    case "set":
      router.push({ name: "Settings" });
      break;
    case "logout":
      handleLogout();
      break;
  }
};

const handleLogout = async () => {
  setLoading(true);
  await userStore.logout();
  ElMessage.success("登出成功");
  router.push({ name: "login" });
};
</script>

<style scoped lang="scss">
.action-user {
  :deep(.el-loading-mask) {
    background-color: var(--el-bg-color);
    .el-loading-spinner {
      transform: translateY(-50%);
      margin-top: 0;
      .circular {
        width: 24px;
        height: 24px;
      }
    }
  }
}

.el-dropdown-menu {
  :deep(.el-dropdown-menu__item) {
    .icon {
      margin-right: 5px;
    }
  }
}
</style>
