<template>
  <el-result class="error-result">
    <!--    <template #icon> </template>-->
    <template #title>
      <span class="digit" v-for="(char, index) in code" :key="index">
        {{ char }}
      </span>
    </template>
    <template #sub-title>
      {{ desc }}
    </template>
    <template #extra>
      <el-button type="primary" link @click="backHome()">返回首页</el-button>
      <el-button type="primary" link @click="backGo()"> 返回上一页 </el-button>
    </template>
  </el-result>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  code: String,
  desc: String,
});
const router = useRouter();

const backGo = () => {
  router.go(-1);
};
const backHome = () => {
  router.push({ path: "/" });
};
</script>
<style scoped lang="scss">
@use "@/assets/styles/var" as var;

.error-result {
  min-height: 460px;
  :deep(.el-result__icon) {
    display: none;
  }
  :deep(.el-result__title) {
    .digit {
      display: inline-block;
      width: 150px;
      height: 150px;
      line-height: 150px;
      font-size: 120px;
      font-weight: bold;
      color: var(--el-color-white);
      background: var(--el-color-primary);
      border-radius: 50%;
      margin-right: 20px;
      &:last-of-type {
        margin: 0;
      }
    }
  }
  :deep(.el-result__subtitle) {
    font-size: 20px;
    color: var(--el-text-color-secondary);
    font-weight: bold;
    margin-top: 34px;
  }
  :deep(.el-result__extra) {
    .el-button--text {
      font-size: 16px;
    }
  }

  @media (max-width: var.$md) {
    :deep(.el-result__title) {
      .digit {
        width: 80px;
        height: 80px;
        line-height: 80px;
        font-size: 52px;
      }
    }
    :deep(.el-result__subtitle) {
      font-size: 18px;
    }
    :deep(.el-result__extra) {
      .el-button--text {
        font-size: 14px;
      }
    }
  }
}
</style>
