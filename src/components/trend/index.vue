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

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
const props = defineProps({
  flag: {
    type:String,
    validator(value) {
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
