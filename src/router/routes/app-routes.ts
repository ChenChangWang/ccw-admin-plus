import { AppRouteRecordRaw, Layout } from "@/router/constants";

/**
 * meta:{
 *  title: 导航、面包屑导航以及页面中展示的标题
 *  lang: 国际化语言包根据对应的key生成标题
 *  noCache：如果设置为true页面将不会被缓存
 *  noAffix：如果设置为true，标签将不会添加到tabs-nav页签中
 *  hideInMenu：如果设置为true后，左侧菜单中隐藏该选项
 *  icon：菜单配置的iconify图标字符串，更多配置详情前往https://iconify.design/查看
 *  roles：配置能够访问该页面的角色，默认不配置则都能访问
 *  link：外部网页链接
 *  orderNum: 路由的排序字段，
 *  parentName：新增路由时的父路由名称
 * }
 */
const routes: AppRouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Layout,
    meta: {
      title: "仪表盘",
      lang: {
        en: "dashboard",
      },
      icon: "uil:dashboard",
    },
    children: [
      {
        path: "console",
        name: "Console",
        component: () => import("@/views/dashboard/console/index.vue"),
        meta: {
          title: "控制台",
          lang: {
            en: "console",
          },
        },
      },
      {
        path: "monitor",
        name: "Monitor",
        component: () => import("@/views/dashboard/monitor/index.vue"),
        meta: {
          title: "监控页",
          lang: {
            en: "monitor",
          },
        },
      },
      {
        path: "workplace",
        name: "Workplace",
        component: () => import("@/views/dashboard/workplace/index.vue"),
        meta: {
          title: "工作台",
          lang: {
            en: "workplace",
          },
          roles: ["admin"],
        },
      },
    ],
  },
  {
    path: "/system",
    name: "system",
    component: Layout,
    meta: {
      title: "系统管理",
      lang: {
        en: "system",
      },
      icon: "ep:setting",
      roles: ["admin"],
    },
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/system/user/index.vue"),
        meta: {
          title: "用户管理",
          lang: {
            en: "user system",
          },
        },
      },
      {
        path: "menu",
        name: "Menu",
        component: () => import("@/views/system/menu/index.vue"),
        meta: {
          title: "菜单管理",
          lang: {
            en: "menu system",
          },
        },
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/system/role/index.vue"),
        meta: {
          title: "角色管理",
          lang: {
            en: "role system",
          },
        },
      },
    ],
  },
  {
    path: "/list",
    name: "list",
    component: Layout,
    meta: {
      title: "列表页面",
      lang: {
        en: "list",
      },
      icon: "ph:list-fill",
    },
    children: [
      {
        path: "search-table",
        name: "SearchTable",
        component: () => import("@/views/list/search-table/index.vue"),
        meta: {
          title: "查询表格",
          lang: {
            en: "searchTable",
          },
        },
      },
      {
        path: "card-list",
        name: "CardList",
        component: () => import("@/views/list/card-list/index.vue"),
        meta: {
          title: "卡片列表",
          lang: {
            en: "cardList",
          },
        },
      },
      {
        path: "basic-list",
        name: "BasicList",
        component: () => import("@/views/list/basic-list/index.vue"),
        meta: {
          title: "基础列表",
          lang: {
            en: "basicList",
          },
        },
      },
    ],
  },
  {
    path: "/search",
    name: "search",
    component: Layout,
    meta: {
      title: "搜索页面",
      lang: {
        en: "search",
      },
      icon: "iconamoon:search-bold",
    },
    children: [
      {
        path: "articles",
        name: "Articles",
        component: () => import("@/views/search/articles/index.vue"),
        meta: {
          title: "搜索列表（文章）",
          lang: {
            en: "search （articles）",
          },
        },
      },
      {
        path: "projects",
        name: "Projects",
        component: () => import("@/views/search/projects/index.vue"),
        meta: {
          title: "搜索列表（项目）",
          lang: {
            en: "search （projects）",
          },
        },
      },
      {
        path: "applications",
        name: "Applications",
        component: () => import("@/views/search/applications/index.vue"),
        meta: {
          title: "搜索列表（应用）",
          lang: {
            en: "search （applications）",
          },
        },
      },
    ],
  },
  {
    path: "/form",
    name: "form",
    component: Layout,
    meta: {
      title: "表单页面",
      lang: {
        en: "form",
      },
      icon: "ant-design:form-outlined",
    },
    children: [
      {
        path: "basic-form",
        name: "BasicForm",
        component: () => import("@/views/form/basic-form/index.vue"),
        meta: {
          title: "基础表单",
          lang: {
            en: "basic form",
          },
        },
      },
      {
        path: "step-form",
        name: "StepForm",
        component: () => import("@/views/form/step-form/index.vue"),
        meta: {
          title: "分布表单",
          lang: {
            en: "step form",
          },
        },
      },
      {
        path: "advanced-form",
        name: "AdvancedForm",
        component: () => import("@/views/form/advanced-form/index.vue"),
        meta: {
          title: "高级表单",
          lang: {
            en: "advanced form",
          },
        },
      },
    ],
  },
  {
    path: "/profile",
    name: "profile",
    component: Layout,
    meta: {
      title: "详情页",
      lang: {
        en: "profile",
      },
      icon: "ri:profile-line",
    },
    children: [
      {
        path: "basic",
        name: "Basic",
        component: () => import("@/views/profile/basic/index.vue"),
        meta: {
          title: "基础详情页",
          lang: {
            en: "basic profile",
          },
        },
      },
      {
        path: "advanced",
        name: "Advanced",
        component: () => import("@/views/profile/advanced/index.vue"),
        meta: {
          title: "高级详情页",
          lang: {
            en: "advanced profile",
          },
        },
      },
    ],
  },
  {
    path: "/result",
    name: "result",
    component: Layout,
    meta: {
      title: "结果页",
      lang: {
        en: "result",
      },
      icon: "material-symbols:check-circle-outline",
    },
    children: [
      {
        path: "success",
        name: "Success",
        component: () => import("@/views/result/success/index.vue"),
        meta: {
          title: "成功页",
          lang: {
            en: "success",
          },
        },
      },
      {
        path: "fail",
        name: "Fail",
        component: () => import("@/views/result/fail/index.vue"),
        meta: {
          title: "失败页",
          lang: {
            en: "fail",
          },
        },
      },
    ],
  },
  {
    path: "/exception",
    name: "exception",
    component: Layout,
    meta: {
      title: "异常页",
      lang: {
        en: "exception",
      },
      icon: "material-symbols:warning-outline",
    },
    children: [
      {
        path: "403",
        name: "403",
        component: () => import("@/views/exception/403/index.vue"),
        meta: {
          title: "403",
          lang: {
            en: "403",
          },
        },
      },
      {
        path: "404",
        name: "404",
        component: () => import("@/views/exception/404/index.vue"),
        meta: {
          title: "404",
          lang: {
            en: "404",
          },
        },
      },
      {
        path: "500",
        name: "500",
        component: () => import("@/views/exception/500/index.vue"),
        meta: {
          title: "500",
          lang: {
            en: "500",
          },
        },
      },
    ],
  },
  {
    path: "/account",
    name: "account",
    component: Layout,
    meta: {
      title: "个人页",
      lang: {
        en: "account",
      },
      icon: "ph:user-bold",
    },
    children: [
      {
        path: "center",
        name: "Center",
        component: () => import("@/views/account/center/index.vue"),
        meta: {
          title: "个人中心",
          lang: {
            en: "account center",
          },
        },
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/views/account/settings/index.vue"),
        meta: {
          title: "个人设置",
          lang: {
            en: "account settings",
          },
        },
      },
    ],
  },
  /*  {
    path: "/about",
    name: "about",
    component: () => import("@/views/about/index.vue"),
    meta: {
      title: "关于",
      lang: {
        en: "about",
      },
      parentName: "root",
      icon: "uil:dashboard",
    },
  },*/
  {
    path: "/faq",
    name: "faq",
    meta: {
      title: "外链",
      lang: {
        en: "out link",
      },
      icon: "ep:question-filled",
      link: "https://element-plus.org/zh-CN/",
    },
  },
];

export default routes;
