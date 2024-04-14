<template>
  <div class="page-header">
    <span class="page-header-title"> 菜单管理 </span>
    <div class="page-header-container">
      页面数据为 Mock 实例数据，非真实数据。
    </div>
  </div>

  <el-card class="form-card" v-show="isQueryForm">
    <QueryForm
      :model="queryForm"
      :span="formSpan"
      label-width="102px"
      ref="formRef"
      :isControl="true"
    >
      <QueryFormItem label="菜单名称" prop="menuName">
        <el-input
          v-model="queryForm.menuName"
          placeholder="请输入菜单名称"
          clearable
        />
      </QueryFormItem>

      <QueryFormItem label="状态" prop="status">
        <el-select v-model="queryForm.status" placeholder="请选择" clearable>
          <el-option :value="true" label="正常" />
          <el-option :value="false" label="停用" />
        </el-select>
      </QueryFormItem>

      <template #control="slotProps">
        <el-button type="primary" @click="search">
          {{ $t("form.search") }}
        </el-button>
        <el-button @click="resetForm"> {{ $t("form.reset") }}</el-button>
      </template>
    </QueryForm>
  </el-card>

  <div class="card-list system-menu">
    <el-card class="content-card">
      <TableToolbar
        v-model:size="size"
        v-model:stripe="stripe"
        v-model:isQueryForm="isQueryForm"
        v-model:columns="columns"
        @refresh="search"
      >
        <el-button type="primary" @click="handleAdd()" plain>
          新增菜单
        </el-button>
      </TableToolbar>

      <div class="table-wrapper">
        <el-table
          :data="tableData"
          v-loading="loading"
          :size="size"
          :stripe="stripe"
          row-key="id"
        >
          <template #empty>
            <el-empty class="table-empty" description="暂无数据" />
          </template>
          <TableColumn :columns="columns">
            <template #icon="scope">
              <i class="icon">
                <Icon :icon="scope.row.icon" />
              </i>
            </template>

            <template #menuType="scope">
              <el-tag
                v-if="scope.row.menuType === 'top'"
                effect="plain"
                class="primary"
              >
                目录
              </el-tag>
              <el-tag
                v-else-if="scope.row.menuType === 'menu'"
                effect="plain"
                type="success"
              >
                菜单
              </el-tag>
              <el-tag
                v-if="scope.row.menuType === 'btn'"
                effect="plain"
                type="info"
              >
                按钮
              </el-tag>
            </template>

            <template #status="scope">
              <el-tag
                v-if="scope.row.status == null || scope.row.status === true"
                type="primary"
              >
                正常
              </el-tag>
              <el-tag v-else type="danger"> 停用 </el-tag>
            </template>

            <template #operations="scope">
              <el-button link type="primary" @click="handleView(scope.row)">
                查看
              </el-button>
              <el-divider direction="vertical" />
              <el-button link type="primary" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-divider direction="vertical" />
              <el-button link type="primary" @click="handleAddChild(scope.row)">
                新增子项
              </el-button>
              <el-divider direction="vertical" />
              <el-button link type="danger" @click="onDeleteByRow(scope.row)">
                删除
              </el-button>
            </template>
          </TableColumn>
        </el-table>
      </div>
    </el-card>

    <OperationDialog
      v-model="operationState.visible"
      :formData="operationState.formData"
      :mode="operationState.mode"
      @onSubmit="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from "vue";
import TableColumn, {
  TableColumnData,
} from "@/components/table-column/index.vue";
import TableToolbar from "@/components/table-toolbar/index.vue";
import { useI18n } from "vue-i18n";
import useLoading from "@/hooks/use-loading";
import { getMenuList, SystemMenuData } from "@/api/system";
import { ElMessage, ElMessageBox } from "element-plus";
import { Icon } from "@iconify/vue";
import OperationDialog from "./components/operation-dialog.vue";
import { isEmpty } from "@/utils/util";
import { QueryForm, QueryFormItem } from "@/components/query-form";
import useTable from "@/hooks/use-table";

defineOptions({
  name: "Menu", //不命名组件，keep-alive的include不属性生效
});

interface RuleForm {
  name: string;
  status: string;
  menuName: string;
}

const formSpan = [
  [513, 24, "top"],
  [701, 12, "top"],
  [1062, 12, "right"],
  [Infinity, 8, "right"],
];

let tableData = ref<SystemMenuData[]>([]);
const queryForm = reactive<RuleForm>({
  name: "",
  status: "",
  menuName: "",
});
const columns = ref<TableColumnData>([
  { prop: "menuName", label: "菜单名称", "min-width": 130 },
  {
    slotName: "icon",
    prop: "icon",
    label: "图标",
    width: 80,
    align: "center",
  },
  {
    slotName: "menuType",
    prop: "menuType",
    label: "菜单类型",
    "min-width": 110,
    align: "center",
  },
  { prop: "orderNum", label: "排序", "min-width": 80 },
  {
    prop: "permission",
    label: "权限标识",
    "show-overflow-tooltip": true,
    "min-width": 130,
  },
  {
    prop: "component",
    label: "组件路径",
    "show-overflow-tooltip": true,
    "min-width": 170,
  },
  {
    slotName: "status",
    prop: "status",
    label: "状态",
    "min-width": 90,
    align: "center",
  },
  { prop: "createDate", label: "创建时间", "min-width": 170 },
  {
    slotName: "operations",
    prop: "operations",
    label: "操作",
    fixed: "right",
    width: 260,
  },
]);
const formRef = ref<InstanceType<typeof QueryForm>>();
const operationState = reactive({
  visible: false,
  formData: {},
  mode: "add",
});
const [loading, setLoading] = useLoading(false);
const { t } = useI18n();
const { size, stripe, isQueryForm, resetForm } = useTable(
  () => fetchDataList(),
  formRef,
);

const fetchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getMenuList();
    tableData.value = data;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};

fetchDataList();
const search = () => {
  fetchDataList();
};

const onDeleteByRow = ({ id, menuName }) => {
  ElMessageBox({
    title: "删除确定",
    message: h("p", null, [
      "您确定要删除菜单 ",
      h("span", { style: "font-weight: bold" }, menuName),
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

const getParentIds = (dataList: SystemMenuData[], id: number) => {
  let parentIds:number[] = [];
  const traverse = (list: SystemMenuData[]) => {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      let children = item.children;
      if (item.id === id) {
        return id;
      }
      if (!isEmpty(children)) {
        let findId = traverse(children!);
        if (findId !== undefined) {
          if (item.id != null) {
            parentIds.unshift(item.id);
          }
          return findId;
        }
      }
    }
  };
  traverse(dataList);
  return parentIds;
};

const setFormData = (row: SystemMenuData) => {
  const parentIds = getParentIds(tableData.value, row.id!);
  operationState.formData = { ...row, parentIds: [0, ...parentIds] };
};

const handleView = (row: SystemMenuData) => {
  operationState.mode = "view";
  setFormData(row);
  operationState.visible = true;
};

const handleEdit = (row: SystemMenuData) => {
  operationState.mode = "edit";
  setFormData(row);
  operationState.visible = true;
};

const handleAddChild = (row: SystemMenuData) => {
  operationState.mode = "addChild";
  const parentIds = getParentIds(tableData.value, row.id!);
  operationState.formData = {
    menuType: "menu",
    parentIds: [0, ...parentIds, row.id],
  };
  operationState.visible = true;
};

const handleAdd = () => {
  operationState.mode = "add";
  operationState.visible = true;
};

const onSubmit = async () => {
  ElMessage({
    type: "error",
    message: "抱歉，您没有该权限",
  });
};
</script>

<style scoped lang="scss"></style>
