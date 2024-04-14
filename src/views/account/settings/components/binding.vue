<template>
  <div class="settings-binding">
    <List>
      <ListItem v-for="(item, index) in list" :key="index">
        <ListItemMeta
          :title="item.title"
          :description="item.desc"
          :avatar="item.avatar"
          :avatarSize="24"
        />
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
import { getAssetsImage } from "@/utils/util";
const list = [
  {
    title: "绑定微信",
    avatar: getAssetsImage("weChat.png"),
    desc: "当前未绑定微信账号",
    btnText: "绑定",
  },
  {
    title: "支付宝",
    avatar: getAssetsImage("alipay.png"),
    desc: "当前未绑定支付宝账号",
    btnText: "绑定",
  },
  {
    title: "绑定QQ",
    avatar: getAssetsImage("qq.png"),
    desc: "当前未绑定QQ账号",
    btnText: "绑定",
  },
];
</script>

<style scoped lang="scss">
.settings-binding {
  :deep(.list) {
    .list-item {
      padding: 12px;

      .list-item-meta {
        .list-item-meta-avatar {
          margin-right: 12px;
        }
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
