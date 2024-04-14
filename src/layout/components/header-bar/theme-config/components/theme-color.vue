<template>
  <List :split="false">
    <ListItem v-for="item in list" :key="item.key">
      <ListItemMeta :title="item.title" />
      <template #action>
        <el-color-picker
          v-model="color[item.key]"
          color-format="hex"
          :predefine="predefineColors"
          @change="change"
        />
      </template>
    </ListItem>
  </List>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { List, ListItem, ListItemMeta } from "@/components/list";
import variables from "@/assets/styles/variables.module.scss";
import ThemeColoHandle from "./theme-color-handle";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const list = computed(() => {
  return [
    { key: "primary", title: t("layout.setting.colors.primary") },
    { key: "success", title: t("layout.setting.colors.success") },
    { key: "warning", title: t("layout.setting.colors.warning") },
    { key: "danger", title: t("layout.setting.colors.danger") },
    { key: "error", title: t("layout.setting.colors.error") },
    { key: "info", title: t("layout.setting.colors.info") },
  ];
});

const predefineColors = ref([
  "#FF0000", // (红色)
  "#FFA500", //(橙色)
  "#FFFF00", // (黄色)
  "#008000", // (绿色)
  "#00FFFF", //(青色)
  "#0000FF", //(蓝色)
  "#800080", //(紫色)
  "#FFC0CB", // (粉红色)
  "#FFD700", // (金色)
  "#A52A2A", //(棕色)
  "#800000", // (栗色)
  "#808000", // (橄榄色)
  "#000000", // (黑色)
  "#FFFFFF", // (白色)
  "#808080", // (灰色)
  "#C0C0C0", // (银色)
  "#F0E68C", // (卡其色)
  "#00FF00", //(荧光绿)
  "#00FF7F", //(浅绿)
  "#8A2BE2", // (紫罗兰色)
]);

const color = reactive({ ...variables });

const themeColoHandle = new ThemeColoHandle();

const change = () => {
  const { primary, success, warning, danger, error, info } = color;
  themeColoHandle.changeTheme(primary, success, warning, danger, error, info);
};
</script>

<style scoped lang="scss"></style>
