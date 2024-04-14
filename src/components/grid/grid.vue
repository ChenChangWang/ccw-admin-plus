<template>
  <div :style="style" class="grid">
    <slot />
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, provide, watch, computed } from "vue";
import {
  gridContextKey,
  gridItemContextKey,
} from "@/components/grid/constants";
import useOrderedChildren from "@/hooks/use-ordered-children.js";
import { useResponsiveState } from "@/hooks/use-responsive-state";
import { isEmpty } from "@/utils/util";

const props = defineProps({
  /**
   * 每一行展示的列数
   */
  cols: {
    type: Number,
    default: 24,
  },
  /**
   * 行与行之间的间隔
   */
  rowGap: {
    type: Number,
    default: 0,
  },
  /**
   * 列与列之间的间隔
   */
  colGap: {
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
/*
       ["xl"]: { cols: 3, rowGap: 16, colGap: 16 },
        ["sm"]: { cols: 2, rowGap: 12, colGap: 12 },
        ["xs"]: { cols: 1, rowGap: 6, colGap: 6 },
        */
let gridItemContext = ref({});
const instance = getCurrentInstance();

// =========================== hook =======================
const {
  children: gridItems,
  addChild: registerGrid,
  removeChild: unregisterGrid,
} = useOrderedChildren(instance, "GridItem");
const responsiveState = useResponsiveState(props.responsive, {
  cols: props.cols,
  rowGap: props.rowGap,
  colGap: props.colGap,
});

provide(gridContextKey, {
  gridItems,
  registerGrid,
  unregisterGrid,
});
provide(gridItemContextKey, gridItemContext);

const style = computed(() => {
  const { cols, rowGap, colGap } = responsiveState.value;
  return {
    gridTemplateColumns: `repeat(${cols}, [c-start] 1fr [c-end])`,
    gap: `${rowGap}px ${colGap}px`,
  };
});

watch(
  [responsiveState.value, () => gridItems.value],
  () => {
    const { cols, rowGap, colGap } = responsiveState.value;
    if (isEmpty(gridItems.value)) {
      gridItemContext.value = {};
    } else {
      let countIndex = 0;
      gridItems.value.forEach((item, index) => {
        item.index = index;
        let { span, offset } = item;
        if (span > cols) {
          span = cols;
        }
        //表示当前单元格开始位数
        countIndex += 1 + offset;
        let cStart = countIndex % cols || cols;

        //表示当前已经溢出了  这种情况就要换行展示
        if (cStart + span - 1 > cols) {
          countIndex += cStart + span - 1 - cols;
        }
        cStart = countIndex % cols || cols;
        let rStart = Math.ceil(countIndex / cols);
        countIndex += span - 1;
        gridItemContext.value[index + ""] = {
          cStart,
          rStart,
          span,
        };
      });
    }
  },
  { immediate: false, deep: true, flush: "post" },
);
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
}
</style>
