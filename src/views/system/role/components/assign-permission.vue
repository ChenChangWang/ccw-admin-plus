<template>
  <el-dialog v-model="dialog" width="530px" class="assign-permission-dialog">
    <template #header>
      <div class="el-dialog__title">
        分配
        <span style="font-weight: bold"> {{ current?.name }} </span>
        的菜单权限
      </div>
    </template>

    <el-tree
      class="assign-permission-tree"
      v-loading="loading"
      empty-text="暂无数据"
      ref="treeRef"
      :data="menuData"
      highlight-current
      show-checkbox
      node-key="id"
      :default-expand-all="isExpandAll"
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ data.menuName }}</span>
        </span>
      </template>
    </el-tree>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" plain @click="expandCollapseHandle">
          {{ isExpandAll ? "全部收起" : "全部展开" }}
        </el-button>
        <el-button type="primary" plain @click="checkedAll">全部选择</el-button>

        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { getMenuList } from "@/api/system";
import useLoading from "@/hooks/use-loading";
import { ElMessage } from "element-plus";

const props = defineProps({
  current: Object,
});
const menuData = ref([]);
const treeRef = ref(); //tree的ref
const isExpandAll = ref(true); //是否展开所有

const model = defineModel();
const dialog = computed({
  get: () => model.value,
  set: (val) => (model.value = val),
});
const [loading, setLoading] = useLoading(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const { data } = await getMenuList();
    menuData.value = data;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};
fetchData();

//数据
watch([() => props.current, () => dialog.value], () => {
  if (!dialog.value) {
    return;
  }
  nextTick(() => {
    treeRef.value?.setCheckedKeys(props.current?.defaultCheckedKeys || []);
  });
});

//全部勾选
const checkedAll = () => {
  treeRef.value?.setCheckedNodes(menuData.value);
};

/**
 * 展开和收起处理
 */
function expandCollapseHandle() {
  // 全部折叠
  if (isExpandAll.value) {
    Object.values(treeRef.value.store.nodesMap).forEach((v) => v.collapse());
  } else {
    // 全部展开
    Object.values(treeRef.value.store.nodesMap).forEach((v) => v.expand());
  }
  isExpandAll.value = !isExpandAll.value;
}

const submit = () => {
  const keys = treeRef.value.getCheckedKeys();
  console.log("keys", keys);
  ElMessage({
    type: "error",
    message: "抱歉，您没有该权限",
  });
};
</script>

<style scoped lang="scss">
.assign-permission-tree {
  max-height: calc(72vh - 142px);
  overflow: auto;
  :deep(.el-tree-node) {
    margin: 3px 0;
  }
}
</style>
