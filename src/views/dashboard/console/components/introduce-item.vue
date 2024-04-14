<template>
  <el-card class="introduce-item content-card">
    <template #header>
      <span>{{ props.title }}</span>
      <el-tooltip effect="dark" content="指标说明" placement="top">
        <span class="title-tip-icon">
          <Icon icon="ant-design:info-circle-outlined" />
        </span>
      </el-tooltip>
    </template>

    <span class="digit">{{ props.count }}</span>

    <div class="introduce-content">
      <slot />
    </div>

    <el-divider class="divider" />

    <el-row class="summary-footer">
      <el-col :span="12">{{ props.footerLabel }}</el-col>
      <el-col :span="12" class="text-right">{{ props.footerValue }}</el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: String,
  count: [String, Number],
  footerLabel: String,
  footerValue: String,
});
</script>

<style scoped lang="scss">
.introduce-item {
  overflow: initial;
  :deep(.el-card__body) {
    padding: 12px 14px;
    .digit {
      font-size: 28px;
    }
    .introduce-content {
      height: 46px;
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-items: end;
    }

    .divider {
      margin: 12px 0;
    }
    .summary-footer {
      color: var(--el-text-color-regular);
    }
  }
  .title-tip-icon {
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
