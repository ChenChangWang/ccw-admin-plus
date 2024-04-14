import { isArray, isObject } from "@vue/shared";
import numeral from "numeral";
import dayjs from "dayjs";
import { clone, cloneDeep } from "lodash";
import { TimeDistance } from "@/utils/types.ts";

export const isEmpty = (val: any): boolean => {
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
export function debounce(func: Function, delay: number): Function {
  let timerId: ReturnType<typeof setTimeout>;
  return function (this: any): void {
    clearTimeout(timerId);
    timerId = setTimeout((): void => {
      func.apply(this, arguments);
    }, delay);
  };
}

/**
 * 防抖
 * @param func 函数
 * @param delay 延迟
 */
export function beforeDebounce(func: Function, delay: number): Function {
  let timerId: ReturnType<typeof setTimeout>;
  let isFirstTime: boolean = true;
  return function (this: any): void {
    clearTimeout(timerId);
    if (isFirstTime) {
      func.apply(this, arguments);
      isFirstTime = false;
    } else {
      timerId = setTimeout((): void => {
        func.apply(this, arguments);
      }, delay);
    }
  };
}

// 获取assets静态资源
export const getAssetsImage = (url: string): string => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};

export const toYuan = (val: number): string => `¥${numeral(val).format("0,0")}`;

// 格式化为 K（千）的形式
export const toK = (number: number): string => numeral(number).format("0.0a");

/**
 * getTimeDistance(当前时间、本周、今月、今年)
 * @param type 'day' | 'week' | 'month' | 'year'
 * @returns {*[]}
 */
export function getTimeDistance(type: TimeDistance): dayjs.Dayjs[] {
  if (type === "week") {
    return [
      dayjs().startOf("week").add(1, "day"),
      dayjs().endOf("week").add(1, "day"),
    ];
  } else {
    return [dayjs().startOf(type), dayjs().endOf(type)];
  }
}

export const hasChild = (item: any): boolean => {
  return item.children && item.children.length !== 0;
};

/**
 * 两个路由对比
 * @param route1 路由1
 * @param route2 路由2
 * @returns {boolean}
 */
export const routeEqual = (route1: any, route2: any): boolean => {
  return route1.fullPath === route2.fullPath;
};
export const arrayToTree = function (arr: any) {
  const map: { [key: string]: any } = {};
  const root: any[] = [];
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
