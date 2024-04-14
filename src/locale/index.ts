import { createI18n } from "vue-i18n";
import zhCn from "./zh-cn";
import en from "./en";

export const LOCALE_ZH_CN = "zh-cn";
export const LOCALE_EN = "en";
export const LOCALE_OPTIONS = [
  { label: "简体中文", value: LOCALE_ZH_CN },
  { label: "English", value: LOCALE_EN },
];

/**
 * 路由的国际标题
 */
export const routeI18n = (route, locale) => {
  if (locale && route.meta?.lang && route.meta.lang[locale]) {
    return route.meta.lang[locale];
  }
  return route.meta?.title;
};

const defaultLocale = localStorage.getItem("locale") || LOCALE_ZH_CN;

const i18n = createI18n({
  locale: defaultLocale, //默认语音环境
  fallbackLocale: LOCALE_ZH_CN, //设置回填的语言环境，如果当前语言环境找不到对应的翻译，将回退到指定的语言环境
  legacy: false,
  allowComposition: true,
  messages: {
    //包含所有支持的语言环境及对应的翻译信息
    [LOCALE_ZH_CN]: zhCn,
    [LOCALE_EN]: en,
  },
});

export default i18n;
