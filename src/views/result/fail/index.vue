<template>
  <el-card class="content-card result-fail">
    <el-result
      class="result"
      icon="error"
      title="提交失败"
      sub-title="请核对并修改以下信息后，再重新提交。"
    >
      <template #extra>
        <el-button type="primary">返回修改</el-button>
      </template>
    </el-result>
    <div class="desc">
      <div class="title">
        <span>您提交的内容有如下错误：</span>
      </div>
      <div class="item" v-for="(item, index) in list" :key="index">
        <span class="icon"><Icon icon="mdi:close-circle-outline" /></span>
        <span class="label">{{ item.label }}</span>
        <el-link class="link" type="primary" :underline="false">
          {{ item.linkText }} >
        </el-link>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

defineOptions({
  name: "Fail", //不命名组件，keep-alive的include不属性生效
});
const list = [
  { label: "您的账户已被冻结", linkText: "立即解冻" },
  { label: "您的账户还还不具备申请资格", linkText: "立即升级" },
];
</script>

<style scoped lang="scss">
.result-fail {
  .result {
  }
  .desc {
    padding: 24px 32px;
    background-color: var(--el-fill-color-light);
    text-align: left;
    border-radius: 4px;
    color: var(--el-text-color-regular);
    margin-bottom: 16px;
    .title {
      font-size: 15px;
      margin-bottom: 16px;
    }
    .item {
      display: flex;
      align-items: center;
      margin-top: 12px;
      .icon {
        vertical-align: middle;
        margin-right: 8px;
        color: var(--el-color-danger);
        font-size: 16px;
        display: inline-flex;
      }
      .label {
        margin-right: 8px;
      }
    }
  }
}
</style>
