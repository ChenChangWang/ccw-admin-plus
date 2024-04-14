<template>
  <el-row :gutter="16" class="introduce">
    <el-col v-bind="attarSpan">
      <IntroduceItem
        title="总销售额"
        :count="toYuan(123454)"
        footerLabel="日销售额"
        :footerValue="toYuan(6583)"
      >
        <Trend style="margin-right: 16px" class="assimilate" flag="up">
          周同比<span class="ratio">14%</span>
        </Trend>
        <Trend class="assimilate" flag="down">
          日同比<span class="ratio">10%</span>
        </Trend>
      </IntroduceItem>
    </el-col>
    <el-col v-bind="attarSpan">
      <IntroduceItem
        title="访问量"
        count="8888"
        footerLabel="日访问量"
        footerValue="1,234"
      >
        <VChart :loading="loading" :option="visitOption" autoresize />
      </IntroduceItem>
    </el-col>
    <el-col v-bind="attarSpan">
      <IntroduceItem
        title="订单量"
        count="300"
        footerLabel="转化率"
        footerValue="60%"
      >
        <VChart :loading="loading" :option="orderOption" autoresize />
      </IntroduceItem>
    </el-col>
    <el-col v-bind="attarSpan">
      <IntroduceItem
        title="总用户"
        :count="numeral(56324).format('0,0')"
        footerLabel="日新增"
        footerValue="111人"
      >
        <el-progress class="progrees" :stroke-width="8" :percentage="70" />
      </IntroduceItem>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import VChart from "vue-echarts";
import IntroduceItem from "./introduce-item.vue";
import Trend from "@/components/trend/index.vue";
import { toYuan } from "@/utils/util";
import { getIntroduceData } from "@/api/dashboard";
import useLoading from "@/hooks/use-loading";
import numeral from "numeral";

const attarSpan = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
};
const [loading, setLoading] = useLoading(true);

// =========================== 访问量EChart的options加工厂 =======================
const visitEChartOptionsFactory = () => {
  const data = ref<[string[], number[]]>([[], []]);
  const option = computed(() => {
    return {
      xAxis: {
        type: "category",
        data: data.value[0],
        boundaryGap: false,
        show: false,
        axisPointer: {
          show: true,
          lineStyle: {
            color: "#c6e2ff",
            width: 1,
          },
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      tooltip: {
        trigger: "axis",
      },
      series: [
        {
          name: "日访问量",
          data: data.value[1],
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
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    };
  });
  return { data, option };
};
// =========================== 订单量EChart的options加工厂 =======================
const orderEChartOptionsFactory = () => {
  const data = ref<[string[], number[]]>([[], []]);
  const option = computed(() => {
    return {
      xAxis: {
        type: "category",
        data: data.value[0],
        show: false,
      },
      yAxis: {
        type: "value",
        show: false,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      series: [
        {
          name: "日订单量",
          data: data.value[1],
          type: "bar",
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    };
  });
  return { data, option };
};

const { data: visitData, option: visitOption } = visitEChartOptionsFactory();
const { data: orderData, option: orderOption } = orderEChartOptionsFactory();

const fetchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getIntroduceData();
    data.visitData.forEach(({ x, y }) => {
      visitData.value[0].push(x);
      visitData.value[1].push(y);
    });
    data.orderData.forEach(({ x, y }) => {
      orderData.value[0].push(x);
      orderData.value[1].push(y);
    });
  } catch (err) {
  } finally {
    setLoading(false);
  }
};
fetchDataList();
</script>

<style scoped lang="scss">
.introduce {
  > .el-col {
    margin-bottom: 14px;
  }

  .assimilate {
    .ratio {
      margin-left: 5px;
    }
  }

  .progrees {
    width: 100%;
    margin-bottom: 5px;

    :deep(.el-progress__text) {
      font-size: 14px !important;
    }
  }
}
</style>
