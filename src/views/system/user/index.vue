<template>
  <el-card class="form-card" v-show="isQueryForm">
    <QueryForm
      :model="queryForm"
      label-width="82px"
      ref="formRef"
      :isControl="true"
    >
      <QueryFormItem label="用户名" prop="name">
        <el-input
          v-model="queryForm.name"
          placeholder="请输入用户名"
          clearable
        />
      </QueryFormItem>
      <QueryFormItem label="用户ID" prop="userId">
        <el-input
          v-model="queryForm.userId"
          placeholder="请输入用户ID"
          clearable
        />
      </QueryFormItem>
      <QueryFormItem label="手机号" prop="phone">
        <el-input
          v-model="queryForm.phone"
          placeholder="请输入手机号"
          clearable
        />
      </QueryFormItem>
      <QueryFormItem label="性别" prop="sex">
        <el-select v-model="queryForm.sex" placeholder="请选择" clearable>
          <el-option label="男" value="man" />
          <el-option label="女" value="girl" />
        </el-select>
      </QueryFormItem>
      <QueryFormItem label="登录账号" prop="loginUser">
        <el-input
          v-model="queryForm.loginUser"
          placeholder="请输入登录账号"
          clearable
        />
      </QueryFormItem>

      <QueryFormItem label="状态" prop="status">
        <el-select v-model="queryForm.status" placeholder="请选择" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </QueryFormItem>

      <QueryFormItem label="创建时间" prop="createDate">
        <el-date-picker
          class="card-header-extra-action"
          v-model="queryForm.createDate"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
        />
      </QueryFormItem>

      <template #control="slotProps">
        <el-button type="primary" @click="search">
          {{ $t("form.search") }}
        </el-button>
        <el-button @click="resetForm"> {{ $t("form.reset") }}</el-button>
      </template>
    </QueryForm>
  </el-card>

  <el-card class="content-card system-user">
    <TableToolbar
      v-model:size="size"
      v-model:stripe="stripe"
      v-model:isQueryForm="isQueryForm"
      v-model:columns="columns"
      @refresh="search"
    >
      <el-button type="primary" plain @click="onAdd">添加用户</el-button>
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
          <template #name="scope">
            <div class="name-slot">
              <el-avatar
                class="avatar"
                shape="square"
                :size="32"
                :src="scope.row.avatar"
              />
              <span>{{ scope.row.name }}</span>
            </div>
          </template>

          <template #sex="scope">
            <el-tag :type="scope.row.sex === 'man' ? 'primary' : 'danger'">
              {{ scope.row.sex === "man" ? "男" : "女" }}
            </el-tag>
          </template>

          <template #status="scope">
            <span :class="['circle', statusMap[scope.row.status].type]"></span>
            {{ statusMap[scope.row.status].label }}
          </template>

          <template #operations="scope">
            <el-button link type="primary" @click="onEdit(scope.row)">
              编辑
            </el-button>
            <el-divider direction="vertical" />
            <el-button link type="danger" @click="onDeleteByRow(scope.row)">
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

    <AddUser v-model="addDialog" />
    <EditUser v-model="editState.dialog" :current="editState.current" />
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref, h } from "vue";
import { QueryForm, QueryFormItem } from "@/components/query-form";
import useLoading from "@/hooks/use-loading";
import {getUserList, UserData} from "@/api/system";
import TableColumn, {TableColumnData} from "@/components/table-column/index.vue";
import TableToolbar from "@/components/table-toolbar/index.vue";
import useTableSelection from "@/hooks/use-table-selection";
import {ElMessage, ElMessageBox, TableInstance} from "element-plus";
import AddUser from "./components/add-user.vue";
import EditUser from "./components/edit-user.vue";
import statusOptions from "./statusOptions";
import useTable from "@/hooks/use-table";

defineOptions({
  name: "User", //不命名组件，keep-alive的include不属性生效
});

type State = { dialog: boolean; current: UserData | null };


const statusMap = {
  normal: { label: "正常", type: "success" },
  freeze: { label: "冻结", type: "error" },
  offline: { label: "关闭", type: "primary" },
};
const queryForm = reactive({
  name: "",
  userId: "",
  phone: "",
  sex: "",
  loginUser: "",
  status: "",
  createDate: "",
});
let tableData = ref<UserData[]>([]);
const formRef = ref<InstanceType<typeof QueryForm>>();
const tableRef = ref<TableInstance>();
const addDialog = ref(false);
const editState = reactive<State>({ dialog: false, current: null });
const columns = ref<TableColumnData[]>([
  { type: "selection", width: 55 },
  { prop: "name", slotName: "name", label: "用户名", "min-width": 110 },
  { prop: "loginUser", label: "登录账号", "min-width": 110 },
  { prop: "phone", label: "手机号", "min-width": 120 },
  { prop: "email", label: "邮箱", "min-width": 160 },
  { slotName: "sex", prop: "sex", label: "性别", "min-width": 80 },
  { slotName: "status", prop: "status", label: "状态", "min-width": 80 },
  { prop: "createDate", label: "创建时间", "min-width": 170 },
  {
    slotName: "operations",
    prop: "operations",
    label: "操作",
    fixed: "right",
    width: 120,
  },
]);

const [loading, setLoading] = useLoading(false);
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
} = useTableSelection(tableData, tableRef);

const fetchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getUserList({
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

const search = () => {
  fetchDataList();
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
      "您确定要删除用户 ",
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

const onAdd = () => {
  addDialog.value = true;
};

const onEdit = (row:UserData) => {
  editState.current = row;
  editState.dialog = true;
};

const onDeleteByRow = ({ id, name }) => {
  ElMessageBox({
    title: "删除确定",
    message: h("p", null, [
      "您确定要删除用户 ",
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
</script>

<style scoped lang="scss">
.system-user {
  .name-slot {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 8px;
    }
  }
}
</style>
