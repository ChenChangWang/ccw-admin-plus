<template>
  <div class="basic-list">
    <el-card class="content-card">
      <el-row>
        <el-col :sm="8" :xs="24" class="standard-item">
          <span>我的任务</span>
          <p>10个任务</p>
          <em></em>
        </el-col>
        <el-col :sm="8" :xs="24" class="standard-item">
          <span>进行中的任务</span>
          <p>3个任务</p>
          <em></em>
        </el-col>
        <el-col :sm="8" :xs="24" class="standard-item">
          <span>本周完成任务数</span>
          <p>18个任务</p>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="list-cart content-card">
      <template #header>
        <span class="header-title">基础列表</span>
        <div class="card-header-extra">
          <el-radio-group v-model="type" size="default">
            <el-radio-button value="all">全部</el-radio-button>
            <el-radio-button value="progress">进行中</el-radio-button>
            <el-radio-button value="waiting">等待中</el-radio-button>
          </el-radio-group>

          <el-input
            class="extra-content-input"
            v-model="input"
            placeholder="请输入..."
            :suffix-icon="Search"
          />
        </div>
      </template>
      <el-button @click="handleAdd()" plain class="add-btn btn-dashed">
        新增
      </el-button>
      <div class="list-container">
        <List class="list" :loading="loading">
          <ListItem v-for="item in list" :key="item.id">
            <ListItemMeta :title="item.title">
              <template #avatar>
                <el-avatar
                  shape="square"
                  :size="40"
                  fit="fill"
                  :src="item.logo"
                />
              </template>
              <template #description>
                <el-text line-clamp="3">
                  {{ item.description }}
                </el-text>
              </template>
            </ListItemMeta>
            <div class="list-item-content">
              <div class="list-item-content-item">
                <span>负责人</span>
                <p>{{ item.name }}</p>
              </div>
              <div class="list-item-content-item">
                <span>开始时间</span>
                <p>{{ item.startDate }}</p>
              </div>
              <div class="list-item-content-item">
                <el-progress
                  class="progrees"
                  :stroke-width="8"
                  :percentage="item.percent"
                  :color="customColors"
                />
              </div>
            </div>
            <template #action>
              <li>
                <el-link :underline="false" @click="handleEdit(item)">
                  编辑
                </el-link>
              </li>
              <li>
                <el-dropdown>
                  <el-link :underline="false">
                    操作 <span class="icon"><Icon icon="uiw:down" /></span>
                  </el-link>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="handleEdit(item)">
                        编辑
                      </el-dropdown-item>
                      <el-dropdown-item @click="handleDelete(item.id!)">
                        删除
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </li>
            </template>
          </ListItem>
        </List>

        <el-pagination
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          layout=" prev, pager, next"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          class="pagination"
        />
      </div>
    </el-card>

    <OperationDialog
      v-model="operationState.visible"
      :title="operationState.title"
      :formData="operationState.formData"
      :loading="operationState.loading"
      @onSubmit="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, h, reactive } from "vue";
import { Icon } from "@iconify/vue";
import OperationDialog from "./components/operation-dialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { List, ListItemMeta, ListItem } from "@/components/list";
import useLoading from "@/hooks/use-loading";
import {
  getBasicList,
  addBasicList,
  editBasicList,
  deleteBasicList,
  BasicData,
} from "@/api/list";

defineOptions({
  name: "BasicList", //不命名组件，keep-alive的include不属性生效
});

const Search = h(Icon, { icon: "iconamoon:search-light", width: 25 });
const customColors = [
  { color: "#f56c6c", percentage: 20 },
  { color: "#e6a23c", percentage: 40 },
  { color: "#5cb87a", percentage: 60 },
  { color: "#1989fa", percentage: 80 },
  { color: "#6f7ad3", percentage: 100 },
];
const type = ref("all");
const input = ref("");
let list = ref<BasicData[]>([]);
const operationState = reactive({
  visible: false,
  formData: {},
  title: "任务新增",
  loading: false,
});
const pagination = reactive({
  currentPage: 1,
  pageSize: 5,
  total: 0,
});

const [loading, setLoading] = useLoading(false);

// =========================== 分页列表 =======================
const fetchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getBasicList({
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
    });
    list.value = data.list;
    pagination.total = data.total;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};

fetchDataList();

const handleSizeChange = (val: number) => {
  pagination.currentPage = 1;
  pagination.pageSize = val;
  fetchDataList();
};

const handleCurrentChange = (val: number) => {
  pagination.currentPage = val;
  fetchDataList();
};

// =========================== 操作 =======================
const handleEdit = (row: BasicData) => {
  // dialogVisible.value = true;
  operationState.visible = true;
  operationState.formData = row;
  operationState.title = "任务编辑";
};

const handleAdd = () => {
  operationState.visible = true;
  operationState.formData = {};
  operationState.title = "任务新增";
};

const handleDelete = (id: string) => {
  ElMessageBox.confirm("确定删除该任务吗?", "删除任务", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    await deleteBasicList({ id });
    ElMessage({ message: "删除成功", type: "success" });
    fetchDataList();
  });
};

const onSubmit = async (data: BasicData) => {
  const method = data.id ? editBasicList : addBasicList;
  operationState.loading = true;
  try {
    await method(data);
    ElMessage({ message: "操作成功", type: "success" });
    operationState.visible = false;
    fetchDataList();
  } catch (err) {
  } finally {
    operationState.loading = false;
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/var" as var;

.basic-list {
  .standard-item {
    position: relative;
    text-align: center;
    margin: 10px 0;
    @media screen and (max-width: var.$sm) {
      margin-bottom: 14px;
      > em {
        display: none;
      }
    }
    > span {
      color: var(--el-text-color-regular);
      line-height: 22px;
    }
    > p {
      color: var(--el-text-color-primary);
      font-size: 24px;
      margin: 4px 0 0 0;
    }
    > em {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 90%;
      background-color: var(--el-border-color);
    }
  }
  .list-cart {
    margin-top: 14px;
    :deep(.el-card__body) {
      padding: 20px 20px 20px 20px;
    }
    .add-btn {
      width: 100%;
    }
    .header-title {
      font-size: 16px;
      color: var(--el-text-color-primary);
    }
    .card-header-extra {
      .extra-content-input {
        width: 210px;
        margin-left: 16px;
      }
      @media screen and (max-width: var.$sm) {
        flex-direction: column;
        .extra-content-input {
          margin-left: 0;
          margin-top: 12px;
        }
      }
    }
    .list-container {
      margin-top: 16px;

      :deep(.list) {
        min-height: 200px;
        .list-item {
          .list-item-meta {
            align-items: center;
            flex: 1;
            .list-item-meta-description {
              .el-text {
                color: var(--el-text-color-secondary);
                font-size: 13px;
              }
            }
          }
          .list-item-content {
            .list-item-content-item {
              margin-left: 36px;
              vertical-align: middle;
              display: inline-block;
              color: var(--el-text-color-secondary);
              > p {
                margin: 4px 0 0 0;
                line-height: 22px;
              }
              .progrees {
                width: 180px;
              }
            }
          }
          .list-item-action {
            li {
              padding: 0 16px;
              &:first-child {
                padding-left: 0;
              }
              .el-dropdown {
                vertical-align: middle;
                .icon {
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
      .pagination {
        display: flex;
        justify-content: end;
        margin-top: 16px;
      }
    }
  }
}
</style>
