import { isArray, isObject } from "@vue/shared";
import numeral from "numeral";
import dayjs from "dayjs";
import { clone, cloneDeep } from "lodash";
export const isEmpty = (val) => {
  return (
    (!val && val !== 0) ||
    (isArray(val) && val.length === 0) ||
    (isObject(val) && !Object.keys(val).length)
  );
};

/**
 * 防抖
 * @param func 函数
 * @param delay 延迟
 */
export function debounce(func, delay) {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

/**
 * 防抖
 * @param func 函数
 * @param delay 延迟
 */
export function beforeDebounce(func, delay) {
  let timerId;
  let isFirstTime = true;
  return function () {
    clearTimeout(timerId);
    if (isFirstTime) {
      func.apply(this, arguments);
      isFirstTime = false;
    } else {
      timerId = setTimeout(() => {
        func.apply(this, arguments);
      }, delay);
    }
  };
}

// 获取assets静态资源
export const getAssetsImage = (url) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};

export const toYuan = (val) => `¥${numeral(val).format("0,0")}`;

// 格式化为 K（千）的形式
export const toK = (number) => numeral(number).format("0.0a");

/**
 *
 * @param type 'day' | 'week' | 'month' | 'year'
 * @returns {*[]}
 */
export function getTimeDistance(type) {
  if (type === "week") {
    return [
      dayjs().startOf("week").add(1, "day"),
      dayjs().endOf("week").add(1, "day"),
    ];
  } else {
    return [dayjs().startOf(type), dayjs().endOf(type)];
  }
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0;
};

/**
 * 两个路由对比
 * @param route1 路由1
 * @param route2 路由2
 * @returns {boolean}
 */
export const routeEqual = (route1, route2) => {
  return route1.fullPath === route2.fullPath;
};

export const arrayToTree = function (arr) {
  const map = {};
  const root = [];
  arr.forEach((item) => {
    const data = { ...item };
    if (map[item.id] && map[item.id].children) {
      data.children = map[item.id].children;
    }
    map[item.id] = data;
    if (item.parentId != null) {
      map[item.parentId] = map[item.parentId] || { children: [] };
      map[item.parentId].children = map[item.parentId].children || [];
      map[item.parentId].children.push(map[item.id]);
    } else {
      root.push(map[item.id]);
    }
  });

  return root;
};
