<template>
  <div class="grid-item" :style="style">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  onUnmounted,
  inject,
  reactive,
  getCurrentInstance,
  computed,
  watch,
  defineProps,
} from "vue";
import {
  gridContextKey,
  GridItemData,
  gridItemContextKey,
  GridProvider,
  GridItemProvider,
} from "@/components/grid/constants";
import { useResponsiveState } from "@/hooks/use-responsive-state";
import { isEmpty } from "@/utils/util";

defineOptions({
  name: "GridItem",
});

const props = defineProps({
  /**
   * 跨列的个数
   */
  span: {
    type: Number,
    default: 1,
  },
  /**
   * 左侧间隔的格数
   */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * 响应式布局对应的其它属性
   * 目前暂时支持常用的断点 xs、sm、md、lg、xl、xxl
   * 后续如果需要支持自定义断点 后续再说
   */
  responsive: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const responsiveState = useResponsiveState(props.responsive, {
  span: props.span,
  offset: props.offset,
});
const grid = inject(gridContextKey) as GridProvider;
const gridItemContext = inject(gridItemContextKey) as GridItemProvider;
const instance = getCurrentInstance();
const gridItem = reactive<GridItemData>({
  uid: instance?.uid!,
  index: null,
  span: responsiveState.value.span,
  offset: responsiveState.value.offset,
});

//span 和 offset更新时  更改gridItem然后在重新计算样式
watch(responsiveState.value, () => {
  const { span, offset } = responsiveState.value;
  gridItem.span = span;
  gridItem.offset = offset;
});

const style = computed(() => {
  let gridItemData = gridItemContext.value;

  if (!isEmpty(gridItemData) && gridItem.index != null) {
    const data = gridItemData[gridItem.index];
    if (data) {
      const { cStart, rStart, span } = data;
      return {
        gridColumn: `${cStart} / span ${span}`,
        gridRow: `${rStart} / span 1`,
      };
    }
  }
});

onMounted(() => {
  grid.registerGrid(gridItem);
});

onUnmounted(() => {
  grid.unregisterGrid(gridItem.uid!);
});
</script>

<style scoped lang="scss"></style>
