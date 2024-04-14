<template>
  <el-card class="content-card result-success">
    <el-result
      class="result"
      icon="success"
      title="提交成功"
      sub-title="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，灰色区域可以显示一些补充的信息。"
    >
      <template #extra>
        <el-button type="primary">返回列表</el-button>
        <el-button>查看项目</el-button>
        <el-button>打印</el-button>
      </template>
    </el-result>
    <div class="desc">已提交申请，等待审核。</div>
  </el-card>
</template>

<script lang="ts" setup>

defineOptions({
  name: "Success", //不命名组件，keep-alive的include不属性生效
});
</script>

<style scoped lang="scss">
.result-success {
  .result {
  }
  .desc {
    padding: 24px 32px;
    background-color: var(--el-fill-color-light);
    text-align: left;
    border-radius: 4px;
    color: var(--el-text-color-regular);
    margin-bottom: 16px;
  }
}
</style>
