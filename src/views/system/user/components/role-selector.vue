<template>
  <el-select
    v-model="role"
    multiple
    collapse-tags
    collapse-tags-tooltip
    :max-collapse-tags="1"
    placeholder="请选择"
    popper-class="role-selector-option"
  >
    <el-option
      v-for="item in roleOptions"
      :key="item.value"
      :label="item.concatLabel"
      :value="item.value"
    >
      <span class="value">{{ item.value }}</span>
      <span class="label">{{ item.label }}</span>
    </el-option>
  </el-select>
</template>

<script setup>
import { computed, ref } from "vue";
import { getRoleList } from "@/api/system";
const model = defineModel();
const role = computed({
  get: () => model.value,
  set: (val) => {
    model.value = val;
  },
});
const roleOptions = ref([]);
const fetchRoleList = async () => {
  try {
    const { data } = await getRoleList({
      currentPage: 1,
      pageSize: 999,
    });
    roleOptions.value = data.list.map((item) => {
      return {
        label: item.explain,
        value: item.name,
        concatLabel: item.name + "  " + item.explain,
      };
    });
  } catch (err) {
  } finally {
  }
};

fetchRoleList();
</script>

<style lang="scss">
.role-selector-option {
  .el-select-dropdown__item {
    padding: 0 12px;
    &.selected {
      &:after {
        right: 16px !important;
      }
    }

    .value {
      font-size: 14px;
      font-weight: 500;
    }
    .label {
      font-size: 13px;
      color: var(--el-text-color-secondary);
      margin-left: 5px;
      font-weight: 400;
    }
  }
}
</style>
