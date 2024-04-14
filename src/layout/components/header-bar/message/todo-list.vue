<template>
  <el-scrollbar v-loading="loading" class="todo-list" height="240px">
    <el-empty
      v-if="!list || !list.length"
      :image-size="70"
      description="暂无数据"
    />
    <template v-else>
      <div
        v-for="item in list"
        :key="item.id"
        :class="['item', { read: item.isRead }]"
        @click="handleRead(item)"
      >
        <div class="item-content">
          <span class="item-title"> {{ item.title }}</span>
          <div class="item-end-desc">{{ item.endDesc }}</div>
        </div>

        <el-tag :type="item.status" class="item-status">
          {{ item.statusLabel }}
        </el-tag>
      </div>
    </template>
  </el-scrollbar>
</template>

<script setup>
import { ref } from "vue";
import useLoading from "@/hooks/use-loading";
import { getTodoList, todoRead, todoAllRead, todoClear } from "@/api/message";

const props = defineProps({});

const list = ref([]);
const unReadTotal = ref();
const [loading, setLoading] = useLoading(false);
const fetchData = async () => {
  setLoading(true);
  try {
    const { data } = await getTodoList();
    list.value = data.list;
    unReadTotal.value = data.total;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};
fetchData();

const handleRead = async (item) => {
  if (item.isRead) {
    return;
  }
  try {
    setLoading(true);
    await todoRead({ id: item.id });
    fetchData();
  } catch (err) {
    setLoading(false);
  }
};
const allRead = async () => {
  if (!list.value || !list.value.length) {
    return;
  }
  try {
    setLoading(true);
    await todoAllRead();
    fetchData();
  } catch (err) {
    setLoading(false);
  }
};
const clear = async () => {
  if (!list.value || !list.value.length) {
    return;
  }
  try {
    setLoading(true);
    await todoClear();
    fetchData();
  } catch (err) {
    setLoading(false);
  }
};
defineExpose({
  allRead,
  clear,
  unReadTotal,
});
</script>

<style lang="scss" scoped>
.todo-list {
  .item {
    padding: 10px 16px;
    border-bottom: 1px solid var(--el-border-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    &:last-child {
      border: none;
    }
    &.read {
      opacity: 0.5;
    }
    .item-content {
      flex: 1 1 auto;
      margin-right: 5px;
      .item-title {
        font-size: 14px;
        line-height: 22px;
        color: var(--el-text-color-primary);
      }
      .item-end-desc {
        margin-top: 5px;
        font-size: 13px;
        color: var(--el-text-color-secondary);
      }
    }
    .item-status {
      flex: 0 0 auto;
    }
  }
}
</style>
