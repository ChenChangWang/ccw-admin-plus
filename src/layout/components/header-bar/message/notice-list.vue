<template>
  <el-scrollbar v-loading="loading" class="notice-list" height="240px">
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
        <div class="item-title">
          {{ item.title }}
        </div>
        <div class="item-desc">
          {{ item.content }}
        </div>
      </div>
    </template>
  </el-scrollbar>
</template>

<script setup>
import { ref } from "vue";
import useLoading from "@/hooks/use-loading";
import {
  getNoticeList,
  noticeRead,
  noticeAllRead,
  noticeClear,
} from "@/api/message";

const props = defineProps({});

const list = ref([]);
const unReadTotal = ref();
const [loading, setLoading] = useLoading(false);
const fetchData = async () => {
  setLoading(true);
  try {
    const { data } = await getNoticeList();
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
    await noticeRead({ id: item.id });
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
    await noticeAllRead();
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
    await noticeClear();
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
.notice-list {
  .item {
    padding: 10px 16px;
    border-bottom: 1px solid var(--el-border-color);
    cursor: pointer;
    &:last-child {
      border: none;
    }
    &.read {
      opacity: 0.5;
    }
    .item-title {
      font-size: 14px;
      line-height: 22px;
      color: var(--el-text-color-primary);
    }
    .item-desc {
      margin-top: 5px;
      line-height: 20px;
      font-size: 13px;
      color: var(--el-text-color-regular);
    }
  }
}
</style>
