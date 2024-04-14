<template>
  <div class="page-header search-header">
    <span class="page-header-title"> {{ title }} </span>
    <div class="page-header-container">
      <div class="input-warp">
        <el-input v-model="input" placeholder="请输入" size="large">
          <template #append>
            <el-button type="primary">搜索</el-button>
          </template>
        </el-input>
      </div>

      <el-tabs
        v-model="props.name"
        @tab-click="tabClick"
        :before-leave="beforeLeave"
      >
        <el-tab-pane
          :label="item.label"
          :name="item.key"
          v-for="item in tabList"
          :key="item.key"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const tabList = [
  { key: "Articles", label: "文章" },
  { key: "Projects", label: "项目" },
  { key: "Applications", label: "应用" },
];

const props = defineProps({ title: String, name: String });
const input = ref("");
const router = useRouter();

const tabClick = (tab) => {
  router.push({
    name: tab.props.name,
  });
};
const beforeLeave = (activeName, oldActiveName) => {
  return false;
};
</script>

<style scoped lang="scss">
.search-header {
  padding-bottom: 0;
  .input-warp {
    max-width: 500px;
    margin: 0px auto 22px auto;
    :deep(.el-input) {
      .el-input-group__append {
        button.el-button {
          height: 100%;
          border-left: 0;
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
          padding: 8px 18px;
          border-color: var(--el-button-border-color);
          background-color: var(--el-button-bg-color);
          color: var(--el-button-text-color);
          &:hover,
          &:focus {
            color: var(--el-button-hover-text-color);
            border-color: var(--el-button-hover-border-color);
            background-color: var(--el-button-hover-bg-color);
            outline: none;
          }
          &:active {
            color: var(--el-button-active-text-color);
            border-color: var(--el-button-active-border-color);
            background-color: var(--el-button-active-bg-color);
            outline: none;
          }
        }
      }
    }
  }
  :deep(.el-tabs) {
    .el-tabs__header {
      margin-bottom: 0;
      .el-tabs__nav-wrap {
        &:after {
          display: none;
        }
      }
      .el-tabs__active-bar {
        transition: none;
      }
      .el-tabs__item {
        font-size: 15px;
      }
    }
    .el-tabs__content {
      display: none;
    }
  }
}
</style>
