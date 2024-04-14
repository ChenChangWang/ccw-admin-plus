<template>
  <el-scrollbar height="240px" class="message-list" v-loading="loading">
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
        <el-avatar class="item-avatar" :src="item.avatar" :size="38" />
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

<script lang="ts" setup>
import { ref } from "vue";
import useLoading from "@/hooks/use-loading";
import {
  getMessageList,
  messageRead,
  messageAllRead,
  messageClear,
  MessageData,
} from "@/api/message";

const list = ref<MessageData[]>([]);
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

const handleRead = async (item: MessageData) => {
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

<style scoped lang="scss">
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
