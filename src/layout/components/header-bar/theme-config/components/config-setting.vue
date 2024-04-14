<template>
  <div class="config-setting">
    <el-divider> {{ $t("layout.setting.navigationMode") }} </el-divider>
    <div class="img-box">
      <el-tooltip
        v-for="item in navModeList"
        :key="item.value"
        :content="item.title"
        placement="top"
      >
        <div
          class="setting-item-img"
          :class="item.class"
          @click="navModeChange(item.value)"
        >
          <div
            class="setting-item-img-selectIcon"
            :class="{ active: item.value === layoutStore.menuLayoutMode }"
          >
            <Icon icon="ep:check" />
          </div>
        </div>
      </el-tooltip>
    </div>

    <el-divider> {{ $t("layout.setting.navigationStyle") }} </el-divider>
    <List :split="false">
      <ListItem v-for="item in navList" :key="item.key">
        <ListItemMeta :title="item.title" />
        <template #action>
          <el-switch
            inline-prompt
            v-model="layoutStore[item.key]"
            inactive-value="light"
            active-value="dark"
            :inactive-text="$t('layout.setting.light')"
            :active-text="$t('layout.setting.dark')"
            style="--el-switch-on-color: #141414"
          >
          </el-switch>
        </template>
      </ListItem>
    </List>

    <el-divider> {{ $t("layout.setting.interfaceSettings") }} </el-divider>
    <List :split="false">
      <ListItem :class="{ disabled: contentWidthModeDisabled }">
        <ListItemMeta :title="$t('layout.setting.contentAreaWidth')" />
        <template #action>
          <el-select
            v-model="layoutStore.contentWidthMode"
            size="small"
            style="width: 72px"
            :disabled="contentWidthModeDisabled"
          >
            <el-option
              v-for="item in contentWidthModeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </ListItem>

      <ListItem v-for="item in interfaceList" :key="item.key">
        <ListItemMeta :title="item.title"> </ListItemMeta>
        <template #extra>
          <el-switch v-model="layoutStore[item.key]"
        /></template>
      </ListItem>

      <!-- 色弱模式 -->
      <ListItem>
        <ListItemMeta :title="$t('layout.setting.weakMode')" />
        <template #extra>
          <el-switch v-model="layoutStore.weakMode" @change="weakModeChange" />
        </template>
      </ListItem>
    </List>

    <el-divider> {{ $t("layout.setting.themeColor") }} </el-divider>
    <ThemeColor />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useLayoutStore } from "@/store";
import { Icon } from "@iconify/vue";
import { List, ListItem, ListItemMeta } from "@/components/list";
import ThemeColor from "./theme-color.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const navModeList = computed(() => {
  return [
    {
      title: t("layout.setting.menuLayout.side"),
      class: "checkbox-item-side",
      value: "side",
    },
    {
      title: t("layout.setting.menuLayout.top"),
      class: "checkbox-item-top",
      value: "top",
    },
    {
      title: t("layout.setting.menuLayout.mix"),
      class: "checkbox-item-mix",
      value: "mix",
    },
  ];
});
const navList = computed(() => {
  return [
    { key: "headerEffect", title: t("layout.setting.topStyle") },
    { key: "asideEffect", title: t("layout.setting.sideStyle") },
  ];
});

const contentWidthModeList = computed(() => {
  return [
    { label: t("layout.setting.contentWidth.fixed"), value: "fixed" },
    { label: t("layout.setting.contentWidth.fluid"), value: "fluid" },
  ];
});

const interfaceList = computed(() => {
  return [
    { key: "isToppingHeader", title: t("layout.setting.toppingHeader") },
    { key: "isAutoHideHeader", title: t("layout.setting.autoHideHeader") },
    { key: "menuUniqueOpened", title: t("layout.setting.menuUniqueOpened") },
    {
      key: "isRouteBreadcrumb",
      title: t("layout.setting.showRouteBreadcrumb"),
    },
    { key: "isReload", title: t("layout.setting.showReload") },
    { key: "isTabs", title: t("layout.setting.openTabs") },
    { key: "isFooter", title: t("layout.setting.footer") },
  ];
});

const layoutStore = useLayoutStore();

//内容区域宽度是否禁用
const contentWidthModeDisabled = computed(() => {
  return !layoutStore.menuLayoutModeTop;
});

const navModeChange = (mode) => {
  layoutStore.updatePatch({ menuLayoutMode: mode });
};

const weakModeChange = (val) => {
  if (val) {
    document.body.classList.add("weak-mode");
    document.getElementById("app").classList.add("container-overflow");
  } else {
    document.body.classList.remove("weak-mode");
    document.getElementById("app").classList.remove("container-overflow");
  }
};
</script>

<style scoped lang="scss">
.config-setting {
  :deep(.el-divider) {
    white-space: nowrap;
    margin: 18px 0;
  }

  .img-box {
    display: flex;
    align-items: center;
    padding: 12px 0;
    .setting-item-img {
      position: relative;
      cursor: pointer;
      margin-right: 14px;
      width: 54px;
      height: 46px;
      border-radius: 4px;
      overflow: hidden;
      background-color: var(--el-bg-color-page);
      &:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 33%;
        height: 100%;
        background-color: #fff;
        content: "";
      }
      &:after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: #fff;
        content: "";
      }
      &.checkbox-item-side {
        &:before {
          background-color: var(--el-color-black);
          z-index: 2;
        }
        &:after {
          background-color: var(--el-bg-color);
        }
      }
      &.checkbox-item-top {
        &:before {
          display: none;
        }
        &:after {
          background-color: var(--el-color-black);
        }
      }
      &.checkbox-item-mix {
        &:before {
          background-color: var(--el-color-black);
        }
        &:after {
          background-color: var(--el-color-black);
        }
      }

      img {
        width: 54px;
      }
      .setting-item-img-selectIcon {
        position: absolute;
        bottom: 8px;
        right: 8px;
        color: var(--el-color-primary);
        font-size: 20px;
        display: none;
        &.active {
          display: block;
        }
      }
    }
  }

  :deep(.list) {
    .list-item {
      padding: 6px 0;
      .list-item-meta {
        .list-item-meta-title {
          color: var(--el-text-color-regular);
        }
      }
      &.disabled {
        .list-item-meta {
          .list-item-meta-title {
            color: var(--el-text-color-disabled);
          }
        }
      }
    }
  }
}
</style>
