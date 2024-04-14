<template>
  <el-dropdown
    @command="toggleLocale"
    popper-class="no-arrow-popper"
    :popper-options="{
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 3],
          },
        },
      ],
    }"
  >
    <span class="action-language"><Icon icon="ion:language" /></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in localeOptions"
          :key="item.value"
          :command="item.value"
          :class="{ 'dropdown-item-selected': localeValue === item.value }"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import useLocale from "@/hooks/use-locale";
import { LOCALE_OPTIONS } from "@/locale";
const { toggleLocale, localeValue } = useLocale();
const localeOptions = [...LOCALE_OPTIONS];
</script>

<style scoped lang="scss"></style>
