import { setRouteEmitter } from "@/utils/route-listener";
import NProgress from "nprogress";
import i18n, { routeI18n } from "@/locale";
import { useRouterStore, useUserStore } from "@/store";
import { isLogin } from "@/utils/auth";
import { WHITE_PATH_LIST } from "@/router/constants";
import { isEmpty } from "@/utils/util";

//标题和进度条
function createNProgressGuard(router) {
  router.beforeEach((to, from, next) => {
    document.title = routeI18n(to, i18n.global.locale.value) || "Admin Plus";
    NProgress.start();
    next();
  });
  router.afterEach((to) => {
    NProgress.done();
  });
}

//全局路由事件
function createRouteListenerGuard(router) {
  router.beforeEach(async (to) => {
    setRouteEmitter(to);
  });
}

function createInfoGuard(router) {
  router.beforeEach(async (to, from) => {
    const userStore = useUserStore();
    if (!isLogin()) {
      // 未登录跳转登录界面
      if (!WHITE_PATH_LIST.includes(to.path)) {
        console.log("未登录不是白名单页面调到登录页");
        return { name: "login" };
      }
      console.log("未登录直接调到白名单页面");
      return;
    }

    // console.log("路由中", router, router.getRoutes());

    const routerStore = useRouterStore();

    //加载过用户信息
    if (isEmpty(userStore.roles)) {
      console.log("加载用户信息");
      //加载用户信息
      await userStore.loadInfo();
    }

    //加载动态路由
    if (isEmpty(routerStore.menuList)) {
      console.log("加载路由");
      await routerStore.generateRoutes();
      // 动态添加可访问路由表
      routerStore.routers.forEach((item) => {
        if (item.meta?.parentName) {
          router.addRoute(item.meta.parentName, item);
        } else {
          router.addRoute(item);
        }
      });
      // 触发重定向
      return to.fullPath;
    }
  });
}

export function createRouterGuard(router) {
  createNProgressGuard(router);
  createRouteListenerGuard(router);
  createInfoGuard(router);
}
