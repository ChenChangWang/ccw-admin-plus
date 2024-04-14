import Mock from "mockjs";
import type { MockParams } from "@/mock/constants.ts";
import { successResponse } from "@/mock/response-wrap";
import { getAssetsImage } from "@/utils/util";
import dayjs from "dayjs";
import { BasicData } from "@/api/list.ts";

// =========================== 搜索表格 =======================
const dataList = Mock.mock({
  "list|62": [
    {
      "id|6": /[a-z]/, //规则名称
      "ruleName|6-8": /[A-Z]/, //规则名称
      describe: "这是一段描述", //描述
      "serviceCallNumber|2-4": /[0-9]/, //服务调用次数
      "status|1": ["closed", "running", "online", "exception"], //关闭 运行中 已上线 异常
      prevCallTime: Mock.Random.datetime(), //上次调用时间
    },
  ],
});

Mock.mock("/api/list/searchTable", (params: MockParams) => {
  const { body } = params;
  const { currentPage, pageSize } = JSON.parse(body);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  return successResponse({
    list: dataList.list.slice(startIndex, endIndex),
    total: 62,
  });
});

// =========================== 基础列表 =======================

const basicBaseList: BasicData[] = [
  {
    title: "Vue",
    description: "易学易用，性能出色，适用场景丰富的 Web 前端框架。",
    logo: getAssetsImage("vue.png"),
    name: "张 三",
    startDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    percent: Math.ceil(Math.random() * 50) + 50,
  },
  {
    title: "React",
    description: "React 使创建交互式 UI 变得轻而易举。",
    logo: getAssetsImage("react.png"),
    name: "王小明",
    startDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    percent: Math.ceil(Math.random() * 50) + 50,
  },
  {
    title: "Bootstrap ",
    description: "简洁、直观、强悍的前端开发框架。",
    logo: getAssetsImage("bootstrap.png"),
    name: "大侠",
    startDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    percent: Math.ceil(Math.random() * 50) + 50,
  },
  {
    title: "Angular ",
    description: "Angular是一个应用设计框架与开发平台。",
    logo: getAssetsImage("angular.png"),
    name: "吴十一",
    startDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    percent: Math.ceil(Math.random() * 50) + 50,
  },
  {
    title: "Webpack ",
    description: "webpack 是代码编译工具，有入口、出口、loader 和插件。",
    logo: getAssetsImage("webpack.png"),
    name: "王 五",
    startDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    percent: Math.ceil(Math.random() * 50) + 50,
  },
  {
    title: "Vite ",
    description: "vite是下一代前端开发与构建工具。",
    logo: getAssetsImage("vite.png"),
    name: "狂 人",
    startDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    percent: Math.ceil(Math.random() * 50) + 50,
  },
];
const basicTotal = 62;
let basicList: BasicData[] = [];
for (let i = 0; i < basicTotal; i++) {
  basicList.push({ ...basicBaseList[i % 6], id: `basic-list-id-${i}` });
}

Mock.mock("/api/list/basicList", (params: MockParams) => {
  const { body } = params;
  const { currentPage, pageSize } = JSON.parse(body);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  return successResponse({
    list: basicList.slice(startIndex, endIndex),
    total: basicTotal,
  });
});

Mock.mock("/api/list/basicAdd", (params: MockParams) => {
  const { body } = params;
  const data = JSON.parse(body);
  data.id = `basic-list-id-${basicList.length}`;
  data.logo = getAssetsImage("vite.png");
  data.percent = Math.ceil(Math.random() * 50) + 50;
  basicList.unshift(data);
  return successResponse();
});

Mock.mock("/api/list/basicEdit", (params: MockParams) => {
  const { body } = params;
  const data = JSON.parse(body);
  const index = basicList.findIndex((item) => (item.id = data.id));
  Object.assign(basicList[index], data);
  return successResponse();
});

Mock.mock("/api/list/basicDelete", (params: MockParams) => {
  const { body } = params;
  const data = JSON.parse(body);
  basicList = basicList.filter((item) => item.id != data.id);
  return successResponse();
});
