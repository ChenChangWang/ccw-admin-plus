<template>
  <div class="trend">
    <slot />
    <Icon
      v-if="flag === 'up'"
      class="text-danger icon"
      icon="ant-design:caret-up-filled"
    />
    <Icon
      v-else
      class="text-success icon"
      icon="ant-design:caret-down-filled"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { Icon } from "@iconify/vue";

defineProps({
  flag: {
    type: String as PropType<"up" | "down">,
    validator(value: string): boolean {
      return ["up", "down"].includes(value);
    },
  },
});
</script>

<style scoped lang="scss">
.trend {
  display: inline-flex;
  align-items: center;

  .icon {
    margin-left: 3px;
  }
}
</style>
