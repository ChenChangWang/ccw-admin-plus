<template>
  <el-dropdown
    trigger="click"
    popper-class="no-arrow-popper icon-selector-popper"
    :popper-options="popperOptions"
    :disabled="inputDisabled"
    ref="dropdownRef"
  >
    <el-select
      v-model="icon"
      :placeholder="placeholder"
      clearable
      popper-class="none-popper"
      pull
      :disabled="inputDisabled"
    >
    </el-select>

    <template #dropdown>
      <div class="select-drop">
        <el-input
          class="select-search"
          :disabled="inputDisabled"
          v-model="query"
          placeholder="搜索..."
        />

        <div class="select-list">
          <div
            v-for="iconStr in list"
            :key="iconStr"
            class="icon-item"
            @click="onSelect(iconStr)"
            :title="iconStr"
          >
            <Icon :icon="iconStr" width="28" height="28" />
          </div>
        </div>
        <div v-if="!list || !list.length" class="select-empty">暂无数据</div>
      </div>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { queryIconList, collectionIconList } from "@/api/system";
import { Icon } from "@iconify/vue";
import axios from "axios";
import { useFormDisabled } from "element-plus";

const inputDisabled = useFormDisabled();
const popperOptions = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 7],
      },
    },
  ],
};
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "请选择图标标识",
  },
});

const query = ref("");
const list = ref([]);
const dropdownRef = ref();

const mode = defineModel();
const icon = computed({
  get: () => mode.value,
  set: (val) => {
    mode.value = val;
  },
});

let source = null;
watch(query, (val) => {
  fetchIconList();
});
const fetchIconList = async (item) => {
  try {
    if (source) {
      source.cancel("取消请求查询");
    }
    source = axios.CancelToken.source();
    if (query.value) {
      const { data } = await queryIconList({ query: query.value }, source);
      list.value = data.icons;
    } else {
      const { data } = await collectionIconList("ep", source);
      list.value = data.uncategorized.map((s) => data.prefix + "-" + s);
    }
  } catch (err) {}
};
fetchIconList();

const onSelect = (iconStr) => {
  icon.value = iconStr;
  dropdownRef.value.handleClose();
};
</script>

<style scoped lang="scss">
.select-drop {
  padding: 5px;

  .select-search {
    margin: 3px 0;
    padding: 2px 3px;
  }

  .select-list {
    max-height: 200px;
    overflow: auto;

    .icon-item {
      display: inline-block;
      cursor: pointer;
      text-align: center;
      padding: 4px;
      border-radius: 3px;
      color: var(--el-text-color-regular);

      &:hover {
        background-color: var(--el-bg-color-page);
      }
    }
  }

  .select-empty {
    padding: 10px 0;
    margin: 0;
    text-align: center;
    color: var(--el-text-color-secondary);
    font-size: 14px;
  }
}
</style>
<style lang="scss">
.icon-selector-popper {
  width: 424px;
}

.none-popper {
  display: none;
}
</style>
