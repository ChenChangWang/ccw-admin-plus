<template>
  <el-card class="user-management content-card">
    <template #header>
      <span>成员管理</span>
    </template>

    <el-table :data="tableData">
      <el-table-column label="姓名">
        <template #default="scope">
          <el-input v-if="scope.row.isAdd" v-model="scope.row.name" />
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号">
        <template #default="scope">
          <el-input v-if="scope.row.isAdd" v-model="scope.row.workId" />
          <span v-else>{{ scope.row.workId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门">
        <template #default="scope">
          <el-select v-if="scope.row.isAdd" v-model="scope.row.department">
            <el-option label="研发部" value="研发部" />
            <el-option label="设计部" value="设计部" />
            <el-option label="产品部" value="产品部" />
          </el-select>
          <span v-else>{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <div v-if="scope.row.isAdd">
            <el-button
              type="success"
              size="small"
              @click="onSubmitAdd(scope.$index)"
            >
              添加
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="onDelete(scope.$index)"
            >
              取消
            </el-button>
          </div>
          <div v-else>
            <el-button
              type="primary"
              size="small"
              :disabled="isAddIng"
              @click="editor(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="是否要删除此行?"
              :hide-after="100"
              :width="154"
              @confirm="onDelete(scope.$index)"
            >
              <template #reference>
                <el-button type="danger" size="small" :disabled="isAddIng">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="btn-add btn-dashed" @click="onAdd()" :disabled="isAddIng">
      <Icon icon="mingcute:add-fill" />
      <span>新增</span>
    </el-button>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import { isEmpty } from "@/utils/util";
import { ElMessage } from "element-plus";

interface TableData {
  name: string;
  workId: string;
  department: string;
  isAdd?: boolean;
}

const tableData = reactive<TableData[]>([
  {
    name: "张三",
    workId: "001",
    department: "研发部",
  },
  {
    name: "王五",
    workId: "002",
    department: "设计部",
  },
  {
    name: "李四",
    workId: "003",
    department: "产品部",
  },
]);

const isAddIng = computed(() => {
  if (tableData.length) {
    return tableData[tableData.length - 1].isAdd;
  }
  return false;
});

const onAdd = () => {
  if (isAddIng.value) {
    return;
  }
  tableData.push({
    isAdd: true,
    name: "",
    workId: "",
    department: "",
  });
};

const onSubmitAdd = (index: number) => {
  const { name, workId, department } = tableData[index];
  if (isEmpty(name) || isEmpty(workId) || isEmpty(department)) {
    ElMessage.error("请填写完整的成员信息");
    return;
  }
  delete tableData[index].isAdd;
};

const onDelete = (index: number) => {
  tableData.splice(index, 1);
};

const editor = (row: TableData) => {
  if (isAddIng.value) {
    return;
  }
};
</script>

<style scoped lang="scss">
.user-management {
  :deep(.el-table) {
    .el-table__header {
      .cell {
        color: var(--el-text-color-regular);
      }
    }
    .el-table__body {
      .cell {
        .el-input,
        .el-select {
          padding: 0;
        }
      }
    }
  }
  .btn-add {
    margin-top: 14px;
    width: 100%;
    margin-bottom: 24px;
  }
}
</style>
