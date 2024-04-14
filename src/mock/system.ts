import Mock from "mockjs";
import { successResponse } from "@/mock/response-wrap";
import { getAssetsImage } from "@/utils/util";
import dayjs from "dayjs";
import { RoleData, SystemMenuData, UserData } from "@/api/system.ts";
import { MockParams } from "@/mock/constants.ts";

// =========================== 用户 =======================
const userList: UserData[] = [
  {
    avatar: getAssetsImage("user_ruizi.jpeg"),
    name: "瑞兹",
    userId: "10000001",
    loginUser: "ruizi",
    createDate: "2023-02-25 12:01:09",
    phone: "13800138000",
    email: "ruizi@mail.com",
    sex: "man",
    status: "normal",
    role: ["admin", "op"],
    area: ["贵州省", "贵阳市"],
    birthday: "1995-05-15",
    introduction: "寻求并肩作战的伙伴，以智慧引导胜利。",
  },
  {
    avatar: getAssetsImage("user_aixi.jpeg"),
    name: "艾希",
    userId: "10000002",
    loginUser: "aixi",
    createDate: "2023-06-01 09:00:00",
    phone: "13512345678",
    email: "aixi@mail.com",
    sex: "girl",
    status: "freeze",
    role: ["user"],
    area: ["江苏省", "南京市"],
    birthday: "1995-01-05",
    introduction: "在寒冰的庇护下，寻求荣耀与正义。",
  },
  {
    avatar: getAssetsImage("user_gailun.jpeg"),
    name: "盖伦",
    userId: "10000003",
    loginUser: "gailun",
    createDate: "2023-06-02 10:30:00",
    phone: "13623456789",
    email: "gailun@mail.com",
    sex: "man",
    status: "offline",
    role: ["op"],
    area: ["广东省", "广州市"],
    birthday: "1992-05-20",
    introduction: "无畏的战士，为荣誉与信仰而战。",
  },
  {
    avatar: getAssetsImage("user_kaitelin.jpeg"),
    name: "凯特琳",
    userId: "10000004",
    loginUser: "kaitelin",
    createDate: "2023-06-03 12:00:00",
    phone: "13734567890",
    email: "kaitelin@mail.com",
    sex: "girl",
    status: "normal",
    role: ["admin"],
    area: ["广东省", "广州市"],
    birthday: "1998-08-15",
    introduction: "精准的射击，守护我心中的正义。",
  },
  {
    avatar: getAssetsImage("user_lakesi.jpeg"),
    name: "拉克丝",
    userId: "10000005",
    loginUser: "lakesi",
    createDate: "2023-06-05 16:00:00",
    phone: "13956789012",
    email: "lakesi@mail.com",
    sex: "girl",
    status: "normal",
    role: ["admin"],
    area: ["浙江省", "杭州市"],
    birthday: "2001-03-20",
    introduction: "用光明驱散黑暗，为世界带来希望。",
  },
  {
    avatar: getAssetsImage("user_liqing.jpeg"),
    name: "李青",
    userId: "10000006",
    loginUser: "liqing",
    createDate: "2023-06-06 18:30:00",
    phone: "14067890123",
    email: "liqing@mail.com",
    sex: "man",
    status: "normal",
    role: ["admin"],
    area: ["四川省", "成都市"],
    birthday: "1994-07-05",
    introduction: "在迷雾中寻找真理，用拳头守护正义。",
  },
  {
    avatar: getAssetsImage("uesr_eyunxiaojie.jpg"),
    name: "厄运小姐",
    userId: "10000007",
    loginUser: "eyunxiaojie",
    createDate: "2023-05-15 09:00:00",
    phone: "13012345678",
    email: "eyunxiaojie@mail.com",
    sex: "girl",
    status: "normal",
    role: ["admin"],
    area: ["重庆市", "万州区"],
    birthday: "1994-02-14",
    introduction: "幸运总是眷顾着我，与我并肩作战吧！",
  },
  {
    avatar: getAssetsImage("user_aolafu.jpeg"),
    name: "奥拉夫",
    userId: "10000008",
    loginUser: "aolafu",
    createDate: "2023-05-16 11:00:00",
    phone: "13123456789",
    email: "aolafu@mail.com",
    sex: "man",
    status: "normal",
    role: ["admin"],
    area: ["湖北省", "武汉市"],
    birthday: "1989-11-05",
    introduction: "在狂怒之中，我找到了真正的自我。",
  },
  {
    avatar: getAssetsImage("user_zhaoxin.jpg"),
    name: "赵信",
    userId: "10000009",
    loginUser: "zhaoxin",
    createDate: "2023-05-24 07:00:00",
    phone: "13745678901",
    email: "zhaoxin@mail.com",
    sex: "man",
    status: "normal",
    role: ["admin"],
    area: ["湖北省", "武汉市"],
    birthday: "1990-08-15",
    introduction: "在龙的庇护下，我无所畏惧。",
  },
  {
    avatar: getAssetsImage("user_weien.png"),
    name: "薇恩",
    userId: "10000010",
    loginUser: "weien",
    createDate: "2023-05-25 08:00:00",
    phone: "13656789012",
    email: "weien@mail.com",
    sex: "girl",
    status: "normal",
    role: ["admin"],
    area: ["湖北省", "武汉市"],
    birthday: "1998-04-01",
    introduction: "在阴影中狩猎，我是薇恩，暗影猎人。",
  },
  {
    avatar: getAssetsImage("user_pichengnvjing.jpg"),
    name: "皮城女警",
    userId: "10000011",
    loginUser: "pichengnvjing",
    createDate: "2023-06-01 10:00:00",
    phone: "13812345678",
    email: "pichengnvjing@mail.com",
    sex: "girl",
    status: "normal",
    role: ["admin"],
    area: ["北京市", "朝阳区"],
    birthday: "1995-07-19",
    introduction: "以正义之名，守护城市的安宁。",
  },
  {
    avatar: getAssetsImage("user_pichengzhifaguan.jpeg"),
    name: "皮城执法官",
    userId: "10000012",
    loginUser: "pichengzhifaguan",
    createDate: "2023-06-02 12:00:00",
    phone: "13923456789",
    email: "pichengzhifagun@mail.com",
    sex: "girl",
    status: "normal",
    role: ["admin"],
    area: ["北京市", "朝阳区"],
    birthday: "1990-11-03",
    introduction: "在街头巷尾，我是守护秩序的拳头。",
  },
];

Mock.mock("/api/user/list", (params: MockParams) => {
  const { body } = params;
  const { currentPage, pageSize } = JSON.parse(body);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  return successResponse({
    list: userList.slice(startIndex, endIndex),
    total: 12,
  });
});

// =========================== 角色 =======================
const roleList: RoleData[] = [
  {
    name: "user",
    explain: "普通用户",
    createDate: "2024-02-01 11:32:06",
    updateDate: "2024-02-01 10:25:18",
    isDefault: true,
    defaultCheckedKeys: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
    ],
  },
  {
    name: "op",
    explain: "操作用户",
    createDate: "2024-02-02 11:12:26",
    updateDate: "2024-02-02 10:24:12",
    isDefault: false,
    defaultCheckedKeys: [],
  },
  {
    name: "admin",
    explain: "管理用户",
    createDate: "2024-02-03 12:35:26",
    updateDate: "2024-02-03 14:35:58",
    isDefault: false,
    defaultCheckedKeys: [],
  },
];

Mock.mock("/api/role/list", (params: MockParams) => {
  const { body } = params;
  const { currentPage, pageSize } = JSON.parse(body);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  return successResponse({
    list: roleList.slice(startIndex, endIndex),
    total: 3,
  });
});

// =========================== 菜单 =======================
let menuId = 1;
const getMenuTopData = (orderNum = 1) => {
  return {
    menuType: "top",
    isLink: false,
    orderNum,
    status: true,
    hideInMenu: false,
    createDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    id: menuId++,
  };
};

const getMenuLeftData = (orderNum = 1) => {
  return {
    icon: "",
    menuType: "menu",
    orderNum,
    isLink: false,
    query: "",
    isCache: true,
    status: true,
    hideInMenu: false,
    createDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    id: menuId++,
  };
};

const getMenuBtnData = (orderNum = 1) => {
  return {
    menuType: "btn",
    orderNum,
    createDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    id: menuId++,
  };
};

const menuList: SystemMenuData[] = [
  {
    path: "dashboard",
    icon: "uil:dashboard",
    menuName: "dashboard",
    ...getMenuTopData(1),
    children: [
      {
        path: "console",
        menuName: "控制台",
        component: "/dashboard/console/index.vue",
        permission: "dashboard:console:list",
        ...getMenuLeftData(1),
      },
      {
        path: "monitor",
        menuName: "监控页",
        component: "/dashboard/monitor/index.vue",
        permission: "dashboard:monitor:list",
        ...getMenuLeftData(2),
      },
      {
        path: "workplace",
        menuName: "工作台",
        component: "/dashboard/workplace/index.vue",
        permission: "dashboard:workplace:list",
        ...getMenuLeftData(3),
      },
    ],
  },
  {
    path: "system",
    icon: "ep:setting",
    menuName: "系统管理",
    ...getMenuTopData(2),
    children: [
      {
        path: "user",
        menuName: "用户管理",
        component: "/system/user/index.vue",
        permission: "system:user:list",
        ...getMenuLeftData(1),
        children: [
          {
            menuName: "用户查询",
            permission: "system:user:query",
            ...getMenuBtnData(1),
          },
          {
            menuName: "用户新增",
            permission: "system:user:add",
            ...getMenuBtnData(2),
          },
          {
            menuName: "用户修改",
            permission: "system:user:edit",
            ...getMenuBtnData(3),
          },
          {
            menuName: "用户删除",
            permission: "system:user:query",
            ...getMenuBtnData(4),
          },
          {
            menuName: "分配角色",
            permission: "system:user:assignRoles",
            ...getMenuBtnData(5),
          },
        ],
      },
      {
        path: "menu",
        menuName: "菜单管理",
        component: "/system/menu/index.vue",
        permission: "system:menu:list",
        ...getMenuLeftData(2),
        children: [
          {
            menuName: "菜单查询",
            permission: "system:menu:query",
            ...getMenuBtnData(1),
          },
          {
            menuName: "菜单新增",
            permission: "system:menu:add",
            ...getMenuBtnData(2),
          },
          {
            menuName: "菜单修改",
            permission: "system:menu:edit",
            ...getMenuBtnData(3),
          },
          {
            menuName: "菜单删除",
            permission: "system:menu:query",
            ...getMenuBtnData(4),
          },
        ],
      },
      {
        path: "role",
        menuName: "角色管理",
        component: "/system/role/index.vue",
        permission: "system:role:list",
        ...getMenuLeftData(3),
        children: [
          {
            menuName: "角色查询",
            permission: "system:role:query",
            ...getMenuBtnData(1),
          },
          {
            menuName: "角色新增",
            permission: "system:role:add",
            ...getMenuBtnData(2),
          },
          {
            menuName: "角色修改",
            permission: "system:role:edit",
            ...getMenuBtnData(3),
          },
          {
            menuName: "角色删除",
            permission: "system:role:query",
            ...getMenuBtnData(4),
          },
          {
            menuName: "菜单权限",
            permission: "system:role:editPerms",
            ...getMenuBtnData(5),
          },
        ],
      },
    ],
  },
  {
    path: "list",
    icon: "ph:list-fill",
    menuName: "列表页面",
    ...getMenuTopData(3),
    children: [
      {
        path: "search-table",
        menuName: "查询表格",
        component: "/list/search-table/index.vue",
        permission: "list:search-table:list",
        ...getMenuLeftData(1),
        children: [
          {
            menuName: "表格查询",
            permission: "list:search-table:query",
            ...getMenuBtnData(1),
          },
          {
            menuName: "表格新增",
            permission: "list:search-table:add",
            ...getMenuBtnData(2),
          },
          {
            menuName: "表格修改",
            permission: "list:search-table:edit",
            ...getMenuBtnData(3),
          },
          {
            menuName: "表格删除",
            permission: "list:search-table:query",
            ...getMenuBtnData(4),
          },
        ],
      },
      {
        path: "card-list",
        menuName: "卡片列表",
        component: "/list/card-list/index.vue",
        permission: "list:card-list:list",
        ...getMenuLeftData(2),
      },
      {
        path: "basic-list",
        menuName: "基础列表",
        component: "/list/basic-list/index.vue",
        permission: "list:basic-list:list",
        ...getMenuLeftData(3),
      },
    ],
  },
  {
    path: "search",
    icon: "iconamoon:search-bold",
    menuName: "搜索页面",
    ...getMenuTopData(4),
    children: [
      {
        path: "articles",
        menuName: "搜索列表（文章）",
        component: "/search/articles/index.vue",
        permission: "search:articles:list",
        ...getMenuLeftData(1),
      },
      {
        path: "projects",
        menuName: "搜索列表（项目）",
        component: "/search/projects/index.vue",
        permission: "search:projects:list",
        ...getMenuLeftData(2),
      },
      {
        path: "applications",
        menuName: "搜索列表（应用）",
        component: "/search/applications/index.vue",
        permission: "search:applications:list",
        ...getMenuLeftData(3),
      },
    ],
  },
  {
    path: "form",
    icon: "ant-design:form-outlined",
    menuName: "表单页面",
    ...getMenuTopData(5),
    children: [
      {
        path: "basic-form",
        menuName: "基础表单",
        component: "/form/basic-form/index.vue",
        permission: "form:basic-form:list",
        ...getMenuLeftData(1),
      },
      {
        path: "step-form",
        menuName: "分布表单",
        component: "/form/step-form/index.vue",
        permission: "form:step-form:list",
        ...getMenuLeftData(2),
      },
      {
        path: "advanced-form",
        menuName: "高级表单",
        component: "/form/advanced-form/index.vue",
        permission: "form:advanced-form:list",
        ...getMenuLeftData(3),
      },
    ],
  },
  {
    path: "profile",
    icon: "ri:profile-line",
    menuName: "详情页",
    ...getMenuTopData(6),
    children: [
      {
        path: "basic",
        menuName: "基础详情页",
        component: "/profile/basic/index.vue",
        permission: "profile:basic:list",
        ...getMenuLeftData(1),
      },
      {
        path: "advanced",
        menuName: "高级详情页",
        component: "/profile/advanced/index.vue",
        permission: "profile:advanced:list",
        ...getMenuLeftData(2),
      },
    ],
  },
  {
    path: "result",
    icon: "material-symbols:check-circle-outline",
    menuName: "结果页",
    ...getMenuTopData(7),
    children: [
      {
        path: "success",
        menuName: "成功页",
        component: "/result/success/index.vue",
        permission: "result:success:list",
        ...getMenuLeftData(1),
      },
      {
        path: "fail",
        menuName: "失败页",
        component: "/result/fail/index.vue",
        permission: "result:fail:list",
        ...getMenuLeftData(2),
      },
    ],
  },
  {
    path: "exception",
    icon: "material-symbols:warning-outline",
    menuName: "异常页",
    ...getMenuTopData(8),
    children: [
      {
        path: "403",
        menuName: "403",
        component: "/exception/403/index.vue",
        permission: "exception:403:list",
        ...getMenuLeftData(1),
      },
      {
        path: "404",
        menuName: "404",
        component: "/exception/404/index.vue",
        permission: "exception:404:list",
        ...getMenuLeftData(2),
      },
      {
        path: "500",
        menuName: "500",
        component: "/exception/500/index.vue",
        permission: "exception:500:list",
        ...getMenuLeftData(3),
      },
    ],
  },
  {
    path: "account",
    icon: "ph:user-bold",
    menuName: "个人页",
    ...getMenuTopData(9),
    children: [
      {
        path: "center",
        menuName: "个人中心",
        component: "/account/center/index.vue",
        permission: "account:center:list",
        ...getMenuLeftData(1),
      },
      {
        path: "settings",
        menuName: "个人设置",
        component: "/account/settings/index.vue",
        permission: "account:settings:list",
        ...getMenuLeftData(1),
      },
    ],
  },
];

Mock.mock("/api/menu/list", () => {
  return successResponse(menuList);
});
