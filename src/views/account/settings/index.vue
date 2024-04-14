<template>
  <el-row :gutter="16" class="account-settings">
    <el-col :md="8" :lg="8" :xl="6" class="settings-left-menu hidden-xs-only">
      <el-card class="content-card left-menu-card">
        <template #header>
          <span>个人设置</span>
        </template>
        <div class="left-menu">
          <div
            :class="[
              'left-menu-item',
              { selected: menuSelected === item.name },
            ]"
            v-for="item in menuList"
            :key="item.name"
            @click="menuSelected = item.name"
          >
            {{ item.label }}
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :sm="24" :md="16" :lg="16" :xl="18">
      <el-card class="content-card settings-content-card">
        <!--    hidden-sm-and-up    -->
        <el-tabs
          v-model="menuSelected"
          class="hidden-sm-and-up settings-top-menu"
        >
          <el-tab-pane
            v-for="item in menuList"
            :key="item.name"
            :label="item.label"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <div class="settings">
          <div class="settings-title">{{ labelSelected }}</div>
          <Base v-show="menuSelected === 'base'" :userInfo="userStore" />
          <Security v-show="menuSelected === 'security'" />
          <Binding v-show="menuSelected === 'binding'" />
          <Notification v-show="menuSelected === 'notification'" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import Base from "./components/base.vue";
import Security from "./components/security.vue";
import Binding from "./components/binding.vue";
import Notification from "./components/notification.vue";
import { useUserStore } from "@/store";

defineOptions({
  name: "Settings", //不命名组件，keep-alive的include不属性生效
});

const menuList: { label: string; name: string }[] = [
  { label: "基本设置", name: "base" },
  { label: "安全设置", name: "security" },
  { label: "账号绑定", name: "binding" },
  { label: "新消息通知", name: "notification" },
];
const menuSelected = ref<string>("base");
const userStore = useUserStore();

const labelSelected = computed(() => {
  return menuList.find((item) => menuSelected.value === item.name)?.label;
});
</script>

<style scoped lang="scss">
.account-settings {
  .left-menu-card {
    .el-card__header {
      font-size: 16px;
      color: var(--el-text-color-primary);
    }
    :deep(.el-card__body) {
      padding: 0;
    }
    .left-menu {
      padding: 12px 0;
      .left-menu-item {
        padding: 0 24px 0 16px;
        margin: 4px;
        white-space: nowrap;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        border-radius: 6px;
        &:hover {
          background-color: var(--el-color-info-light-9);
        }
        &.selected {
          color: var(--el-color-primary);
          background-color: var(--el-color-primary-light-9);
        }
      }
    }
  }

  .settings-content-card {
    :deep(.el-card__body) {
      padding-top: 3px;
    }
    .settings-top-menu {
      :deep(.el-tabs__header) {
        margin-bottom: 3px;
      }
    }
    .settings {
      .settings-title {
        font-size: 20px;
        margin: 12px 0 16px 0;
      }
    }
  }
}
</style>
