<template>
  <el-card class="form-card" v-show="isQueryForm">
    <QueryForm
      :model="queryForm"
      label-width="102px"
      :isControl="true"
      ref="formRef"
    >
      <QueryFormItem label="规则名称" prop="ruleName">
        <el-input v-model="queryForm.ruleName" placeholder="请输入" />
      </QueryFormItem>
      <QueryFormItem label="描述" prop="describe">
        <el-input v-model="queryForm.describe" placeholder="请输入" />
      </QueryFormItem>
      <QueryFormItem label="服务调用次数" prop="serviceCallNumber">
        <el-input v-model="queryForm.serviceCallNumber" placeholder="请输入" />
      </QueryFormItem>
      <QueryFormItem label="状态" prop="status">
        <el-select v-model="queryForm.status" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </QueryFormItem>
      <QueryFormItem label="上次调用时间" prop="prevCallTime">
        <el-input v-model="queryForm.prevCallTime" placeholder="请输入" />
      </QueryFormItem>

      <template #control="slotProps">
        <el-button type="primary" @click="search">
          {{ $t("form.search") }}
        </el-button>
        <el-button @click="resetForm"> {{ $t("form.reset") }}</el-button>
      </template>
    </QueryForm>
  </el-card>

  <el-card class="content-card">
    <!-- 工具栏 -->
    <TableToolbar
      v-model:size="size"
      v-model:stripe="stripe"
      v-model:isQueryForm="isQueryForm"
      v-model:columns="columns"
      @refresh="search"
    >
      <el-button type="primary" v-permission="['list:search-table:add']">
        新建
      </el-button>
      <el-button v-if="multipleSelection.length"> 批量删除 </el-button>
      <el-button v-if="multipleSelection.length"> 批量审批 </el-button>
    </TableToolbar>

    <div class="table-wrapper">
      <!-- 提示信息 -->
      <Alert>
        <template #icon>
          <Icon icon="material-symbols:info" />
        </template>
        已选择
        <el-text type="primary">
          &nbsp;{{ multipleSelection.length }}&nbsp;
        </el-text>
        项&nbsp; 服务调用次数总计&nbsp;
        <el-text tag="b">{{ serviceCallTotal }}</el-text> &nbsp;次

        <template #operation>
          <el-button type="primary" link @click="clearSelection"
            >取消选择</el-button
          >
        </template>
      </Alert>

      <el-table
        :data="tableData"
        v-loading="loading"
        @select="handleSelectChange"
        @select-all="handleSelectAll"
        :size="size"
        :stripe="stripe"
        id="your-element-id"
        ref="tableRef"
        row-key="id"
      >
        <template #empty>
          <el-empty class="table-empty" description="暂无数据" />
        </template>
        <TableColumn :columns="columns">
          <template #status="scope">
            <span :class="['circle', scope.row.status]"></span>
            {{ statusMap[scope.row.status]?.label }}
          </template>
          <template #operations="scope">
            <el-button link type="primary" size="small">编辑</el-button>
            <el-divider direction="vertical" />
            <el-button link type="primary" size="small">订阅警报</el-button>
          </template>
        </TableColumn>
      </el-table>

      <el-pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="table-pagination"
      />
    </div>
  </el-card>
</template>

<script setup lang="jsx">
import { computed, reactive, ref, watch } from "vue";
import { QueryForm, QueryFormItem } from "@/components/query-form";
import { Icon } from "@iconify/vue";
import useLoading from "@/hooks/use-loading";
import { getSearchTableList } from "@/api/list";
import Alert from "@/components/alert/index.vue";
import TableColumn from "@/components/table-column/index.vue";
import TableToolbar from "@/components/table-toolbar/index.vue";
import useTableSelection from "@/hooks/use-table-selection";
import useTable from "@/hooks/use-table";

defineOptions({
  name: "SearchTable", //不命名组件，keep-alive的include不属性生效
});
const statusOptions = [
  { label: "关闭", value: "closed" },
  { label: "运行中", value: "running" },
  { label: "已上线", value: "online" },
  { label: "异常", value: "exception" },
];
const statusMap = {
  closed: { label: "关闭", value: "closed" },
  running: { label: "运行中", value: "running" },
  online: { label: "已上线", value: "online" },
  exception: { label: "异常", value: "exception" },
};
const formRef = ref();
const tableRef = ref();
const queryForm = reactive({
  ruleName: "",
  describe: "",
  serviceCallNumber: "",
  status: "",
  prevCallTime: "",
});
let tableData = ref([]);
const columns = ref([
  { type: "selection", width: 55 },
  { prop: "ruleName", label: "规则名称", "min-width": 150 },
  { prop: "describe", label: "描述", "min-width": 130 },
  {
    render: (scope) => {
      return <div>{scope.row["serviceCallNumber"]}次</div>;
    },
    prop: "serviceCallNumber",
    label: "服务调用次数",
    "min-width": 130,
  },
  { prop: "prevCallTime", label: "上次调用时间", "min-width": 170 },
  { slotName: "status", prop: "status", label: "状态", "min-width": 120 },
  {
    slotName: "operations",
    prop: "operations",
    label: "操作",
    fixed: "right",
    align: "center",
    width: 150,
  },
]);

const {
  size,
  stripe,
  isQueryForm,
  pagination,
  handleSizeChange,
  handleCurrentChange,
  resetForm,
} = useTable(() => fetchDataList(), formRef);

const {
  handleSelectChange,
  handleSelectAll,
  multipleSelection,
  clearSelection,
} = useTableSelection(tableData, tableRef);
const [loading, setLoading] = useLoading(false);
const serviceCallTotal = computed(() => {
  return multipleSelection.value.reduce((acc, item) => {
    return Number(acc) + Number(item.serviceCallNumber);
  }, 0);
});
const search = () => {
  fetchDataList();
};

const fetchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getSearchTableList({
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
      ...queryForm,
    });
    tableData.value = data.list;
    pagination.total = data.total;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};

fetchDataList();
</script>

<style scoped lang="scss">
.circle {
  &.closed {
    background-color: var(--el-color-info);
  }

  &.running {
    background-color: var(--el-color-primary);
  }

  &.online {
    background-color: var(--el-color-success);
  }

  &.exception {
    background-color: var(--el-color-error);
  }
}
</style>
