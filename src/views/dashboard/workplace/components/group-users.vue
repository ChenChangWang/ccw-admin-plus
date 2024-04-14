<template>
  <el-card class="group-users content-card" :span="8">
    <template #header>
      <span>小组成员</span>
    </template>
    <List class="list" :split="false">
      <ListItem v-for="item in dataList" :key="item.name">
        <ListItemMeta :avatar="item.avatar" :avatar-size="30">
          <template #title>
            <span class="name">{{ item.name }}</span>
          </template>
        </ListItemMeta>

        <template #extra>
          <el-tag v-if="item.status === 1" type="success">在线</el-tag>
          <el-tag v-else type="danger">离线</el-tag>
        </template>
      </ListItem>
    </List>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { List, ListItem, ListItemMeta } from "@/components/list";

const dataList = [
  {
    name: "张三",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    status: 1,
  },
  {
    name: "王小明",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    status: 0,
  },
  {
    name: "开源大侠",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    status: 1,
  },
  {
    name: "吴十一",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    status: 1,
  },
  {
    name: "王五",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    status: 0,
  },
];
</script>

<style scoped lang="scss">
.group-users {
  .name {
    font-weight: 600;
  }
  :deep(.list) {
    .list-item {
      padding: 0;
      &:not(:last-of-type) {
        margin-bottom: 16px;
      }
      .list-item-meta {
        align-items: center;
      }
    }
  }
}
</style>
