<template>
  <div class="settings-notification">
    <List>
      <ListItem v-for="(item, index) in list" :key="index">
        <ListItemMeta :title="item.title" :description="item.desc" />

        <template #extra>
          <el-switch v-model="switchData[item.key]" />
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { List, ListItem, ListItemMeta } from "@/components/list";

const list = [
  {
    title: "账号密码",
    desc: "其他用户的消息将以站内信的形式通知",
    key: "use",
  },
  {
    title: "系统消息",
    desc: "系统消息将以站内信的形式通知",
    key: "system",
  },
  {
    title: "待办任务",
    desc: "待办任务将以站内信的形式通知",
    key: "todo",
  },
];

const switchData = reactive({ use: true, system: true, todo: true });
</script>

<style scoped lang="scss">
.settings-notification {
  :deep(.list) {
    .list-item {
      padding: 12px;

      .list-item-meta {
        .list-item-meta-title {
          font-weight: 700;
        }
        .list-item-meta-description {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
