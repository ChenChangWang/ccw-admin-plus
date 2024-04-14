<template>
  <div class="articles-list">
    <el-empty
      v-if="finished && (!dataList || !dataList.length)"
      description="暂无数据"
    />
    <template v-else>
      <List
        itemLayout="vertical"
        :loading="loading && (!dataList || !dataList.length)"
      >
        <listItem v-for="item in dataList" :key="item.id">
          <ListItemMeta :title="item.title">
            <template #description>
              <div class="tags">
                <el-tag type="info">Element Plus</el-tag>
                <el-tag type="info">Sass</el-tag>
                <el-tag type="info">Less</el-tag>
              </div>
            </template>
          </ListItemMeta>

          <el-text line-clamp="3" class="item-content">
            {{ item.content }}
          </el-text>

          <div class="item-release">
            <el-avatar :src="item.logo" :size="20"></el-avatar>
            <el-link type="primary">{{ item.owner }}</el-link>
            &nbsp;发布在&nbsp;
            <el-link type="primary" :href="item.href">{{ item.href }}</el-link>
            <span class="date">{{ item.createDate }}</span>
          </div>

          <template #action>
            <li>
              <span class="icon"><Icon icon="solar:star-linear" /></span>
              {{ item.star }}
            </li>
            <li>
              <span class="icon"><Icon icon="uiw:like-o" /></span>
              {{ item.like }}
            </li>
            <li>
              <span class="icon">
                <Icon icon="ant-design:message-outlined" />
              </span>
              {{ item.message }}
            </li>
          </template>
        </listItem>

        <template #load>
          <Spin> </Spin>
        </template>

        <template #footer v-if="isFooter">
          <div v-if="finished" class="finished-text">没有更多数据了</div>
          <el-button v-else :loading="loading" @click="loadMore">
            {{ loading ? "加载中..." : "加载更多" }}
          </el-button>
        </template>
      </List>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { List, ListItem, ListItemMeta } from "@/components/list";
import Spin from "@/components/spin/index.vue";
import type { ArticleData } from "@/api/search.ts";
import type { PropType } from "vue";

defineProps({
  finished: Boolean,
  loading: Boolean,
  isFooter: {
    type: Boolean,
    default: false,
  },
  dataList: {
    type: Array as PropType<ArticleData[]>,
    required: true,
  },
});

const emits = defineEmits(["loadMore"]);

const loadMore = () => {
  emits("loadMore");
};
</script>

<style scoped lang="scss">
.articles-list {
  :deep(.list) {
    .list-footer {
      margin-top: 20px;
      text-align: center;
      border-top: none;
      padding: 0;
      .finished-text {
        line-height: 26px;
        color: var(--el-text-color-secondary);
      }
    }
    .list-item .list-item-action > li .icon {
      margin-right: 8px;
      vertical-align: middle;
    }
  }
  .tags {
    :deep(.el-tag) {
      margin-right: 8px;
      background-color: var(--el-color-info-light-9);
      color: var(--el-text-color-regular);
    }
  }

  .item-content {
    max-width: 720px;
    line-height: 22px;
    margin-bottom: 16px;
    color: var(--el-text-color-primary);
  }

  .item-release {
    line-height: 22px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    :deep(.el-avatar) {
      margin-right: 5px;
    }
    .date {
      color: var(--el-text-color-secondary);
      margin-left: 16px;
    }
  }
}
</style>
