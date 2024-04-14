<template>
  <el-card class="feedback-data content-card">
    <template #header>
      <span>反馈数据</span>
    </template>
    <div class="score-box">
      <div class="score">{{ score }}</div>
      <div class="detail">
        <span class="label">平均评分</span>
        <el-rate v-model="score" disabled show-score text-color="#ff9900" />
      </div>
    </div>
    <el-divider></el-divider>
    <div class="satisfaction">
      <div class="satisfaction-title">客户满意度</div>
      <el-progress :percentage="89" />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const score = ref(4.5);
</script>

<style scoped lang="scss">
.feedback-data {
  display: flex;
  flex-direction: column;
  height: 100%;
  :deep(.el-card__body) {
    flex: 1;
  }
  .score-box {
    display: flex;
    align-items: center;
    .score {
      font-size: 32px;
      color: #ff7f01;
      margin-right: 10px;
    }
    .detail {
      display: flex;
      flex-direction: column;
      .label {
        color: var(--el-text-color-secondary);
        font-size: 12px;
      }
    }
  }
  .satisfaction {
    .satisfaction-title {
      color: var(--el-text-color-secondary);
      margin-bottom: 12px;
    }
  }
}
</style>
