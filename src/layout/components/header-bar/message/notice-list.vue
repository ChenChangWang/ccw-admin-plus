<template>
  <el-scrollbar height="240px" class="notice-list" v-loading="loading">
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

<script lang="ts" setup>
import { ref } from "vue";
import useLoading from "@/hooks/use-loading";
import {
  getNoticeList,
  noticeRead,
  noticeAllRead,
  noticeClear, NoticeData,
} from "@/api/message";

const list = ref<NoticeData[]>([]);
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

const handleRead = async (item:NoticeData) => {
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

<style scoped lang="scss">
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
