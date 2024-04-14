<template>
  <el-dropdown
    popper-class="no-arrow-popper message-popper"
    :popper-options="{
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 3],
          },
        },
      ],
    }"
  >
    <div class="action-message">
      <el-badge :value="totalUnRead" :hidden="totalUnRead <= 0">
        <span class="icon">
          <Icon icon="mingcute:notification-line" />
        </span>
      </el-badge>
    </div>

    <template #dropdown>
      <el-tabs v-model="currentTab" class="message-tabs">
        <el-tab-pane name="message">
          <template #label>
            <span>消息</span>
            <span v-if="messageUnRead > 0" class="message-table-num">
              ({{ messageUnRead }})
            </span>
          </template>
          <MessageList ref="messageRef" />
        </el-tab-pane>

        <el-tab-pane name="notice">
          <template #label>
            <span>通知 </span>
            <span v-if="noticeUnRead > 0" class="message-table-num">
              ({{ noticeUnRead }})
            </span>
          </template>
          <NoticeList ref="noticeRef" />
        </el-tab-pane>

        <el-tab-pane name="todo">
          <template #label>
            <span>待办 </span>
            <span v-if="todoUnRead > 0" class="message-table-num">
              ({{ todoUnRead }})
            </span>
          </template>
          <TodoList ref="todoRef" />
        </el-tab-pane>
      </el-tabs>
      <div class="message-footer">
        <el-link :underline="false" @click="allRead">全部已读</el-link>
        <el-link :underline="false" @click="clear">清空</el-link>
        <el-link :underline="false">查看更多</el-link>
      </div>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import MessageList from "./message-list.vue";
import NoticeList from "./notice-list.vue";
import TodoList from "./todo-list.vue";

type Tab = "message" | "notice" | "todo";
const currentTab = ref<Tab>("message");
const messageRef = ref<InstanceType<typeof MessageList>>();
const noticeRef = ref<InstanceType<typeof NoticeList>>();
const todoRef = ref<InstanceType<typeof TodoList>>();

const messageUnRead = computed(() => {
  return messageRef.value?.unReadTotal;
});
const noticeUnRead = computed(() => {
  return noticeRef.value?.unReadTotal;
});
const todoUnRead = computed(() => {
  return todoRef.value?.unReadTotal;
});
const totalUnRead = computed(() => {
  return (
    (messageUnRead.value || 0) +
    (noticeUnRead.value || 0) +
    (todoUnRead.value || 0)
  );
});

const allRead = () => {
  switch (currentTab.value) {
    case "message":
      messageRef.value.allRead();
      break;
    case "notice":
      noticeRef.value.allRead();
      break;
    case "todo":
      todoRef.value.allRead();
      break;
  }
};
const clear = () => {
  switch (currentTab.value) {
    case "message":
      messageRef.value.clear();
      break;
    case "notice":
      noticeRef.value.clear();
      break;
    case "todo":
      todoRef.value.clear();
      break;
  }
};
</script>

<style scoped lang="scss">
.message-tabs {
  .message-table-num {
    margin-left: 3px;
  }
  :deep(.el-tabs__header) {
    margin-bottom: 8px;
    .el-tabs__nav-scroll {
      text-align: center;
      .el-tabs__nav {
        display: inline-flex;
        float: none;
      }
    }
  }
}
.message-footer {
  display: flex;
  align-items: center;
  border-top: 1px solid var(--el-border-color);
  :deep(.el-link) {
    flex: 1;
    text-align: center;
    padding: 12px 0;
    border-right: 1px solid var(--el-border-color);
    &:last-child {
      border: 0;
    }
  }
}
</style>
<style lang="scss">
.message-popper {
  width: 300px;
}
</style>
