<template>
  <el-scrollbar height="240px" class="todo-list" v-loading="loading">
    <el-empty
      v-if="!list || !list.length"
      description="暂无数据"
      :image-size="70"
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

        <el-tag class="item-status" :type="item.status">
          {{ item.statusLabel }}
        </el-tag>
      </div>
    </template>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useLoading from "@/hooks/use-loading";
import {
  getTodoList,
  todoRead,
  todoAllRead,
  todoClear,
  TodoData,
} from "@/api/message";

const list = ref<TodoData[]>([]);
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

const handleRead = async (item: TodoData) => {
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

<style scoped lang="scss">
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
