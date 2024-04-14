<template>
  <div class="grid" :style="style">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  getCurrentInstance,
  provide,
  watch,
  computed,
  PropType,
  ComponentInternalInstance,
  Ref,
} from "vue";
import {
  gridContextKey,
  GridItemContext,
  gridItemContextKey,
  GridItemData,
  GridItemProvider,
  GridProvider,
} from "@/components/grid/constants";
import useOrderedChildren from "@/hooks/use-ordered-children";
import { useResponsiveState } from "@/hooks/use-responsive-state";
import type { BreakPointResponsiveState } from "@/hooks/use-responsive-state";

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
    type: Object as PropType<BreakPointResponsiveState>,
    default: () => {
      return {};
    },
  },
});
let gridItemContext = ref<GridItemContext>({});
const instance: ComponentInternalInstance | null = getCurrentInstance();

// =========================== hook =======================
const {
  children: gridItems,
  addChild: registerGrid,
  removeChild: unregisterGrid,
} = useOrderedChildren<GridItemData>(instance!, "GridItem");
const responsiveState = useResponsiveState(props.responsive, {
  cols: props.cols,
  rowGap: props.rowGap,
  colGap: props.colGap,
});

provide<GridProvider>(gridContextKey, {
  gridItems,
  registerGrid,
  unregisterGrid,
});

provide<GridItemProvider>(gridItemContextKey, gridItemContext);

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

<style scoped lang="scss">
.grid {
  display: grid;
}
</style>
