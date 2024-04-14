import { defineStore } from "pinia";
import { getMenuList } from "@/api/user";
import { useAppStore, useUserStore } from "@/store";
import { arrayToTree, hasChild } from "@/utils/util";
import { appRoutes } from "@/router/routes";
import { Layout } from "@/router/constants";
const routerComponents = {
  Layout: Layout,
};
const modules = import.meta.glob([
  "/src/views/**/*.{vue,jsx}",
  "!**/components/*",
]);
const useRouterStore = defineStore("router", {
  state: () => {
    return {
      menuList: [],
      routers: [],
    };
  },
  getters: {},
  actions: {
    updatePatch(partialState) {
      this.$patch(partialState);
    },

    resetInfo() {
      this.$reset();
    },

    accessRoute(item) {
      const userStore = useUserStore();
      const roles = userStore.userInfo.roles;
      return (
        !item.meta?.roles ||
        item.meta.roles.some((role) => roles.indexOf(role) > -1)
      );
    },

    /**
     * 格式化树形结构数据 生成路由表
     */
    generatorAsyncRouter(routers, parent) {
      //先进行排序
      const list = [...routers];
      list.sort((a, b) => {
        return (a.meta.orderNum || 0) - (b.meta.orderNum || 0);
      });

      return list.map((item) => {
        let currentRouter = {
          // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成
          path: item.path || `${(parent && parent.path) || ""}/${item.path}`,
          //路由名称，建议保持唯一
          name: item.name || item.path.replace(/\//g, ""),
          meta: item.meta,
        };
        //不是外链  动态加载组件
        if (!item.meta?.link) {
          currentRouter.component =
            routerComponents[item.component || "Layout"] ||
            modules[`/src/views${item.component}`];
        }
        if (item.redirect) {
          currentRouter.redirect = item.redirect;
        }

        if (hasChild(item)) {
          currentRouter.children = this.generatorAsyncRouter(
            item.children,
            currentRouter,
          );
        }
        return currentRouter;
      });
    },

    /**
     * 生成菜单
     */
    generatorMenu(routers = []) {
      const list = [...routers];
      list.sort((a, b) => {
        return (a.meta.orderNum || 0) - (b.meta.orderNum || 0);
      });

      return list
        .map((item) => {
          if (!item.meta?.hideInMenu) {
            let obj = {
              path: item.path,
              name: item.name,
              meta: item.meta,
            };
            //使用拥有role角色
            if (hasChild(item)) {
              obj.children = this.generatorMenu(item.children);
            }
            return obj;
          }
        })
        .filter(Boolean);
    },

    /**
     * 根据用户的角色和路由meta.role进行过滤
     * @param routers
     * @returns {*}
     */
    filterRoleRouter(routers) {
      const result = [];
      routers.forEach((route) => {
        //是否拥有role角色
        const hasAccessRole = this.accessRoute(route);
        if (hasAccessRole) {
          let obj = { ...route };
          if (hasChild(route)) {
            obj.children = this.filterRoleRouter(route.children);
          }
          result.push(obj);
          return obj;
        }
      });
      return result;
    },

    /**
     * 生成路由表
     * @returns {Promise<void>}
     */
    async generateRoutes() {
      let routers = [];
      const appStore = useAppStore();
      if (appStore.menuFromServer) {
        const res = await getMenuList();
        const routes = arrayToTree(res.data);
        routers = this.generatorAsyncRouter(routes);
      } else {
        routers = this.filterRoleRouter(appRoutes);
      }
      this.menuList = this.generatorMenu(routers);
      this.routers = [...routers];
    },
  },
});
export default useRouterStore;
