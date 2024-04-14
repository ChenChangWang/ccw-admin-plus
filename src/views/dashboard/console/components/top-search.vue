<template>
  <el-card class="top-search content-card">
    <template #header>
      <span>热门搜索</span>
      <div class="card-header-extra">
        <el-dropdown class="dropdown-options">
          <span class="title-tip-icon"><Icon icon="ri:more-line" /></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>操作一</el-dropdown-item>
              <el-dropdown-item>操作二</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>

    <el-row :gutter="16" class="user-search">
      <el-col :span="12">
        <div class="user-search-info">
          <span>搜索用户数</span>
          <el-tooltip effect="dark" content="指标说明" placement="top">
            <span class="title-tip-icon">
              <Icon icon="ant-design:info-circle-outlined" />
            </span>
          </el-tooltip>
        </div>
        <div class="user-search-chart">
          <VChart :loading="useSearchLoading" :option="option" autoresize />
        </div>
      </el-col>

      <el-col :span="12" class="user-search-info">
        <div class="user-search-info">
          <span>人均搜索次数</span>
          <el-tooltip effect="dark" content="指标说明" placement="top">
            <span class="title-tip-icon">
              <Icon icon="ant-design:info-circle-outlined" />
            </span>
          </el-tooltip>
        </div>
        <div class="user-search-chart">
          <VChart
            :loading="useSearchLoading"
            :option="option"
            autoresize
          /></div
      ></el-col>
    </el-row>

    <div class="top-search-table">
      <el-table
        :data="tableData"
        v-loading="loading"
        header-cell-class-name="table-header-cell"
      >
        <TableColumn :columns="columns">
          <template #keyword="scope">
            <el-button type="primary" link size="small">
              {{ scope.row.keyword }}
            </el-button>
          </template>
          <template #range="scope">
            <Trend :flag="scope.row.status === 1 ? 'up' : 'down'">
              {{ scope.row.range }}%
            </Trend>
          </template>
        </TableColumn>
      </el-table>

      <el-pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        layout="  prev, pager, next"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        size="small"
      />
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import useLoading from "@/hooks/use-loading";
import { getTopSearchData, getSearchUserData } from "@/api/dashboard";
import { Icon } from "@iconify/vue";
import Trend from "@/components/trend/index.vue";
import VChart from "vue-echarts";
import TableColumn from "@/components/table-column/index.vue";
import {Pagination} from "@/api";

const pagination = reactive<Pagination>({
  currentPage: 1,
  pageSize: 5,
  total: 0,
});
const [useSearchLoading, setUseSearchLoading] = useLoading(true);
const [loading, setLoading] = useLoading(false);
const optionData = ref([[], []]);
let tableData = ref([]);

// =========================== 搜索用户 =======================
const option = computed(() => {
  return {
    xAxis: {
      type: "category",
      data: optionData.value[0],
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
        name: "",
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
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };
});
const fetchUseSearchDataList = async () => {
  setUseSearchLoading(true);
  try {
    const { data } = await getSearchUserData();
    data.forEach(({ x, y }) => {
      optionData.value[0].push(x);
      optionData.value[1].push(y);
    });
  } catch (err) {
  } finally {
    setUseSearchLoading(false);
  }
};
fetchUseSearchDataList();

// =========================== 表格 =======================
const columns = computed(() => [
  { type: "index", label: "排名", "min-width": 55 },
  {
    prop: "keyword",
    slotName: "keyword",
    label: "搜索关键词",
    "min-width": 120,
  },
  { prop: "userNum", label: "用户数", "min-width": 70 },
  { slotName: "range", prop: "range", label: "涨幅", "min-width": 70 },
]);
const fetchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getTopSearchData({
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
    });
    tableData.value = data.list;
    pagination.total = data.total;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};

fetchDataList();

const handleSizeChange = (val) => {
  pagination.currentPage = 1;
  pagination.pageSize = val;
  fetchDataList();
};
const handleCurrentChange = (val) => {
  pagination.currentPage = val;
  fetchDataList();
};
</script>

<style scoped lang="scss">
.top-search {
  height: 100%;
  :deep(.el-card__header) {
    line-height: 32px;
  }
  .user-search {
    .user-search-info {
      height: 22px;
      line-height: 22px;
      color: var(--el-text-color-regular);
      .title-tip-icon {
        margin-left: 6px;
        vertical-align: -0.22rem;
      }
    }
    .user-search-chart {
      height: 60px;
      width: 100%;
      margin-top: 2px;
    }
  }
  .top-search-table {
    margin-top: 12px;

    :deep(.el-table) {
      .table-header-cell {
        font-size: 13px;
        color: var(--el-text-color-regular);
      }
      .el-table__body {
        td {
          padding: 6px 0;
          .cell {
            font-size: 12px;
          }
        }
      }
    }

    .el-pagination {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
}
</style>
