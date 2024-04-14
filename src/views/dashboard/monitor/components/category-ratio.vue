<template>
  <el-card class="category-ratio content-card">
    <template #header>
      <span>各品类占比</span>
    </template>
    <el-progress type="dashboard" :percentage="80">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
      </template>
    </el-progress>
    <el-progress type="dashboard" :percentage="60">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
      </template>
    </el-progress>
    <el-progress type="dashboard" :percentage="45">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
      </template>
    </el-progress>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped lang="scss">
.category-ratio {
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  :deep(.el-card__body) {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
