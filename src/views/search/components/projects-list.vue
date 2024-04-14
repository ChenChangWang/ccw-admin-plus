<template>
  <div class="projects-list">
    <Spin v-if="loading" :min-height="200" />
    <el-row :gutter="14">
      <el-col v-bind="attarSpan" v-for="item in dataList" :key="item.id">
        <el-card shadow="hover" class="item">
          <div class="img-container">
            <img class="item-cover" :src="item.cover" />
          </div>
          <div class="item-content">
            <div class="item-title">{{ item.title }}</div>
            <el-text class="item-description" line-clamp="2">
              {{ item.description }}
            </el-text>
            <div class="item-extra">
              <div class="item-date">{{ item.updateDate }}</div>
              <AvatarGroup class="item-avatar-group">
                <el-avatar
                  v-for="member in item.members"
                  :key="member.name"
                  :src="member.src"
                  class="avatar"
                  :size="22"
                />
              </AvatarGroup>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import AvatarGroup from "@/components/avatar-group/index.tsx";
import Spin from "@/components/spin/index.vue";
import type { PropType } from "vue";
import type { ProjectData } from "@/api/search.ts";

defineProps({
  loading: Boolean,
  dataList: {
    type: Array as PropType<ProjectData[]>,
    required: true,
  },
  attarSpan: Object,
});
</script>

<style scoped lang="scss">
.projects-list {
  .item {
    cursor: pointer;
    margin-bottom: 14px;
    :deep(.el-card__body) {
      padding: 0;
      .img-container {
        position: relative;
        width: 100%;
        padding-bottom: 60%;
        .item-cover {
          position: absolute;
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .item-content {
        padding: 12px 10px 10px 10px;
        .item-title {
          font-weight: 600;
        }
        .item-description {
          margin-top: 3px;
          font-size: 13px;
          height: 44px;
          line-height: 22px;
        }
        .item-extra {
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item-date {
            font-size: 13px;
            color: var(--el-text-color-regular);
          }
        }
      }
    }
  }
}
</style>
