import { defineStore } from "pinia";
import { isEmpty, routeEqual } from "@/utils/util";
import { HOME_PATH, MenuMeta } from "@/router/constants";
import type { RouteLocationNormalized } from "vue-router";
import { TabsNavProps, TabsNavState } from "./types.ts";

const formatTag = (route: RouteLocationNormalized): TabsNavProps => {
  const { name, query, fullPath, path, meta } = route;

  return {
    name: String(name),
    query,
    fullPath,
    path,
    meta: { ...(meta as MenuMeta) },
  };
};

const setTagNavListLocalstorage = (list: TabsNavProps[]) => {
  localStorage.tagNaveList = JSON.stringify(list);
};

const getTagNavListLocalstorage = () => {
  const list = localStorage.tagNaveList;
  return list ? JSON.parse(list) : [];
};

const getHomeRoute = (
  routers: TabsNavProps[],
  homePath: string = HOME_PATH,
): TabsNavProps => {
  let homeRoute = {};
  for (let i = 0; i < routers.length; i++) {
    let item = routers[i];
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homePath);
      if (res.name) return res;
    } else {
      if (item.path === homePath) homeRoute = item;
    }
  }
  return homeRoute as TabsNavProps;
};

const useTabsNavStore = defineStore("tabsBav", {
  state: (): TabsNavState => {
    return {
      tagList: [],
    };
  },
  getters: {
    getTabList(): TabsNavProps[] {
      return this.tagList;
    },
    getCacheList(): string[] {
      return this.tagList
        .filter((item) => !item.meta?.noCache)
        .map((item) => item.name);
    },
  },
  actions: {
    loadLocalTagList() {
      const list = getTagNavListLocalstorage() || [];
      this.setTagList(list);
    },

    setTagList(list: TabsNavProps[]) {
      let tagList: TabsNavProps[] = [];
      if (list) {
        tagList = [...list];
      }

      //不存在首页 那么就收到添加上去
      if (!tagList.some((item) => item.path === HOME_PATH)) {
        const homeRoute = getHomeRoute(this.tagList);
        if (!isEmpty(homeRoute)) tagList.unshift(homeRoute);
      }

      this.tagList = tagList;

      setTagNavListLocalstorage([...tagList]);
    },

    addTag(route: RouteLocationNormalized) {
      if (!route.meta.noAffix && !this.hasExist(route)) {
        this.tagList.push(formatTag(route));
        setTagNavListLocalstorage([...this.tagList]);
      }
    },

    hasExist(route: TabsNavProps | RouteLocationNormalized) {
      return this.tagList.some((tag) => routeEqual(tag, route));
    },

    getNextRoute(route: TabsNavProps): TabsNavProps {
      let res = {};
      if (this.tagList.length <= 2) {
        res = getHomeRoute(this.tagList);
      } else {
        const index = this.tagList.findIndex((item) => routeEqual(item, route));
        if (index === this.tagList.length - 1) {
          res = this.tagList[index - 1];
        } else {
          res = this.tagList[index + 1];
        }
      }
      return res as TabsNavProps;
    },

    clear() {
      this.tagList = [];
      setTagNavListLocalstorage([]);
    },
  },
});

export default useTabsNavStore;
