import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createRouterGuard } from "@/router/guard";
import { HOME_PATH, Layout } from "./constants";

NProgress.configure({ showSpinner: false }); //进度环显示隐藏
const VITE_BASE_PATH = import.meta.env.VITE_BASE_PATH;
const router = createRouter({
  history: createWebHistory(VITE_BASE_PATH),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: HOME_PATH,
      component: Layout,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
      meta: {
        noAffix: true,
      },
    },
    {
      //将匹配所有内容并将其放在 `$route.params.pathMatch` 下
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/exception/404/index.vue"),
    },
  ],
});

createRouterGuard(router);

export default router;
