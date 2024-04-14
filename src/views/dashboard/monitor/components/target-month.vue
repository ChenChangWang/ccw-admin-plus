<template>
  <el-card class="target-month content-card">
    <template #header>
      <span>本月目标</span>
    </template>
    <el-progress type="dashboard" :percentage="90" :width="130">
      <template #default="{ percentage }">
        <span class="percentage-icon">
          <Icon icon="material-symbols:target" />
        </span>
        <div class="percentage-value">290</div>
      </template>
    </el-progress>
    <div class="percentage-label">恭喜，本月目标已达标！</div>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
</script>

<style scoped lang="scss">
.target-month {
  display: flex;
  flex-direction: column;
  height: 100%;
  :deep(.el-card__body) {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .el-progress {
      .el-progress__text {
        .percentage-icon {
          color: var(--el-color-primary-light-3);
          font-size: 24px;
        }
        .percentage-value {
          font-size: 20px;
          font-weight: 600;
          margin-top: 10px;
        }
      }
    }
    .percentage-label {
      font-size: 13px;
    }
  }
}
</style>
