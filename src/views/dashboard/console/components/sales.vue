<template>
  <el-card class="sales content-card">
    <template #header>
      <span>销售额</span>
      <div class="card-header-extra">
        <div class="card-header-extra-options hidden-xs-only">
          <el-link :underline="false" @click="selectDate('day')">今日</el-link>
          <el-link :underline="false" @click="selectDate('week')">本周</el-link>
          <el-link :underline="false" @click="selectDate('month')">
            今月
          </el-link>
          <el-link :underline="false" @click="selectDate('year')">今年</el-link>
        </div>
        <el-date-picker
          style="width: 260px"
          class="card-header-extra-action"
          v-model="date"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
    </template>

    <el-row :gutter="20">
      <el-col :sm="24" :md="16" style="margin-bottom: 12px">
        <h4 class="sales-item-label">销售趋势</h4>
        <div class="sales-chart-warp">
          <VChart :loading="loading" :option="option" autoresize />
        </div>
      </el-col>

      <el-col :sm="24" :md="8">
        <h4 class="sales-item-label">门店销售排行</h4>
        <ul class="ranking">
          <li v-for="(item, index) in shopData">
            <el-text truncated>
              <span :class="{ circle: true, active: index < 3 }">{{
                index + 1
              }}</span>
              <span> {{ item.title }}</span>
            </el-text>
            <span> {{ numeral(item.total).format("0,0") }}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import VChart from "vue-echarts";
import useLoading from "@/hooks/use-loading";
import { getSalesData, ShopData } from "@/api/dashboard";
import numeral from "numeral";
import { getTimeDistance } from "@/utils/util";
import { TimeDistance } from "@/utils/types.ts";

const salesData = ref<[string[], number[]]>([[], []]);
const shopData = ref<ShopData[]>([]);
const date = ref(getTimeDistance("day")); // "YYYY-MM-DD HH:mm:ss"
const [loading, setLoading] = useLoading(true);

const option = computed(() => {
  return {
    xAxis: {
      type: "category",
      data: salesData.value[0],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    series: [
      {
        name: "月销售额",
        data: salesData.value[1],
        type: "bar",
        itemStyle: {
          color: "#79bbff",
        },
      },
    ],
    grid: {
      left: "9%",
      right: "6%",
      top: "5%",
      bottom: "20px",
    },
  };
});

const selectDate = (type: TimeDistance) => {
  date.value = getTimeDistance(type);
};

const fetchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getSalesData();
    data.salesData.forEach(({ x, y }) => {
      salesData.value[0].push(x);
      salesData.value[1].push(y);
    });
    shopData.value = data.shopData;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};

fetchDataList();
</script>

<style scoped lang="scss">
.sales {
  .sales-item-label {
    margin: 0 0 10px 0;
  }

  .sales-chart-warp {
    height: 260px;
    width: 100%;
  }

  .ranking {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 14px;

      .circle {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 12px;
        margin-right: 8px;

        &.active {
          background-color: var(--el-color-primary-light-9);
        }
      }
    }
  }

  .card-header-extra {
    .card-header-extra-options {
      > a {
        margin-left: 16px;
      }
    }

    .el-date-editor {
      width: 250px;
    }
  }
}
</style>
