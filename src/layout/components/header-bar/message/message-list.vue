<template>
  <el-scrollbar v-loading="loading" class="message-list" height="240px">
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
        <el-avatar :size="38" :src="item.avatar" class="item-avatar" />
        <div class="item-content">
          <div class="item-title">
            <span class="item-title-use"> {{ item.title }}</span>
            <span class="item-title-subtitle"> {{ item.subTitle }}</span>
          </div>
          <div class="item-desc">
            {{ item.content }}
          </div>
          <div class="item-time">{{ item.date }}</div>
        </div>
      </div>
    </template>
  </el-scrollbar>
</template>

<script setup>
import { ref } from "vue";
import useLoading from "@/hooks/use-loading";
import {
  getMessageList,
  messageRead,
  messageAllRead,
  messageClear,
} from "@/api/message";

const props = defineProps({});

const list = ref([]);
const unReadTotal = ref();
const [loading, setLoading] = useLoading(false);
const fetchData = async () => {
  setLoading(true);
  try {
    const { data } = await getMessageList();
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
    await messageRead({ id: item.id });
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
    await messageAllRead();
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
    await messageClear();
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
.message-list {
  .item {
    display: flex;
    position: relative;
    padding: 10px 16px;
    border-bottom: 1px solid var(--el-border-color);
    cursor: pointer;
    &:last-child {
      border: none;
    }
    &.read {
      opacity: 0.5;
    }
    .item-avatar {
      flex-shrink: 0;
    }
    .item-content {
      margin-left: 12px;
      .item-title {
        font-size: 14px;
        line-height: 22px;
        .item-title-use {
          color: var(--el-text-color-primary);
        }
        .item-title-subtitle {
          font-size: 13px;
          margin-left: 5px;
          color: var(--el-text-color-regular);
        }
      }
      .item-desc {
        margin-top: 3px;
        line-height: 20px;
        font-size: 13px;
      }
      .item-time {
        margin-top: 3px;
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
