import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";

export default function useLocale() {
  const i18n = useI18n();
  const localeValue = computed(() => {
    return i18n.locale.value;
  });

  const toggleLocale = (value: string) => {
    if (localeValue.value === value) {
      return;
    }
    i18n.locale.value = value;
    localStorage.setItem("locale", value);
    ElMessage({
      message: i18n.t("toggle.to.locale"),
      type: "success",
    });
  };

  return {
    localeValue,
    toggleLocale,
  };
}
