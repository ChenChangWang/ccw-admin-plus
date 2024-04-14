<template>
  <div class="workplace">
    <div class="page-header">
      <span class="page-header-title"> 工作台 </span>
      <div class="page-header-container">
        <div class="page-header-content">
          <el-avatar class="avatar" :src="getAssetsImage('people6.webp')" />
          <div class="header-tip">
            <div class="header-tip-title">
              早安、吴彦祖，开始您的一天工作吧！
            </div>
            <div class="header-tip-desc">某某岗位 | 某某公司 - 某某部门</div>
          </div>
        </div>
        <div class="page-header-extra">
          <div v-for="item in headerExtraList" class="statistic-item">
            <div class="statistic-title">{{ item.title }}</div>
            <div class="statistic-content">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <el-row :gutter="16" style="margin-top: 14px">
      <el-col :xl="16" :lg="24">
        <ProjectIn />
        <Activities style="margin-top: 14px" />
      </el-col>
      <el-col :xl="8" :lg="24">
        <QuickOperation />
        <Proclamation style="margin-top: 14px" />
        <GroupUsers style="margin-top: 14px" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProjectIn from "./components/project-in.vue";
import Activities from "./components/activities.vue";
import QuickOperation from "./components/quick-operation.vue";
import Proclamation from "./components/proclamation.vue";
import GroupUsers from "./components/group-users.vue";
import { getAssetsImage } from "@/utils/util";

defineOptions({
  name: "Workplace", //不命名组件，keep-alive的include不属性生效
});
const headerExtraList = [
  { title: "项目数", content: "12" },
  { title: "待办项", content: "4 / 18" },
  { title: "项目访问", content: "263" },
];
</script>

<style scoped lang="scss">
@use "@/assets/styles/var" as var;
.workplace {
  .page-header-container {
    display: flex;
    width: 100%;
    .page-header-content {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      .avatar {
        flex: 0 0 70px;
        height: 70px;
      }
      .header-tip {
        flex: 1 1 auto;
        margin-left: 20px;
        .header-tip-title {
          color: var(--el-text-color-primary);
          margin-bottom: 10px;
          font-size: 20px;
          line-height: 28px;
        }
        .header-tip-desc {
          color: var(--el-text-color-regular);
        }
      }
    }
    .page-header-extra {
      flex: 0 0 auto;
      min-width: 240px;
      text-align: end;
      display: flex;
      align-items: center;
      .statistic-item {
        display: inline-block;
        padding: 0 30px;
        position: relative;
        &:not(:last-of-type) {
          &:after {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            width: 1px;
            height: 40px;
            background-color: var(--el-border-color);
            content: "";
          }
        }
        text-align: center;
        .statistic-title {
          color: var(--el-text-color-secondary);
        }
        .statistic-content {
          font-size: 18px;
          margin-top: 10px;
          color: var(--el-text-color-primary);
        }
      }
    }
  }
}
@media (max-width: var.$md) {
  .workplace {
    .page-header-container {
      display: block;
      .page-header-extra {
        margin-top: 10px;
        margin-left: 65px;
        .statistic-item {
          padding: 0 25px;
        }
      }
    }
  }
}
</style>
