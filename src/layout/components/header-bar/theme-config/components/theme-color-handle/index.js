import { getCssColorType } from "./function";
import { getVal } from "./var";

export default function themeColorHandle() {}
themeColorHandle.prototype.styleElement = null;

themeColorHandle.prototype.init = function () {
  this.styleElement = document.createElement("style");
  document.head.appendChild(this.styleElement);
  document.documentElement.classList.add("theme");
};

themeColorHandle.prototype.getLightCssData = function (lightVal) {
  let cssData = {};
  /* Object.assign(cssData, getCssVarValue("color-white", lightVal.colorWhite));
    Object.assign(cssData, getCssVarValue("color-black", lightVal.colorBlack));*/

  // --el-color-#{$type}
  // --el-color-#{$type}-light-{$i}
  lightVal.types.forEach((type) => {
    Object.assign(cssData, getCssColorType(lightVal.colors, type));
  });
  /*
    // color-scheme
    // Background --el-bg-color-#{$type}
    Object.assign(cssData, getComponentCssVar("bg-color", lightVal.bgColor));
    //--el-text-color-#{$type}
    Object.assign(cssData, getComponentCssVar("text-color", lightVal.textColor));
    // --el-border-color-#{$type}
    Object.assign(
      cssData,
      getComponentCssVar("border-color", lightVal.borderColor),
    );
    // Fill --el-fill-color-#{$type}
    Object.assign(cssData, getComponentCssVar("fill-color", lightVal.fillColor));
    // --el-box-shadow-#{$type}
    Object.assign(cssData, getComponentCssVar("box-shadow", lightVal.boxShadow));
    // Disable base
    Object.assign(cssData, getComponentCssVar("disabled", lightVal.disabled));
    // overlay & mask
    Object.assign(
      cssData,
      getComponentCssVar("overlay-color", lightVal.overlayColor),
    );
    Object.assign(cssData, getComponentCssVar("mask-color", lightVal.maskColor));
    // Border
    Object.assign(
      cssData,
      getCssVarValue("border-color-hover", lightVal.borderColorHover),
    );

    Object.assign(
      cssData,
      getCssVarValue(
        "border",
        `${getCssVar("border-width")} ${getCssVar("border-style")} ${getCssVar(
          "border-color",
        )}`,
      ),
    );*/

  return cssData;
};

themeColorHandle.prototype.getDarkCssData = function (darkVar) {
  let cssData = {};
  // --el-color-#{$type}
  // --el-color-#{$type}-light-{$i}
  darkVar.types.forEach((type) => {
    Object.assign(cssData, getCssColorType(darkVar.colors, type, true));
  });

  /*  // color-scheme
    // Background --el-bg-color-#{$type}
    Object.assign(cssData, getComponentCssVar("bg-color", darkVar.bgColor, true));
    //--el-text-color-#{$type}
    Object.assign(
      cssData,
      getComponentCssVar("text-color", darkVar.textColor, true),
    );
    // --el-border-color-#{$type}
    Object.assign(
      cssData,
      getComponentCssVar("border-color", darkVar.borderColor, true),
    );
    // Fill --el-fill-color-#{$type}
    Object.assign(
      cssData,
      getComponentCssVar("fill-color", darkVar.fillColor, true),
    );
    // --el-box-shadow-#{$type}
    Object.assign(
      cssData,
      getComponentCssVar("box-shadow", darkVar.boxShadow, true),
    );
    // Disable base
    //  mask
    Object.assign(
      cssData,
      getComponentCssVar("mask-color", darkVar.maskColor, true),
    );

    cssData[getDarkBlockKey("button")] = getComponentCssVar(
      "button",
      darkVar.button,
    );
    cssData[getDarkBlockKey("card")] = getComponentCssVar("card", darkVar.card);
    cssData[getDarkBlockKey("empty")] = getComponentCssVar(
      "empty",
      darkVar.empty,
    );*/
  return cssData;
};

themeColorHandle.prototype.convertJsonToCss = function (data) {
  let list = [];
  const traverse = (parent, parentSelector = "") => {
    let cssList = [];
    for (const key in parent) {
      if (typeof parent[key] === "object") {
        traverse(
          parent[key],
          parentSelector ? `${parentSelector} ${key}` : key,
        );
      } else {
        cssList.push(`${key}: ${parent[key]}`);
      }
    }
    if (parentSelector) {
      list.push({ selector: parentSelector, cssList });
    }
  };
  traverse(data, "");
  list.reverse();
  let result = "";
  list.forEach((item) => {
    const { selector, cssList } = item;
    const css = cssList.join(";\n");
    result += `${selector} {\n ${css} \n}\n`;
  });
  return result;
};

themeColorHandle.prototype.changeTheme = function (
  primary,
  success,
  warning,
  danger,
  error,
  info,
) {
  const { lightVal, darkVar } = getVal(
    primary,
    success,
    warning,
    danger,
    error,
    info,
  );

  const cssData = { ["html.theme"]: this.getLightCssData(lightVal) };
  const lightCss = this.convertJsonToCss(cssData);

  const cssDarkData = { ["html.dark.theme"]: this.getDarkCssData(darkVar) };
  const cssDark = this.convertJsonToCss(cssDarkData);
  const css = lightCss + "\n" + cssDark;

  if (!this.styleElement) {
    this.init();
  }
  // 将样式内容添加到style元素中
  this.styleElement.innerHTML = css;
};
