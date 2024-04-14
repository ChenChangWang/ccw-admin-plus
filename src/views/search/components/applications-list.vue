<template>
  <div class="applications-list">
    <Spin v-if="loading" :min-height="200" />
    <el-row :gutter="14">
      <el-col v-bind="attarSpan" v-for="item in dataList" :key="item.id">
        <el-card shadow="hover" class="item">
          <div class="item-header">
            <el-avatar :src="item.logo" :size="26" class="avatar" />
            <div class="item-title">{{ item.title }}</div>
          </div>
          <div class="item-content">
            <div class="item-info">
              <div class="item-info-label">活跃用户</div>
              <p>{{ formatWan(item.activeUser) }}</p>
            </div>
            <div class="item-info">
              <div class="item-info-label">新增用户</div>
              <p>{{ numeral(item.newUser).format("0,0") }}</p>
            </div>
          </div>
          <template #footer>
            <ul class="actions">
              <li>
                <el-tooltip content="下载" placement="top">
                  <span class="title-tip-icon">
                    <Icon icon="carbon:download" />
                  </span>
                </el-tooltip>
              </li>
              <li>
                <el-tooltip content="编辑" placement="top">
                  <span class="title-tip-icon">
                    <Icon icon="iconoir:edit" />
                  </span>
                </el-tooltip>
              </li>
              <li>
                <el-tooltip content="分享" placement="top">
                  <span class="title-tip-icon">
                    <Icon icon="clarity:share-line" />
                  </span>
                </el-tooltip>
              </li>
              <li>
                <el-dropdown class="dropdown-options">
                  <span class="title-tip-icon">
                    <Icon icon="ri:more-line" />
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>操作一</el-dropdown-item>
                      <el-dropdown-item>操作二</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </li>
            </ul>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import numeral from "numeral";
import { Icon } from "@iconify/vue";
import Spin from "@/components/spin/index.vue";
const props = defineProps({
  loading: Boolean,
  dataList: {
    type: Array,
    required: true,
  },
  attarSpan: Object,
});
const formatWan = (val) => {
  if (!val || Number.isNaN(val)) {
    return "";
  }
  if (val > 10000) {
    return Math.floor(val / 10000) + "万";
  }
  return val;
};
</script>

<style scoped lang="scss">
.applications-list {
  .item {
    margin-bottom: 14px;
    :deep(.el-card__body) {
    }
    .item-header {
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 14px;
      }
      .item-title {
        font-weight: 600;
      }
    }
    .item-content {
      margin: 10px 0 0 40px;
      .item-info {
        display: inline-block;
        width: 50%;
        .item-info-label {
          font-size: 12px;
          color: var(--el-text-color-regular);
          margin-bottom: 8px;
        }
        > p {
          margin: 0;
          line-height: 32px;
          font-size: 22px;
        }
      }
    }
    :deep(.el-card__footer) {
      padding: 12px 20px;
    }
    .actions {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      li {
        flex-basis: 25%;
        text-align: center;
        .title-tip-icon {
          font-size: 14px;
          cursor: pointer;
        }
        &:not(:last-child) {
          border-right: 1px solid var(--el-border-color-light);
        }
      }
    }
  }
}
</style>
