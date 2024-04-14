import { getAssetsImage } from "@/utils/util";
import dayjs from "dayjs";
import Mock from "mockjs";
import { successResponse } from "@/mock/response-wrap";

// =========================== 文章 =======================
const articleBaseList = [
  {
    title: "Vue",
    content:
      "段落示意：易学易用，性能出色，适用场景丰富的 Web 前端框架。基于标准 HTML、CSS 和 JavaScript 构建，提供容易上手的 API 和一流的文档。",
    logo: getAssetsImage("vue.png"),
    owner: "张 三",
    href: "https://www.baidu.com/",
    createDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    star: 202,
    like: 111,
    message: 18,
  },
  {
    title: "React",
    content:
      "段落示意：React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据变动时 React 能高效更新并渲染合适的组件。构建管理自身状态的封装组件，然后对其组合以构成复杂的 UI。",
    logo: getAssetsImage("react.png"),
    owner: "王小明",
    href: "https://www.baidu.com/",
    createDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    star: 131,
    like: 98,
    message: 19,
  },
  {
    title: "Bootstrap",
    content:
      "段落示意：简洁、直观、强悍的前端开发框架，让web开发更迅速、简单。",
    logo: getAssetsImage("bootstrap.png"),
    owner: "大  侠",
    href: "https://www.baidu.com/",
    createDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    star: 269,
    like: 156,
    message: 32,
  },
  {
    title: "Angular",
    content:
      "段落示意：Angular是一个应用设计框架与开发平台，用于创建高效、复杂、精致的单页面应用，通过新的属性和表达式扩展了 HTML，实现一套框架，多种平台，移动端和桌面端。Angular有着诸多特性，最为核心的是：MVVM、模块化、自动化双向数据绑定、语义化标签、依赖注入等等。",
    logo: getAssetsImage("angular.png"),
    owner: "吴十一",
    href: "https://www.baidu.com/",
    createDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    star: 153,
    like: 98,
    message: 6,
  },
  {
    title: "Webpack",
    content:
      "段落示意：webpack 是代码编译工具，有入口、出口、loader 和插件。webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。",
    logo: getAssetsImage("webpack.png"),
    owner: "王 五",
    href: "https://www.baidu.com/",
    createDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    star: 99,
    like: 98,
    message: 3,
  },
  {
    title: "Vite",
    content:
      "段落示意：vite是下一代前端开发与构建工具。 Vite意在提供开箱即用的配置，同时它的插件API和JavaScript API 带来了高度的可扩展性，并有完整的类型支持。",
    logo: getAssetsImage("vite.png"),
    owner: "狂 人",
    href: "https://www.baidu.com/",
    createDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    star: 165,
    like: 78,
    message: 20,
  },
];
const basicTotal = 62;
let articleList = [];
for (let i = 0; i < basicTotal; i++) {
  articleList.push({ ...articleBaseList[i % 6], id: `basic-list-id-${i}` });
}
Mock.mock("/api/search/articleList", (params) => {
  const { body } = params;
  const { currentPage, pageSize } = JSON.parse(body);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  return successResponse({
    list: articleList.slice(startIndex, endIndex),
    total: basicTotal,
  });
});

// =========================== 项目 =======================
const projectsBaseList = [
  {
    title: "Vue",
    description: "易学易用，性能出色，适用场景丰富的 Web 前端框架。",
    cover: getAssetsImage("bg1.jpg"),
    updateDate: dayjs().format("YYYY-MM-DD"),
    members: [
      { name: "张 三", src: getAssetsImage("people2.jpg") },
      { name: "王 五", src: getAssetsImage("people6.webp") },
      { name: "李 四", src: getAssetsImage("people3.jpg") },
    ],
  },
  {
    title: "React",
    description: "React 使创建交互式 UI 变得轻而易举",
    cover: getAssetsImage("bg2.jpg"),
    updateDate: dayjs().format("YYYY-MM-DD"),
    members: [
      { name: "张 三", src: getAssetsImage("people2.jpg") },
      { name: "王 五", src: getAssetsImage("people6.webp") },
      { name: "李 四", src: getAssetsImage("people3.jpg") },
    ],
  },
  {
    title: "Bootstrap",
    description: "简洁、直观、强悍的前端开发框架，让web开发更迅速、简单",
    cover: getAssetsImage("bg3.jpg"),
    updateDate: dayjs().format("YYYY-MM-DD"),
    members: [
      { name: "张 三", src: getAssetsImage("people2.jpg") },
      { name: "王 五", src: getAssetsImage("people6.webp") },
      { name: "李 四", src: getAssetsImage("people3.jpg") },
    ],
  },
  {
    title: "Angular",
    description:
      "Angular是一个应用设计框架与开发平台，用于创建高效、复杂、精致的单页面应用",
    cover: getAssetsImage("bg4.jpg"),
    updateDate: dayjs().format("YYYY-MM-DD"),
    members: [
      { name: "张 三", src: getAssetsImage("people2.jpg") },
      { name: "王 五", src: getAssetsImage("people6.webp") },
      { name: "李 四", src: getAssetsImage("people3.jpg") },
    ],
  },
  {
    title: "Webpack",
    description: "webpack 是代码编译工具，有入口、出口、loader 和插件。",
    cover: getAssetsImage("bg5.jpg"),
    updateDate: dayjs().format("YYYY-MM-DD"),
    members: [
      { name: "张 三", src: getAssetsImage("people2.jpg") },
      { name: "王 五", src: getAssetsImage("people6.webp") },
      { name: "李 四", src: getAssetsImage("people3.jpg") },
    ],
  },
  {
    title: "Vite",
    description:
      "vite是下一代前端开发与构建工具。 Vite意在提供开箱即用的配置，同时它的插件API和JavaScript API 带来了高度的可扩展性，并有完整的类型支持。",
    cover: getAssetsImage("bg6.jpg"),
    updateDate: dayjs().format("YYYY-MM-DD"),
    members: [
      { name: "张 三", src: getAssetsImage("people2.jpg") },
      { name: "王 五", src: getAssetsImage("people6.webp") },
      { name: "李 四", src: getAssetsImage("people3.jpg") },
    ],
  },
  {
    title: "Element Plus",
    description: "Element Plus 是一个基于 Vue 3 的高质量 UI 组件库",
    cover: getAssetsImage("bg7.jpg"),
    updateDate: dayjs().format("YYYY-MM-DD"),
    members: [
      { name: "张 三", src: getAssetsImage("people2.jpg") },
      { name: "王 五", src: getAssetsImage("people6.webp") },
      { name: "李 四", src: getAssetsImage("people3.jpg") },
    ],
  },
  {
    title: "Ant Design",
    description:
      "Ant Design 是一个基于 React 的 UI 组件库，它提供了一套丰富的组件和样式",
    cover: getAssetsImage("bg8.jpg"),
    updateDate: dayjs().format("YYYY-MM-DD"),
    members: [
      { name: "张 三", src: getAssetsImage("people2.jpg") },
      { name: "王 五", src: getAssetsImage("people6.webp") },
      { name: "李 四", src: getAssetsImage("people3.jpg") },
    ],
  },
];
const projectTotal = 8;
let projectList = [];
for (let i = 0; i < projectTotal; i++) {
  projectList.push({ ...projectsBaseList[i % 8], id: `basic-list-id-${i}` });
}
Mock.mock("/api/search/projectList", (params) => {
  const { body } = params;
  const { currentPage, pageSize } = JSON.parse(body);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  return successResponse({
    list: projectList.slice(startIndex, endIndex),
    total: projectTotal,
  });
});

// =========================== 应用 =======================
const applicationBaseList = [
  {
    title: "Vue",
    newUser: 1605,
    activeUser: 163258,
    logo: getAssetsImage("vue.png"),
  },
  {
    title: "React",
    newUser: 1402,
    activeUser: 153658,
    logo: getAssetsImage("react.png"),
  },
  {
    title: "Bootstrap",
    newUser: 1725,
    activeUser: 113313,
    logo: getAssetsImage("bootstrap.png"),
  },
  {
    title: "Angular",
    newUser: 905,
    activeUser: 165872,
    logo: getAssetsImage("angular.png"),
  },
  {
    title: "Webpack",
    newUser: 6238,
    activeUser: 125638,
    logo: getAssetsImage("webpack.png"),
  },
  {
    title: "Vite",
    newUser: 1936,
    activeUser: 456321,
    logo: getAssetsImage("vite.png"),
  },
  {
    title: "Element Plus",
    newUser: 5983,
    activeUser: 756325,
    logo: getAssetsImage("element.png"),
  },
  {
    title: "Ant Design",
    newUser: 6583,
    activeUser: 589423,
    logo: getAssetsImage("antd.png"),
  },
];
const applicationTotal = 8;
let applicationList = [];
for (let i = 0; i < applicationTotal; i++) {
  applicationList.push({
    ...applicationBaseList[i % 8],
    id: `basic-list-id-${i}`,
  });
}
Mock.mock("/api/search/applicationList", (params) => {
  const { body } = params;
  const { currentPage, pageSize } = JSON.parse(body);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  return successResponse({
    list: applicationList.slice(startIndex, endIndex),
    total: applicationTotal,
  });
});
