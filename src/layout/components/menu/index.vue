<template>
  <el-menu
    :background-color="effect === 'dark' ? '#141414' : ''"
    :class="['base-menu']"
    :collapse-transition="false"
    :default-active="activeName"
    :default-openeds="openedNames"
    :mode="mode"
    :popper-effect="effect"
    :text-color="effect === 'dark' ? '#E5EAF3' : ''"
    :unique-opened="layoutStore.menuUniqueOpened"
    ellipsis
  >
    <SubMenu v-for="child in menuList" :key="child.name" :data="child" />
  </el-menu>
</template>
<script setup>
import { provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLayoutStore } from "@/store";
import SubMenu from "./sub-menu.vue";

const props = defineProps({
  effect: { type: String, default: "light" },
  menuList: { type: Array, default: () => [] },
  beforeItemClick: Function,
  matched: Array,
  route: Object,
  mode: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "vertical",
  },
});
const router = useRouter();
const route = useRoute();

const activeName = ref(route.name);
const openedNames = ref([]);
const layoutStore = useLayoutStore();

const updateActive = () => {
  const matched = props.matched || route.matched;
  const currentRoute = props.route || route;

  if (props.mode === "vertical") {
    openedNames.value = matched
      .map((item) => item.name)
      .filter((item) => item !== currentRoute.name);
  }
  activeName.value = currentRoute.name;

  //TODO 后续优化 如果当前激活菜单的节点被隐藏掉 那么手动滚动到中间
};

const isLink = (data) => {
  return data.meta?.link;
};

const onItemClick = (data, event) => {
  if (props.beforeItemClick) {
    const beforeData = props.beforeItemClick(data, isLink(data), event);
    if (beforeData === false) {
      return;
    }
    if (beforeData && typeof beforeData === "object") {
      data = beforeData;
    }
  }
  const { name, query, path, meta } = data;

  if (isLink(data)) {
    window.open(meta?.link);
    event.stopPropagation();
    event.preventDefault();
    return;
  }
  if (route.name === name) {
    return;
  }
  router.push({
    name: name,
    query: query,
  });
};

watch(
  route,
  () => {
    updateActive();
  },
  { immediate: true },
);

provide("menu", { onItemClick });
</script>

<style lang="scss">
.sub-menu,
.menu-item {
  .icon {
    font-size: 16px;
    margin-right: 10px;
  }
}
.base-menu {
  height: 100%;
  width: 100%;
  border-right: none;

  &.el-menu--collapse,
  .el-menu--collapse {
    .el-sub-menu__title {
      justify-content: center;
    }
    .icon {
      margin-right: 0;
    }
  }
}
.sub-menu-popper {
  border-radius: 5px;
  .el-menu {
    border-radius: 5px;
    .el-menu-item,
    .el-sub-menu__title {
      line-height: 36px;
      height: 36px;
      padding: 0 16px;
      margin: 2px 0;
    }
  }
}
</style>
