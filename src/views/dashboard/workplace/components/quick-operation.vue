<template>
  <el-card class="quick-operation content-card" :span="8">
    <template #header>
      <span>快捷操作</span>
      <div class="card-header-extra">
        <el-button type="primary" link>设置</el-button>
      </div>
    </template>
    <el-row :gutter="10" class="quick-warp">
      <el-col
        v-for="item in quickList"
        :key="item.text"
        :span="8"
        class="item"
        @click="toPage(item.routeName, item.path)"
      >
        <div class="icon" :style="{ color: item.color }">
          <Icon :icon="item.icon" />
        </div>
        <div class="text">{{ item.text }}</div>
      </el-col>
    </el-row>
    <el-divider />
    <el-row el-row :gutter="10" class="custom-warp">
      <el-col
        v-for="item in customList"
        :key="item.text"
        class="item"
        :span="6"
      >
        <div class="text">{{ item.text }}</div>
      </el-col>
      <el-col :span="6" class="item">
        <el-button type="primary" size="small" plain>
          <Icon icon="mingcute:add-fill" style="margin-right: 5px" />添加
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();
const quickList = [
  {
    text: "主控台",
    icon: "uil:dashboard",
    routeName: "Console",
    color: "#6495ED",
  },
  {
    text: "监控页",
    icon: "ph:list-fill",
    routeName: "Monitor",
    color: "#32CD32",
  },
  {
    text: "工作台",
    icon: "uil:dashboard",
    routeName: "Workplace",
    color: "#FFFF00",
  },
  {
    text: "查询表格",
    icon: "ph:list-fill",
    routeName: "SearchTable",
    color: "#FFA500",
  },
  {
    text: "卡片列表",
    icon: "uil:dashboard",
    routeName: "CardList",
    color: "#FF6347",
  },
  {
    text: "基础列表",
    icon: "ph:list-fill",
    routeName: "BasicList",
    color: "#EC499D",
  },
];
const customList = [
  {
    text: "操作一",
    routeName: "Console",
  },
  {
    text: "操作二",
    routeName: "Console",
  },
  {
    text: "操作三",
    routeName: "Console",
  },
  {
    text: "操作四",
    routeName: "Console",
  },
  {
    text: "操作五",
    routeName: "Console",
  },
  {
    text: "操作六",
    routeName: "Console",
  },
];

const toPage = (name, path) => {
  if (name) {
    router.push({
      name: name,
    });
  } else if (path) {
    router.push({
      path: path,
    });
  }
};
</script>

<style scoped lang="scss">
.quick-operation {
  .item {
    text-align: center;
    cursor: pointer;
    .text {
      font-size: 13px;
      text-align: center;
      color: var(--el-text-color-regular);
    }
    &:hover {
      .text {
        color: var(--el-color-primary-light-3);
      }
    }
  }
  .quick-warp {
    .item {
      margin-bottom: 16px;

      .icon {
        display: inline-block;
        font-size: 24px;
        height: 24px;
        text-align: center;
        margin-bottom: 8px;
      }
    }
  }
  :deep(.el-divider) {
    margin: 8px 0;
  }
  .custom-warp {
    .item {
      margin-top: 16px;
    }
  }
}
</style>
