import { getCssVar, mix } from "./function";

const colorWhite = "#ffffff";
const colorBlack = "#000000";
const types = ["primary", "success", "warning", "danger", "error", "info"];
const defPrimary = "#409eff";
const defSuccess = "#67c23a";
const defWarning = "#e6a23c";
const defDanger = "#f56c6c";
const defError = "#f56c6c";
const defInfo = "#909399";

const setColorMixLevel = (
  colors,
  type,
  number,
  mode = "light",
  mixColor = colorWhite,
) => {
  const key = `${mode}-${number}`;
  colors[type][key] = mix(colors[type].base, mixColor, number * 0.1);
};

const getLightVal = (primary, success, warning, danger, error, info) => {
  const lightVar = {
    types: [...types],
    colorWhite,
    colorBlack,
    colors: {
      white: colorWhite,
      black: colorBlack,
      primary: { base: primary }, //#008000 #409eff
      success: { base: success },
      warning: { base: warning },
      danger: { base: danger },
      error: { base: error },
      info: { base: info },
    },
    bgColor: {
      "": "#ffffff",
      page: "#f2f3f5",
      overlay: "#ffffff",
    },
    textColor: {
      primary: "#303133",
      regular: "#606266",
      secondary: "#909399",
      placeholder: "#a8abb2",
      disabled: "#c0c4cc",
    },
    borderColor: {
      "": "#dcdfe6",
      light: "#e4e7ed",
      lighter: "#ebeef5",
      "extra-light": "#f2f6fc",
      dark: "#d4d7de",
      darker: "#cdd0d6",
    },
    fillColor: {
      "": "#f0f2f5",
      light: "#f5f7fa",
      lighter: "#fafafa",
      "extra-light": "#fafcff",
      dark: " #ebedf0",
      darker: "#e6e8eb",
      blank: " #ffffff",
    },
    boxShadow: {
      "": "0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08)",
      light: "0px 0px 12px rgba(0, 0, 0, 0.12)",
      lighter: "0px 0px 6px rgba(0, 0, 0, 0.12)",
      dark: "0px 16px 48px 16px rgba(0, 0, 0, 0.08), 0px 12px 32px rgba(0, 0, 0, 0.12), 0px 8px 16px -8px rgba(0, 0, 0, 0.16)",
    },
    disabled: {
      "bg-color": getCssVar(["fill-color", "light"]),
      "text-color": getCssVar(["text-color", "placeholder"]),
      "border-color": getCssVar(["border-color", "light"]),
    },
    overlayColor: {
      "": "rgba(0, 0, 0, 0.8)",
      light: "rgba(0, 0, 0, 0.7)",
      lighter: "rgba(0, 0, 0, 0.5)",
    },
    maskColor: {
      "": "rgba(255, 255, 255, 0.9)",
      "extra-light": "rgba(255, 255, 255, 0.3)",
    },
    borderColorHover: getCssVar(["text-color", "disabled"]),
    //将颜色与白色/黑色混合以生成亮/暗级别
  };
  lightVar.types.forEach((type) => {
    for (let i = 1; i <= 9; i++) {
      setColorMixLevel(lightVar.colors, type, i, "light", colorWhite);
    }
  });
  lightVar.types.forEach((type) => {
    setColorMixLevel(lightVar.colors, type, 2, "dark", colorBlack);
  });
  return lightVar;
};
const getDarkVal = (primary, success, warning, danger, error, info) => {
  const borderColorBase = "245,248,255";
  const textColorBase = "240,245,255";
  const fillColorBase = "250,252,255";

  const darkVar = {
    types: [...types],
    colorWhite: colorWhite,
    colorBlack: colorBlack,
    colors: {
      white: colorWhite,
      black: colorBlack,
      primary: { base: primary }, //#008000 #409eff
      success: { base: success },
      warning: { base: warning },
      danger: { base: danger },
      error: { base: error },
      info: { base: info },
    },
    bgColor: {
      "": "#141414",
      page: "#0a0a0a",
      overlay: "#1d1e1f",
    },
    textColor: {
      primary: `rgba(${textColorBase}, 0.95)`,
      regular: `rgba(${textColorBase}, 0.85)`,
      secondary: `rgba(${textColorBase}, 0.65)`,
      placeholder: `rgba(${textColorBase}, 0.55)`,
      disabled: `rgba(${textColorBase}, 0.4)`,
    },
    borderColor: {
      darker: `rgba(${borderColorBase}, 0.35)`,
      dark: `rgba(${borderColorBase}, 0.3)`,
      "": `rgba(${borderColorBase}, 0.25)`,
      light: `rgba(${borderColorBase}, 0.2)`,
      lighter: `rgba(${borderColorBase}, 0.15)`,
      "extra-light": ` rgba(${borderColorBase}, 0.1)`,
    },
    fillColor: {
      darker: `rgba(${fillColorBase}, 0.2)`,
      dark: `rgba(${fillColorBase}, 0.16)`,
      "": `rgba(${fillColorBase}, 0.12)`,
      light: `rgba(${fillColorBase}, 0.08)`,
      lighter: `rgba(${fillColorBase}, 0.04)`,
      "extra-light": `rgba(${fillColorBase}, 0.02)`,
      blank: "transparent",
    },
    boxShadow: {
      "": "0px 12px 32px 4px rgba(0, 0, 0, 0.36), 0px 8px 20px rgba(0, 0, 0, 0.72)",
      light: "0px 0px 12px rgba(0, 0, 0, 0.72)",
      lighter: "0px 0px 6px rgba(0, 0, 0, 0.72)",
      dark: "0px 16px 48px 16px rgba(0, 0, 0, 0.72), 0px 12px 32px #000000, 0px 8px 16px -8px #000000",
    },
    maskColor: {
      "": "rgba(0, 0, 0, 0.8)",
      "extra-light": "rgba(0, 0, 0, 0.3)",
    },
    borderColorHover: getCssVar(["text-color", "disabled"]),
    button: {
      "disabled-text-color": "rgba(255, 255, 255, 0.5)",
    },
    card: {
      "bg-color": getCssVar("bg-color", "overlay"),
    },
    empty: {
      "fill-color-0": getCssVar("color-black"),
      "fill-color-1": "#4b4b52",
      "fill-color-2": "#36383d",
      "fill-color-3": "#1e1e20",
      "fill-color-4": "#262629",
      "fill-color-5": "#202124",
      "fill-color-6": "#212224",
      "fill-color-7": "#1b1c1f",
      "fill-color-8": "#1c1d1f",
      "fill-color-9": "#18181a",
    },
  };

  darkVar.types.forEach((type) => {
    for (let i = 1; i <= 9; i++) {
      setColorMixLevel(darkVar.colors, type, i, "light", darkVar.bgColor[""]);
    }
  });
  darkVar.types.forEach((type) => {
    setColorMixLevel(darkVar.colors, type, 2, "dark", darkVar.colorWhite);
  });
  return darkVar;
};
export const getVal = (
  primary = defPrimary,
  success = defSuccess,
  warning = defWarning,
  danger = defDanger,
  error = defError,
  info = defInfo,
) => {
  const lightVal = getLightVal(primary, success, warning, danger, error, info);
  const darkVar = getDarkVal(primary, success, warning, danger, error, info);
  return { lightVal, darkVar };
};
