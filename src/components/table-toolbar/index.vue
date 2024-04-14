<template>
  <el-row class="table-toolbar">
    <el-col :span="12">
      <slot />
    </el-col>

    <el-col :span="12" class="table-toolbar-setting">
      <template v-if="stripe != null">
        <!-- 表格斑马纹 -->
        <el-tooltip :content="$t('table.toolbar.stripe')" placement="top">
          <el-switch
            v-model="stripe"
            :active-text="$t('open')"
            :inactive-text="$t('off')"
            inline-prompt
          />
        </el-tooltip>
        <el-divider direction="vertical" />
      </template>

      <!-- 刷新 -->
      <el-tooltip :content="$t('table.toolbar.refresh')" placement="top">
        <i class="action-icon icon" @click="emits('refresh')">
          <Icon icon="ep:refresh-right" />
        </i>
      </el-tooltip>

      <!-- 查询表单控制 -->
      <el-tooltip
        v-if="isQueryForm != null"
        :content="
          isQueryForm
            ? $t('table.toolbar.queryForm.collapse')
            : $t('table.toolbar.queryForm.expand')
        "
        placement="top"
      >
        <i class="action-icon icon" @click="switchIsQueryForm()">
          <Icon icon="ep:search" />
        </i>
      </el-tooltip>

      <!-- 密度 -->
      <el-tooltip
        v-if="size != null"
        :content="$t('table.toolbar.density')"
        placement="top"
      >
        <ToolbarDensity v-model="size">
          <i class="action-icon icon">
            <Icon icon="ant-design:column-height-outlined" />
          </i>
        </ToolbarDensity>
      </el-tooltip>

      <!-- 列设置  -->
      <el-tooltip
        v-if="$attrs.columns != null"
        :content="$t('table.toolbar.columnSetting')"
        placement="top"
      >
        <ToolbarColumnSetting v-bind="$attrs">
          <i class="action-icon icon">
            <Icon icon="ep:setting" />
          </i>
        </ToolbarColumnSetting>
      </el-tooltip>
    </el-col>
  </el-row>
</template>

<script setup>
import { defineModel, defineEmits, defineOptions } from "vue";
import ToolbarColumnSetting from "./toolbar-column-setting.vue";
import ToolbarDensity from "./toolbar-density.vue";
import { Icon } from "@iconify/vue";

defineOptions({
  inheritAttrs: false,
});

const size = defineModel("size");
const stripe = defineModel("stripe");
const isQueryForm = defineModel("isQueryForm");
const emits = defineEmits(["refresh"]);

const switchIsQueryForm = () => {
  isQueryForm.value = !isQueryForm.value;
};
</script>

<style lang="scss" scoped>
.table-toolbar {
  .table-toolbar-setting {
    display: flex;
    gap: 14px;
    line-height: 32px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
    :deep(.el-divider) {
      margin: 0 3px;
    }

    .action-icon {
      cursor: pointer;
      font-size: 18px;
      color: var(--el-text-color-primary);
    }
  }
}
</style>
