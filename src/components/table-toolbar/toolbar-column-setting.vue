<template>
  <div class="toolbar-column-setting">
    <el-popover
      placement="bottom"
      popper-class="columns-setting-popover"
      :width="200"
      :show-arrow="false"
      trigger="click"
    >
      <div class="column-setting">
        <div class="column-setting-title">
          <span class="label">列展示</span>
          <el-button type="primary" link @click="reset">重置</el-button>
        </div>
        <el-divider />
        <el-scrollbar class="column-setting-content" max-height="310px">
          <Draggable
            v-model="draggableList"
            handle=".mover"
            item-key="prop"
            animation="300"
          >
            <template #item="{ element: item, index }">
              <div class="column-setting-item" v-if="item.type !== 'selection'">
                <div class="column-handle">
                  <i class="icon mover">
                    <Icon icon="ant-design:drag-outlined" />
                  </i>
                  <el-checkbox
                    v-model="item.checked"
                    :name="item.prop"
                    @change="checkChange(item)"
                  >
                  </el-checkbox>
                  <el-text line-clamp="1"> {{ item.label }} </el-text>
                </div>
                <div class="column-fixed">
                  <el-tooltip placement="top" content="固定在左侧">
                    <i
                      class="icon"
                      :class="{ active: item.fixed === 'left' }"
                      @click="handleFixed(item, 'left')"
                    >
                      <Icon icon="ant-design:vertical-right-outlined" />
                    </i>
                  </el-tooltip>
                  <el-tooltip placement="top" content="固定在右侧">
                    <i
                      class="icon"
                      :class="{ active: item.fixed === 'right' }"
                      @click="handleFixed(item, 'right')"
                    >
                      <Icon icon="ant-design:vertical-left-outlined" />
                    </i>
                  </el-tooltip>
                </div>
              </div>
            </template>
          </Draggable>
        </el-scrollbar>
      </div>
      <template #reference>
        <slot />
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, defineModel, computed, watch } from "vue";
import { Icon } from "@iconify/vue";
import Draggable from "vuedraggable";
import { isEmpty } from "@/utils/util";
const mode = defineModel("columns");

const setList = ref([]);
let setSort = {};
let initValue = [];
let initSort = {};

const draggableList = computed({
  get() {
    return setList.value;
  },
  set(val) {
    setList.value = val;
    //更新setSort的排序值
    let tmpSorts = Object.values(setSort).sort((a, b) => a - b);
    for (let i = 0; i < setList.value.length; i++) {
      const item = setList.value[i];
      const key = getSortKey(item);
      setSort[key] = tmpSorts[i];
    }
    handleSort();
  },
});

const cloneColumns = (list) => {
  return list.map((d) => ({ ...d }));
};

const getSortKey = (item) => {
  return item.prop || item.type;
};

const isSet = (item) => {
  return !isEmpty(item.prop) && item.type !== "selection";
};

const init = () => {
  initValue = cloneColumns(mode.value);
  mode.value.forEach((item, index) => {
    const sortKey = getSortKey(item);
    initSort[sortKey] = index;
    if (isSet(item)) {
      setSort[sortKey] = index;
    }
  });
};

init();

watch(
  mode,
  () => {
    setList.value = [];
    mode.value.forEach((item) => {
      const { hide, prop, label, type, fixed } = item;
      if (isSet(item)) {
        setList.value.push({
          type,
          prop,
          label,
          fixed,
          checked: hide === true ? false : true,
        });
      }
    });
  },
  { immediate: true },
);

// =========================== 处理 =======================

const handleSort = () => {
  mode.value.sort((a, b) => {
    let aKey = getSortKey(a);
    let bKey = getSortKey(b);
    return (
      (setSort[aKey] || initSort[aKey]) - (setSort[bKey] || initSort[bKey])
    );
  });
};

const handleFixed = (data, fixed) => {
  let type = "";
  //已经激活的就删除掉
  if (data.fixed === fixed) {
    type = "del";
    delete data.fixed;
  } else {
    type = "update";
    data.fixed = fixed;
  }

  for (let i = 0; i < mode.value.length; i++) {
    const item = mode.value[i];
    if (item.prop === data.prop) {
      //已经激活的就删除掉
      if (type === "del") {
        delete item.fixed;
      } else {
        item.fixed = fixed;
      }
      break;
    }
  }
};

const checkChange = ({ checked, prop }) => {
  for (let i = 0; i < mode.value.length; i++) {
    const item = mode.value[i];
    if (item.prop === prop) {
      item.hide = !checked;
      break;
    }
  }
};

const reset = () => {
  mode.value = cloneColumns(initValue);
};
</script>

<style lang="scss">
.toolbar-column-setting {
  display: inline-flex;
}
.columns-setting-popover.el-popover {
  padding: 0;
  .column-setting {
    .column-setting-title {
      padding: 12px 8px 0 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label {
        color: var(--el-text-color-primary);
        letter-spacing: 1px;
      }
      .el-button {
        padding: 0;
        height: auto;
      }
    }
    .el-divider {
      margin: 8px 0;
    }
    .column-setting-content {
      margin-bottom: 8px;
      .column-setting-item {
        padding: 7px 12px;
        align-items: center;
        display: flex;
        .icon {
          font-size: 15px;
        }
        .column-handle {
          flex: 1;
          display: flex;
          .mover {
            cursor: move;
            margin-right: 8px;
            font-size: 16px;
          }
          .el-checkbox {
            height: auto;
            margin-right: 5px;
          }
        }
        .column-fixed {
          flex-shrink: 0;
          display: flex;
          margin-left: 3px;
          .icon {
            cursor: pointer;
            &.active {
              color: var(--el-color-primary);
            }
          }
        }
      }
    }
  }
}
</style>
