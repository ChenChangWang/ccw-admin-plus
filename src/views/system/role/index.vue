<template>
  <div class="page-header">
    <span class="page-header-title"> 角色管理 </span>
    <div class="page-header-container">
      页面数据为 Mock 实例数据，非真实数据。
    </div>
  </div>

  <div class="card-list system-menu">
    <el-card class="content-card" style="margin-top: 14px">
      <TableToolbar
        v-model:size="size"
        v-model:stripe="stripe"
        v-model:columns="columns"
        @refresh="search"
      >
        <el-button type="primary" @click="onAdd()" plain>添加角色</el-button>
        <el-button
          v-if="multipleSelection.length"
          type="danger"
          plain
          @click="onDelete()"
        >
          批量删除
        </el-button>
      </TableToolbar>

      <div class="table-wrapper">
        <el-table
          :data="tableData"
          v-loading="loading"
          @select="handleSelectChange"
          @select-all="handleSelectAll"
          :size="size"
          :stripe="stripe"
          ref="tableRef"
          row-key="id"
        >
          <template #empty>
            <el-empty class="table-empty" description="暂无数据" />
          </template>
          <TableColumn :columns="columns">
            <template #isDefault="scope">
              <el-tag :type="scope.row.isDefault ? 'success' : 'danger'">
                {{ scope.row.isDefault ? "是" : "否" }}
              </el-tag>
            </template>

            <template #operations="scope">
              <el-button
                type="primary"
                link
                @click="onAssignPermissionStateByRow(scope.row)"
              >
                菜单权限
              </el-button>
              <el-divider direction="vertical" />
              <el-button type="primary" link @click="onEditByRow(scope.row)">
                编辑
              </el-button>
              <el-divider direction="vertical" />
              <el-button type="danger" link @click="onDeleteByRow(scope.row)">
                删除
              </el-button>
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

    <AddRole v-model="addDialog" />
    <EditRole v-model="editState.dialog" :current="editState.current" />
    <AssignPermission
      v-model="assignPermissionState.dialog"
      :current="assignPermissionState.current"
    />
  </div>
</template>

<script setup>
import { computed, h, reactive, ref } from "vue";
import TableColumn from "@/components/table-column/index.vue";
import TableToolbar from "@/components/table-toolbar/index.vue";
import AddRole from "./components/add-role.vue";
import EditRole from "./components/edit-role.vue";
import AssignPermission from "./components/assign-permission.vue";
import { useI18n } from "vue-i18n";
import useLoading from "@/hooks/use-loading";
import useTableSelection from "@/hooks/use-table-selection";
import { getRoleList } from "@/api/system";
import { ElMessage, ElMessageBox } from "element-plus";
import useTable from "@/hooks/use-table";

defineOptions({
  name: "Role", //不命名组件，keep-alive的include不属性生效
});
let tableData = ref([]);
const { t } = useI18n();

const columns = ref([
  { type: "selection", width: 55 },
  { prop: "name", label: "角色名称", "min-width": 130 },
  { prop: "explain", label: "说明", "min-width": 130 },
  { prop: "createDate", label: "创建时间", "min-width": 170 },
  { prop: "updateDate", label: "更新时间", "min-width": 170 },
  {
    slotName: "isDefault",
    prop: "isDefault",
    label: "是否为默认角色",
    "min-width": 130,
    align: "center",
  },
  {
    slotName: "operations",
    prop: "operations",
    label: "操作",
    fixed: "right",
    width: 190,
  },
]);
const tableRef = ref();
const addDialog = ref(false);
const editState = reactive({ dialog: false, current: null });
const assignPermissionState = reactive({ dialog: false, current: null });

const [loading, setLoading] = useLoading(false);
const {
  size,
  stripe,
  pagination,
  handleSizeChange,
  handleCurrentChange,
  resetForm,
} = useTable(() => fetchDataList());
const {
  handleSelectChange,
  handleSelectAll,
  multipleSelection,
  clearSelection,
} = useTableSelection(tableData, tableRef);

const fetchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getRoleList({
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

const search = () => {
  fetchDataList();
};

const onAdd = () => {
  addDialog.value = true;
};
const onDelete = () => {
  if (!multipleSelection.value.length) {
    return;
  }
  const names = multipleSelection.value
    .map((item) => {
      return item.name;
    })
    .join("，");
  ElMessageBox({
    title: "删除确定",
    message: h("p", null, [
      "您确定要删除角色 ",
      h("span", { style: "font-weight: bold" }, names),
      " 吗？",
    ]),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then((action) => {
    ElMessage({
      type: "error",
      message: "抱歉，您没有该权限",
    });
  });
};

const onDeleteByRow = ({ id, name }) => {
  ElMessageBox({
    title: "删除确定",
    message: h("p", null, [
      "您确定要删除角色 ",
      h("span", { style: "font-weight: bold" }, name),
      " ？",
    ]),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then((action) => {
    ElMessage({
      type: "error",
      message: "抱歉，您没有该权限",
    });
  });
};
const onEditByRow = (row) => {
  editState.current = row;
  editState.dialog = true;
};
const onAssignPermissionStateByRow = (row) => {
  assignPermissionState.current = row;
  assignPermissionState.dialog = true;
};
</script>

<style scoped lang="scss"></style>
