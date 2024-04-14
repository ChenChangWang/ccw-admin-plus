<template>
  <el-card class="project-in content-card">
    <template #header>
      <span>进行中项目</span>
      <div class="card-header-extra">
        <el-button type="primary" link>全部项目</el-button>
      </div>
    </template>
    <Grid :cols="3" :rowGap="10" :colGap="10">
      <GridItem v-for="item in dataList">
        <div class="item">
          <div class="item-title">
            <el-avatar :size="24" :src="item.url" />
            <el-link :underline="false">{{ item.title }} </el-link>
          </div>

          <div class="item-description">
            <el-text line-clamp="2">
              {{ item.content }}
            </el-text>
          </div>

          <div class="item-footer">
            <span class="item-footer-member">{{ item.member }}</span>
            <span class="item-footer-time">{{ item.time }}</span>
          </div>
        </div>
      </GridItem>
    </Grid>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { Grid, GridItem } from "@/components/grid";
import { getAssetsImage } from "@/utils/util";
const dataList = [
  {
    title: "Vue",
    content: "易学易用，性能出色，适用场景丰富的 Web 前端框架。",
    url: getAssetsImage("vue.png"),
    member: "开源大侠",
    time: "2024-01-4",
  },
  {
    title: "React",
    content: "React 使创建交互式 UI 变得轻而易举。",
    url: getAssetsImage("react.png"),
    member: "代码狂人",
    time: "2024-01-5",
  },
  {
    title: "Bootstrap ",
    content: "简洁、直观、强悍的前端开发框架。",
    url: getAssetsImage("bootstrap.png"),
    member: "技术小王子",
    time: "2024-01-3",
  },
  {
    title: "Angular ",
    content:
      "Angular是一个应用设计框架与开发平台，用于创建高效、复杂、精致的单页面应用。",
    url: getAssetsImage("angular.png"),
    member: "程序猿大魔王",
    time: "2024-01-3",
  },
  {
    title: "Webpack ",
    content: "webpack 是代码编译工具，有入口、出口、loader 和插件。",
    url: getAssetsImage("webpack.png"),
    member: "Bug杀手",
    time: "2024-01-5",
  },
  {
    title: "Vite ",
    content: "vite是下一代前端开发与构建工具。",
    url: getAssetsImage("vite.png"),
    member: "二进制大师",
    time: "2024-01-11",
  },
];
</script>

<style scoped lang="scss">
.project-in {
  .item {
    padding: 14px;
    border: 1px solid var(--el-border-color-lighter);
    transition: all 0.3s;
    &:hover {
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.12);
    }
    .item-title {
      display: flex;
      align-items: center;
      :deep(.el-link) {
        margin-left: 14px;
        /*color: var(--el-text-color-primary);*/
        font-weight: 600;
        font-family: "Noto Sans";
      }
    }
    .item-description {
      margin-top: 10px;
      line-height: 22px;
      height: 44px;
    }
    .item-footer {
      margin-top: 10px;
      color: var(--el-text-color-secondary);
      display: flex;
      align-items: center;
      text-overflow: ellipsis;
      word-break: break-all;
      font-size: 13px;
      gap: 8px;
      .item-footer-member {
        flex: 0 0 auto;
      }
      .item-footer-time {
        flex: 1 1 auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
      }
    }
  }
}
</style>
