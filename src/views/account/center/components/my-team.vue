<template>
  <div class="my-team">
    <div class="my-team-title">我的团队</div>
    <div v-for="item in list" :key="item.id" class="item">
      <el-avatar class="item-avatar" :src="item.avatar" :size="32" />
      <div class="item-content">
        <div class="item-title">
          {{ item.title }}
        </div>
        <div class="item-desc">共 {{ item.peopleNumber }}人</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAssetsImage } from "@/utils/util";
const list = [
  {
    title: "程序员日常团队",
    avatar: getAssetsImage("bg1.jpg"),
    peopleNumber: 12,
  },
  {
    title: "高科技团队",
    avatar: getAssetsImage("bg2.jpg"),
    peopleNumber: 9,
  },
  {
    title: "召唤师峡谷团队 ",
    avatar: getAssetsImage("bg3.jpg"),
    peopleNumber: 32,
  },
  {
    title: "都在搬砖团队 ",
    avatar: getAssetsImage("bg4.jpg"),
    peopleNumber: 8,
  },
];
</script>

<style scoped lang="scss">
.my-team {
  .my-team-title {
    margin-bottom: 10px;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 10px 0px;
    border-bottom: 1px solid var(--el-border-color);
    &:last-child {
      border: none;
    }
    .item-avatar {
      flex-shrink: 0;
    }
    .item-content {
      margin-left: 10px;
      .item-title {
        font-size: 14px;
        line-height: 22px;
        color: var(--el-text-color-primary);
      }
      .item-desc {
        margin-top: 3px;
        line-height: 20px;
        font-size: 13px;
      }
    }
  }
}
</style>
