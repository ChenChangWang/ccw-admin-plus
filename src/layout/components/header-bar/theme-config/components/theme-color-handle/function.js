export const namespace = "el";

/**
 * 255颜色值转16进制颜色值
 * @param n 255颜色值
 * @returns hex 16进制颜色值
 */
export const toHex = (n) => `${n > 15 ? "" : 0}${n.toString(16)}`;

/**
 * 颜色对象转化为16进制颜色字符串
 * @param colorObj 颜色对象
 */
export const toHexString = (colorObj) => {
  const { r, g, b, a = 1 } = colorObj;
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${
    a === 1 ? "" : toHex(Math.floor(a * 255))
  }`;
};
/**
 * 颜色对象转化为rgb颜色字符串
 * @param colorObj 颜色对象
 */
export const toRgbString = (colorObj) => {
  const { r, g, b } = colorObj;
  return `rgb(${r},${g},${b})`;
};

/**
 * 颜色对象转化为rgba颜色字符串
 * @param colorObj 颜色对象
 */
export const toRgbaString = (colorObj, n = 10000) => {
  const { r, g, b, a = 1 } = colorObj;
  return `rgba(${r},${g},${b},${Math.floor(a * n) / n})`;
};

/**
 * 16进制颜色字符串解析为颜色对象
 * @param color 颜色字符串
 * @returns
 */
export const parseHexColor = (color) => {
  let hex = color.slice(1);
  let a = 1;
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  if (hex.length === 8) {
    a = parseInt(hex.slice(6), 16) / 255;
    hex = hex.slice(0, 6);
  }
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
    a,
  };
};

/**
 * rgba颜色字符串解析为颜色对象
 * @param color 颜色字符串
 * @returns
 */
export const parseRgbaColor = (color) => {
  const arr = color.match(/(\d(\.\d+)?)+/g) || [];
  const res = arr.map((s) => parseInt(s, 10));
  return {
    r: res[0],
    g: res[1],
    b: res[2],
    a: parseFloat(arr[3]),
  };
};

/**
 * 颜色字符串解析为颜色对象
 * @param color 颜色字符串
 * @returns
 */
export const parseColorString = (color) => {
  if (color.startsWith("#")) {
    return parseHexColor(color);
  }
  if (color.startsWith("rgb")) {
    return parseRgbaColor(color);
  }
  if (color === "transparent") {
    return parseHexColor("#00000000");
  }
  throw new Error(`color string error: ${color}`);
};

/**
 * 16进制颜色字符串转化为rgba颜色字符串
 * @param hex 16进制颜色字符串
 * @returns rgba颜色字符串
 */
export const hexToRgba = (hex) => {
  const colorObj = parseColorString(hex);
  return toRgbaString(colorObj);
};

/**
 * rgba颜色字符串转化为16进制颜色字符串
 * @param rgba rgba颜色字符串
 * @returns 16进制颜色字符串
 */
export const rgbaToHex = (rgba) => {
  const colorObj = parseColorString(rgba);
  return toHexString(colorObj);
};

export const mix = (color1, color2, weight) => {
  // 解析颜色字符串为RGB值

  const color1RGB = parseColorString(hexToRgba(color1)); //parseColor(color1);
  const color2RGB = parseColorString(hexToRgba(color2)); //parseColor(color2);

  // 计算混合后的RGB值
  const blendedR = Math.round(
    (1 - weight) * color1RGB.r + weight * color2RGB.r,
  );
  const blendedG = Math.round(
    (1 - weight) * color1RGB.g + weight * color2RGB.g,
  );
  const blendedB = Math.round(
    (1 - weight) * color1RGB.b + weight * color2RGB.b,
  );

  // 将RGB值转换为十六进制颜色字符串
  return rgbaToHex(`rgba(${blendedR},${blendedG},${blendedB},1)`);
};

//joinVarName(('button', 'text-color')) => '--el-button-text-color'
export const joinVarName = (list) => {
  let name = "--" + namespace;
  if (!Array.isArray(list)) {
    list = [list];
  }
  list.forEach((item) => {
    if (item != "") {
      name += "-" + item;
    }
  });
  return name;
};

export const getCssVarName = (list) => {
  return joinVarName(list);
};

export const getCssVar = (list) => {
  return `var(${joinVarName(list)})`;
};

// set-css-var-value(('color', 'primary'), red):--el-color-primary: red;
export const setCssVarValue = (name, value) => {
  setValue(joinVarName(name), value);
};
export const setValue = (name, value) => {
  /*  const els = document.querySelectorAll(".dark");
  els.forEach((el) => {
    el.style.setProperty(name, value);
  });*/
  document.documentElement.style.setProperty(name, value);
};

export const getCssVarValue = (name, value) => {
  return { [joinVarName(name)]: value };
};

export const getValue = (name, value) => {
  return { [name]: value };
};

export const getCssColorType = (colors, type) => {
  let result = {};
  Object.assign(result, getCssVarValue(["color", type], colors[type].base));
  [3, 5, 7, 8, 9].forEach((i) => {
    Object.assign(
      result,
      getCssVarValue(["color", type, "light", i], colors[type][`light-${i}`]),
    );
  });
  Object.assign(
    result,
    getCssVarValue(["color", type, "dark-2"], colors[type]["dark-2"]),
  );
  return result;
};

// 通过映射设置组件的所有css var
export const getComponentCssVar = (name, variables) => {
  let result = {};
  for (let attribute in variables) {
    const value = variables[attribute];
    if (attribute == "default") {
      Object.assign(result, getValue(joinVarName(name), value));
    } else {
      Object.assign(result, getValue(joinVarName([name, attribute]), value));
    }
  }
  return result;
};

export const getDarkBlockKey = (block) => {
  return "." + namespace + "-" + block;
};

export const dark = (block) => {
  //TODO html.dark

  const attr = namespace + "-" + block;
  //
  return attr;
};
