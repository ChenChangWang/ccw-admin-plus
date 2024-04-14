<template>
  <div
    class="spin"
    :class="{ 'spin-fix': fix }"
    v-loading="true"
    v-bind="$attrs"
    :style="styles"
  ></div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  minHeight: {
    type: Number,
    default: 120,
  },
  fix: {
    //是否固定，需要父级有relative或absolute
    type: Boolean,
    default: false,
  },
});

const styles = computed(() => {
  if (props.fix) {
    return;
  }
  return { minHeight: props.minHeight + "px" };
});
</script>

<style scoped lang="scss">
.spin {
  &.spin-fix {
    position: absolute !important;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
  }
}
</style>
