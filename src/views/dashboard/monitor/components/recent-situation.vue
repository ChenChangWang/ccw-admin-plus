<template>
  <el-card class="recent-situation content-card">
    <template #header>
      <span>最近一小时情况</span>
    </template>

    <VChart :loading="loading" :option="option" autoresize />
  </el-card>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import useLoading from "@/hooks/use-loading";
import VChart from "vue-echarts";
import { getRecentSituationData } from "@/api/monitor";

const [loading, setLoading] = useLoading(false);
const optionData = ref([[], [], []]);

const option = computed(() => {
  return {
    xAxis: {
      type: "category",
      data: optionData.value[0],
      boundaryGap: false,
      axisLine: {
        show: false, //是否显示坐标轴轴线。
      },
      axisTick: {
        show: false, //是否显示坐标轴刻度。
      },
    },
    yAxis: {
      type: "value",
    },
    legend: {
      data: ["访问量", "订单量"],
      right: 40,
    },
    tooltip: {
      trigger: "axis",
    },
    series: [
      {
        name: "访问量",
        data: optionData.value[1],
        type: "line",
        smooth: true, //平滑处理
        symbolSize: 2, //标记的大小，
        lineStyle: {
          width: 1,
          color: "#409eff",
        },
        emphasis: {
          disabled: true, //关闭高亮状态可以在鼠标移到图形上，tooltip 触发，
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: "#ecf5ff",
        },
      },
      {
        name: "订单量",
        data: optionData.value[2],
        type: "line",
        smooth: true, //平滑处理
        symbolSize: 2, //标记的大小，
        lineStyle: {
          width: 1,
          color: "#ffa500",
        },
        emphasis: {
          disabled: true, //关闭高亮状态可以在鼠标移到图形上，tooltip 触发，
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: "#ffdead",
        },
      },
    ],
    grid: {
      left: "50px",
      right: "40px",
      top: "40px",
      bottom: "40px",
    },
  };
});
const fetchUseSearchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getRecentSituationData();
    data.data.forEach(({ x, visitY, orderY }) => {
      optionData.value[0].push(x);
      optionData.value[1].push(visitY);
      optionData.value[2].push(orderY);
    });
  } catch (err) {
  } finally {
    setLoading(false);
  }
};
fetchUseSearchDataList();
</script>

<style scoped lang="scss">
.recent-situation {
  height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.el-card__header) {
  }
  :deep(.el-card__body) {
    flex: 1;
  }
}
</style>
