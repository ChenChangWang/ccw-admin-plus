<template>
  <div class="settings-security">
    <List>
      <ListItem v-for="(item, index) in list" :key="index">
        <ListItemMeta :title="item.title" :description="item.desc" />
        <template #extra>
          <el-button type="primary" link>{{ item.btnText }}</el-button>
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { List, ListItem, ListItemMeta } from "@/components/list";

const list = [
  {
    title: "账号密码",
    desc: "绑定手机和邮箱，并设置密码，账号更安全",
    btnText: "修改",
  },
  {
    title: "密保问题",
    desc: "您暂未设置密保问题，密保问题可有效的保护账号安全",
    btnText: "设置",
  },
  {
    title: "安全手机",
    desc: "已绑定：158******40",
    btnText: "修改",
  },
  {
    title: "安全邮箱",
    desc: "您暂未设置安全邮箱，绑定邮箱可以找回密码等等",
    btnText: "修改",
  },
];
</script>

<style scoped lang="scss">
.settings-security {
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
