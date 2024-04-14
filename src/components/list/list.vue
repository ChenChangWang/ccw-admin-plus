<template>
  <div :class="classes">
    <div class="list-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <ul class="list-items">
      <slot></slot>
    </ul>

    <slot name="load" v-if="loading">
      <Spin fix> </Spin>
    </slot>

    <div class="list-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, provide, ref } from "vue";
import Spin from "@/components/spin/index.vue";

const props = defineProps({
  /**
   * 是否显示边框
   */
  border: {
    type: Boolean,
    default: false,
  },
  /**
   * 列表是否加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示分割线
   */
  split: {
    type: Boolean,
    default: true,
  },
  /**
   * 设置ListItem组件的布局, 值为 horizontal（横排）或 vertical（竖直）
   * horizontal: action在右侧 extra在最右侧
   * vertical: action在底部 extra在最右侧
   */
  itemLayout: {
    validator(value, props) {
      return ["horizontal", "vertical"].includes(value);
    },
    default: "horizontal",
  },
});

provide("listContextKey", {
  itemLayout: props.itemLayout,
});

const classes = computed(() => {
  return [
    "list",
    `list-${props.itemLayout}`,
    { "list-bordered": props.border, "list-split": props.split },
  ];
});
</script>

<style lang="scss">
.list {
  position: relative;

  .list-items {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .list-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    .list-item-main {
      flex: 1;
    }
    .list-item-meta {
      display: flex;
      flex: 1;
      align-items: flex-start;
      font-size: 0;
      .list-item-meta-avatar {
        margin-right: 16px;
        background: transparent;
        .el-avatar {
          background: transparent;
        }
      }
      .list-item-meta-content {
        color: var(--el-text-color-primary);
      }
      .list-item-meta-title {
        font-weight: 500;
        color: var(--el-text-color-primary);
        font-size: 14px;
        line-height: 22px;
      }
      .list-item-meta-description {
        color: var(--el-text-color-secondary);
        font-size: 14px;
        line-height: 22px;
        margin-top: 4px;
      }
    }
    .list-item-action {
      flex: 0 0 auto;
      margin-left: 36px;
      padding: 0;
      font-size: 0;
      list-style: none;
      > li {
        position: relative;
        display: inline-block;
        padding: 0 8px;
        color: var(--el-text-color-secondary);
        font-size: 13px;
        line-height: 22px;
        text-align: center;
        cursor: pointer;
        &:after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 14px;
          background-color: var(--el-border-color-light);
        }
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          &:after {
            display: none;
          }
        }
      }
    }
  }
  .list-header {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .list-footer {
    padding-top: 12px;
    padding-bottom: 12px;
  }
}

/*分割线*/
.list-split {
  .list-item {
    border-bottom: 1px solid var(--el-border-color);
    &:last-child {
      border-bottom: none;
    }
  }
  .list-header {
    border-bottom: 1px solid var(--el-border-color);
  }

  .list-footer {
    border-top: 1px solid var(--el-border-color);
  }
}

/*边框*/
.list-bordered {
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  .list-item {
    padding-right: 24px;
    padding-left: 24px;
    border-bottom: 1px solid var(--el-border-color-light);
  }
  .list-header {
    padding-right: 24px;
    padding-left: 24px;
  }
  .list-footer {
    padding-right: 24px;
    padding-left: 24px;
  }
}

/*垂直*/
.list-vertical {
  .list-item {
    align-items: initial;
    .list-item-extra {
      margin-left: 40px;
    }
    .list-item-meta {
      margin-bottom: 16px;

      .list-item-meta-title {
        margin-bottom: 12px;
        color: var(--el-text-color-primary);
        font-size: 16px;
        line-height: 24px;
      }
    }
    .list-item-action {
      margin-top: 16px;
      margin-left: auto;

      > li {
        padding: 0 16px;
      }
    }
  }
}
</style>
