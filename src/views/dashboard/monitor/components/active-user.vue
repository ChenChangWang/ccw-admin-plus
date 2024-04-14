<template>
  <el-card class="active-user content-card">
    <template #header>
      <span>活跃用户率</span>
    </template>
    <VChart :option="option" autoresize class="echarts" />
  </el-card>
</template>

<script lang="ts" setup>
import VChart from "vue-echarts";

const option = {
  series: [
    {
      type: "gauge",
      center: ["50%", "60%"],
      radius: "80%",
      startAngle: 210,
      endAngle: -30,
      min: 0,
      max: 100,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.2, "#f56c6c"],
            [0.4, "#e6a23c"],
            [0.6, "#5cb87a"],
            [0.8, "#1989fa"],
            [1, "#6f7ad3"],
          ],
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        length: 10,
        distance: -10,
        lineStyle: {
          color: "#b1b3b8",
          width: 1,
        },
      },
      axisLabel: {
        color: "#b1b3b8",
        fontSize: 12,
        distance: -25,
      },
      title: {
        offsetCenter: [0, "40%"],
        fontSize: 18,
        color: "#909399",
      },
      detail: {
        show: false,
      },
      data: [
        {
          value: 80,
          name: "优",
        },
      ],
    },
  ],
};
</script>

<style scoped lang="scss">
.active-user {
  display: flex;
  flex-direction: column;
  height: 100%;
  :deep(.el-card__body) {
    flex: 1;
  }
}
</style>
