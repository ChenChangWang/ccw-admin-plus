<template>
  <div
    ref="navWrapRef"
    :class="['tabs-nav-wrap', { 'is-scrollable': !!scrollable }]"
  >
    <template v-if="scrollable">
      <span
        :class="['tabs-nav-prev', { 'is-disabled': !scrollable.prev }]"
        @click="scrollPrev"
      >
        <i class="icon">
          <Icon icon="ep:arrow-left" />
        </i>
      </span>
      <span
        :class="['tabs-nav-next', { 'is-disabled': !scrollable.next }]"
        @click="scrollNext"
      >
        <i class="icon">
          <Icon icon="ep:arrow-right" />
        </i>
      </span>
    </template>

    <div ref="navScrollRef" class="tabs-nav-scroll">
      <div ref="navRef" :style="navStyle" class="tabs-nav">
        <Draggable
          v-model="tagList"
          animation="300"
          class="tabs-nav-main"
          item-key="index"
        >
          <template #item="{ element: item, index }">
            <TabItem
              :key="item.name + index"
              :index="index"
              :isActive="isActive(item)"
              :itemData="item"
              :tagList="tagList"
              @handleClose="handleClose"
              @handleTagsOption="handleTagsOption"
              @toPage="toPage"
            >
            </TabItem>
          </template>
        </Draggable>
      </div>
    </div>
  </div>
  <div class="tabs-close-main">
    <TabClose :tagList="tagList" @handleTagsOption="handleTagsOption" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick, onUpdated } from "vue";
import { useTabsNavStore } from "@/store";
import { routeEqual } from "@/utils/util";
import TabItem from "./tab-item.vue";
import { useResize } from "@/hooks/use-resize";
import { RouteLocationNormalized, useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import TabClose from "./tab-close.vue";
import Draggable from "vuedraggable";
import bus from "@/utils/bus";
import { HOME_PATH } from "@/router/constants";
import { TabsNavProps } from "@/store/modules/tabs-nav/types.ts";
import type { OptionType, Scrollable } from "./types.ts";

const scrollable = ref<false | Scrollable>(false);
const navWrapRef = ref<HTMLDivElement>();
const navScrollRef = ref<HTMLDivElement>();
const navRef = ref<HTMLDivElement>();
const navOffset = ref(0);
const currentRoute = useRoute();
const router = useRouter();
const tabsNavStore = useTabsNavStore();

const isActive = (item: TabsNavProps) => {
  return routeEqual(item, currentRoute);
};

const tagList = computed({
  get() {
    return tabsNavStore.getTabList;
  },
  set(val) {
    tabsNavStore.setTagList(val);
  },
});

// =========================== tab相关处理 =======================
const toPage = (route: TabsNavProps) => {
  let { name, query, path } = route;
  router.push({
    name,
    query,
    path,
  });
};

const handleTagsOption = (
  type: OptionType,
  route: TabsNavProps,
  currentRoute: RouteLocationNormalized,
) => {
  const tagList = tabsNavStore.getTabList;
  let list = tagList;
  switch (type) {
    case "reload":
      bus.emit("reloadPage");
      break;
    case "current":
      handleClose(route, currentRoute);
      break;
    case "left":
    case "right":
      const dropdownIndex = tagList.findIndex((item) =>
        routeEqual(route, item),
      );
      const currentIndex = tagList.findIndex((item) =>
        routeEqual(currentRoute, item),
      );

      if (type === "left") {
        list = tagList.slice(dropdownIndex);
        if (currentIndex < dropdownIndex) {
          toPage(route);
        }
      } else {
        list = tagList.slice(0, dropdownIndex + 1);
        if (currentIndex > dropdownIndex) {
          toPage(route);
        }
      }
      break;
    case "others":
      list = tagList.filter(
        (item) => routeEqual(route, item) || item.path === HOME_PATH,
      );
      if (!routeEqual(currentRoute, route)) {
        toPage(route);
      }
      break;
    case "all": // 关闭所有，除了首页
      list = tagList.filter((item) => item.path === HOME_PATH);
      toPage(list[0]);
      break;
  }
  tabsNavStore.setTagList(list);
};

const handleClose = (
  route: TabsNavProps,
  currentRoute: RouteLocationNormalized,
) => {
  const tagList = tabsNavStore.getTabList;
  const list = tagList.filter((item) => !routeEqual(item, route));
  if (routeEqual(currentRoute, route)) {
    const nextRoute = tabsNavStore.getNextRoute(route);
    toPage(nextRoute);
  }
  tabsNavStore.setTagList(list);
};

// =========================== nav滚动相关 该代码参考于于el-tabs组件的 =======================

const navStyle = computed(() => {
  return {
    transform: `translateX(-${navOffset.value}px)`,
  };
});

const scrollToActiveTab = async () => {
  const nav = navRef.value;
  if (!scrollable.value || !navWrapRef.value || !navScrollRef.value || !nav)
    return;

  await nextTick();

  const activeTab = navWrapRef.value.querySelector(".is-active");
  if (!activeTab) return;

  const navScroll = navScrollRef.value;
  const activeTabBounding = activeTab.getBoundingClientRect();
  const navScrollBounding = navScroll.getBoundingClientRect();
  const maxOffset = nav.offsetWidth - navScrollBounding.width;
  const currentOffset = navOffset.value;
  let newOffset = currentOffset;

  if (activeTabBounding.left < navScrollBounding.left) {
    newOffset =
      currentOffset - (navScrollBounding.left - activeTabBounding.left);
  }
  if (activeTabBounding.right > navScrollBounding.right) {
    newOffset =
      currentOffset + activeTabBounding.right - navScrollBounding.right;
  }
  newOffset = Math.max(newOffset, 0);
  navOffset.value = Math.min(newOffset, maxOffset);
};

const scrollPrev = () => {
  if (!navScrollRef.value) return;

  const containerWidth = navScrollRef.value.offsetWidth;
  const currentOffset = navOffset.value;

  if (!currentOffset) return;

  const newOffset =
    currentOffset > containerWidth ? currentOffset - containerWidth : 0;

  navOffset.value = newOffset;
};

const scrollNext = () => {
  if (!navScrollRef.value || !navRef.value) return;

  const navWidth = navRef.value.offsetWidth;
  const containerWidth = navScrollRef.value.offsetWidth;
  const currentOffset = navOffset.value;

  if (navWidth - currentOffset <= containerWidth) return;

  const newOffset =
    navWidth - currentOffset > containerWidth * 2
      ? currentOffset + containerWidth
      : navWidth - containerWidth;

  navOffset.value = newOffset;
};

const update = () => {
  if (!navRef.value || !navScrollRef.value) return;
  //标签是否撑开
  const navWidth = navRef.value.offsetWidth;
  const containerWidth = navScrollRef.value.offsetWidth;
  const currentOffset = navOffset.value;

  if (containerWidth < navWidth) {
    scrollable.value = scrollable.value || {};
    scrollable.value.prev = currentOffset;
    scrollable.value.next = currentOffset + containerWidth < navWidth;
    if (navWidth - currentOffset < containerWidth) {
      navOffset.value = navWidth - containerWidth;
    }
  } else {
    scrollable.value = false;
    if (currentOffset > 0) {
      navOffset.value = 0;
    }
  }
};

watch(currentRoute, async () => {
  await nextTick();
  scrollToActiveTab();
});

onMounted(() => {
  setTimeout(() => scrollToActiveTab(), 0);
});

useResize(navWrapRef, update);

onUpdated(() => {
  update();
});

watch(
  tagList,
  () => {
    update();
  },
  { flush: "post", deep: true },
);
</script>

<style lang="scss" scoped>
.tabs-nav-wrap {
  overflow: hidden;
  margin-bottom: -1px;
  position: relative;
  flex: 1;
  &.is-scrollable {
    padding: 0 32px;
    box-sizing: border-box;
  }
  .tabs-nav-prev,
  .tabs-nav-next {
    position: absolute;
    cursor: pointer;
    line-height: 32px;
    width: 32px;
    color: var(--el-text-color-primary);
    text-align: center;
    .icon {
      vertical-align: -0.125rem;
    }
    &.is-disabled {
      /*cursor: no-drop;*/
    }
  }
  .tabs-nav-prev {
    left: 0;
  }
  .tabs-nav-next {
    right: 0;
  }
  .tabs-nav-scroll {
    overflow: hidden;
    .tabs-nav {
      display: flex;
      white-space: nowrap;
      position: relative;
      transition: transform 0.3s;
      float: left;
      z-index: 2;
      .tabs-nav-main {
        > * {
          margin-right: 6px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
.tabs-close-main {
  flex-shrink: 0;
}
</style>
<style lang="scss">
.tag-close-popper {
  .el-dropdown-menu {
    .el-dropdown-menu__item {
      letter-spacing: 1px;
      .icon {
        margin-right: 7px;
      }
    }
  }
}
</style>
