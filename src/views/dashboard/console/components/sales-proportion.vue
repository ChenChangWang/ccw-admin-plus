<template>
  <el-card class="sales-proportion content-card">
    <template #header>
      <span>销售额类别占比</span>
      <div class="card-header-extra">
        <el-radio-group v-model="type" size="default" @change="change">
          <el-radio-button value="all">全部</el-radio-button>
          <el-radio-button value="online">线上</el-radio-button>
          <el-radio-button value="store">门店</el-radio-button>
        </el-radio-group>
        <el-dropdown class="card-header-extra-action">
          <span class="title-tip-icon">
            <Icon icon="ri:more-line" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>操作一</el-dropdown-item>
              <el-dropdown-item>操作二</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
    <div style="margin-bottom: 12px">销售额</div>
    <VChart :loading="loading" :option="option" class="echarts" autoresize />
  </el-card>
</template>

<script setup>
import { computed, ref } from "vue";
import VChart from "vue-echarts";

import useLoading from "@/hooks/use-loading";
import { getSalesProportionData } from "@/api/dashboard";
import { Icon } from "@iconify/vue";
const optionData = ref([]);
const type = ref("all");
const option = computed(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        data: optionData.value,
        radius: ["40%", "90%"],
        type: "pie",
        avoidLabelOverlap: false, //是否启用防止标签重叠策略，默认开启，
        emphasis: {
          disabled: true, //关闭高亮状态可以在鼠标移到图形上，tooltip 触发，或者图例联动的时候不再触发高亮效果
        },
        top: "12px",
        bottom: "12px",
      },
    ],
  };
});
const [loading, setLoading] = useLoading(true);
const fetchData = async () => {
  setLoading(true);
  try {
    const { data } = await getSalesProportionData({
      type: type.value,
    });
    optionData.value = data.data;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};
fetchData();
const change = () => {
  fetchData();
};
</script>

<style scoped lang="scss">
.sales-proportion {
  height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.el-card__header) {
    line-height: 32px;
  }
  :deep(.el-card__body) {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .echarts {
      min-height: 340px;
      flex: 1;
    }
  }
}
</style>
