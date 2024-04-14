<template>
  <el-card class="proclamation content-card" :span="8">
    <template #header>
      <span>公告</span>
      <div class="card-header-extra">
        <el-button type="primary" link>查看更多</el-button>
      </div>
    </template>
    <div>
      <div v-for="(item, index) in dataList" :key="item.index" class="item">
        <el-tag :type="item.type" size="small">{{ item.label }}</el-tag>
        <el-text truncated class="item-content">{{ item.content }}</el-text>
      </div>
    </div>
  </el-card>
</template>

<script setup>
const dataList = [
  {
    type: "primary",
    label: "通知",
    content: "下月系统计划通知",
  },
  {
    type: "success",
    label: "消息",
    content: "您有一笔新订单需要处理，请及时登录系统查看并进行处理。",
  },
  {
    type: "primary",
    label: "通知",
    content:
      "为了提升用户体验，网站将于本周日进行系统维护，届时将暂时关闭部分功能，",
  },
  { type: "warning", label: "活动", content: "双11最新优惠活动" },
  { type: "success", label: "消息", content: "有客户发起退款申请,请及时处理" },
];
</script>

<style scoped lang="scss">
.proclamation {
  :deep(.el-tag) {
    flex-shrink: 0;
  }
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    &:not(:last-of-type) {
      margin-bottom: 10px;
    }
    .item-content {
      margin-left: 5px;
      font-size: 13px;
    }
  }
}
</style>
