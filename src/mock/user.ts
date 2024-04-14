import Mock from "mockjs";
import type { MockParams } from "@/mock/constants.ts";
import { failResponse, successResponse } from "@/mock/response-wrap";
import { getAssetsImage, isEmpty } from "@/utils/util";
import { isLogin } from "@/utils/auth";
import { AppRouteRecordRaw, MenuData } from "@/router/constants.ts";
import { UserState } from "@/store/modules/user/types.ts";

//登录
Mock.mock("/api/user/login", (params: MockParams) => {
  const { body } = params;
  const { username, password } = JSON.parse(body);
  if (isEmpty(username)) {
    return failResponse(null, "用户名不能为空");
  }
  if (isEmpty(password)) {
    return failResponse(null, "密码不能为空");
  }
  if (username === "admin" && password === "123456") {
    window.localStorage.setItem("userRole", "admin");
    window.localStorage.setItem("username", "admin");
    return successResponse({
      token: "111222333444555666",
    });
  }

  if (username === "user" && password === "123456") {
    window.localStorage.setItem("userRole", "user");
    window.localStorage.setItem("username", "user");
    return successResponse({
      token: "11558899663322",
    });
  }
  return failResponse(null, "账号密码错误");
});

//退出
Mock.mock("/api/user/logout", () => {
  return successResponse(null, "退出成功！");
});

//获取用户信息
Mock.mock("/api/user/queryInfo", () => {
  if (!isLogin()) {
    return failResponse(null, "账号未登录", 401);
  }
  const role = window.localStorage.getItem("userRole") || "admin";
  const username = window.localStorage.getItem("username") || "admin";
  const info: UserState = {
    name: username,
    avatar: getAssetsImage("people6.webp"),
    roles: [role],
    permission: role === "admin" ? ["list:search-table:add"] : [],
    signature: "勇敢面对，从容生活。",
    jobName: "前端工程师",
    group: "某某平台-某某技术部-前端架构工作团队",
    email: "1337348010@qq.com",
    profile: "个人简介",
    area: ["贵州省", "贵阳市"],
    address: "",
  };

  return successResponse(info);
});

const menuList: MenuData[] = [
  {
    path: "/dashboard",
    name: "dashboard",
    id: "1",
    meta: {
      title: "仪表盘",
      lang: {
        en: "dashboard",
      },
      icon: "uil:dashboard",
    },
  },
  {
    path: "console",
    name: "Console",
    id: "2",
    parentId: "1",
    component: "/dashboard/console/index.vue",
    meta: {
      title: "控制台",
      lang: {
        en: "console",
      },
    },
  },
  {
    path: "/list",
    name: "list",
    id: "3",
    meta: {
      title: "列表页面",
      lang: {
        en: "list",
      },
      icon: "ph:list-fill",
    },
  },
  {
    path: "search-table",
    name: "SearchTable",
    id: "4",
    parentId: "3",
    component: "/list/search-table/index.vue",
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
    id: "5",
    parentId: "3",
    component: "/list/card-list/index.vue",
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
    id: "6",
    parentId: "3",
    component: "/list/basic-list/index.vue",
    meta: {
      title: "基础列表",
      lang: {
        en: "basicList",
      },
    },
  },
  {
    path: "/faq",
    name: "faq",
    id: "7",
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

Mock.mock("/api/user/queryMenu", () => {
  return successResponse(menuList);
});
