<template>
  <el-dropdown
    :popper-options="popperOptions"
    popper-class="no-arrow-popper"
    trigger="hover"
    @command="command"
  >
    <div class="tab-close">
      <i class="icon">
        <Icon icon="ep:arrow-down" />
      </i>
    </div>

    <template #dropdown>
      <TabsMenu
        :currentRouteTagIndex="index"
        :index="index"
        :tagList="tagList"
      />
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { computed, defineEmits, PropType } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import { routeEqual } from "@/utils/util";
import TabsMenu from "@/layout/components/tabs-nav/tabs-menu.vue";
import { TabsNavProps } from "@/store/modules/tabs-nav/types.ts";
import type { OptionType } from "./types.ts";

const popperOptions = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 3],
      },
    },
  ],
};
const props = defineProps({
  tagList: {
    type: Array as PropType<TabsNavProps[]>,
    default: () => [],
  },
});
const currentRoute = useRoute();
const emits = defineEmits(["handleTagsOption"]);

const index = computed(() => {
  return props.tagList.findIndex((item) => {
    return routeEqual(item, currentRoute);
  });
});
const command = (type: OptionType) => {
  emits("handleTagsOption", type, currentRoute, currentRoute);
};
</script>

<style lang="scss" scoped>
.tab-close {
  width: 32px;
  line-height: 32px;
  background-color: var(--el-bg-color);
  border-radius: 2px;
  cursor: pointer;
  color: var(--el-text-color-primary);
  text-align: center;
  outline: none;
  .icon {
    vertical-align: -0.125rem;
  }
}
</style>
