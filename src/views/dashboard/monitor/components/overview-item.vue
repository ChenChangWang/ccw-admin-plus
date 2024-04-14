<template>
  <el-card class="overview-item content-card">
    <el-avatar class="overview-item-avatar">
      <slot name="avatarIcon" />
    </el-avatar>

    <span class="overview-item-digit">
      <slot />
    </span>

    <div class="overview-item-desc">
      {{ desc }}
    </div>

    <div class="overview-item-extra">
      <slot name="extra" />
    </div>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  desc: String,
});
</script>

<style scoped lang="scss">
.overview-item {
  :deep(.el-card__body) {
    padding: 16px 12px 12px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .overview-item-avatar {
      font-size: 14px;
      width: 34px;
      height: 34px;
    }
    .overview-item-digit {
      font-size: 26px;
      font-weight: 700;
      margin: 8px 0 6px 0;
    }
    .overview-item-desc {
      color: var(--el-text-color-secondary);
      font-size: 12px;
    }
    .overview-item-extra {
      margin-top: 10px;
      height: 28px;
    }
  }
}
</style>
