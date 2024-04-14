import { getAssetsImage } from "@/utils/util";
import dayjs from "dayjs";
import Mock from "mockjs";
import { successResponse } from "@/mock/response-wrap";

let messageList = [
  {
    id: 1,
    title: "张三",
    subTitle: "的私信",
    content: "代码提提交，请检阅",
    avatar: getAssetsImage("people5.webp"),
    date: "今天 10:23:16",
    isRead: false,
  },
  {
    id: 2,
    title: "李四",
    subTitle: "的私信",
    content: "审批已提交，请查收",
    avatar: getAssetsImage("people2.jpg"),
    date: "今天 11:46:10",
    isRead: false,
  },
  {
    id: 3,
    title: "王小二",
    subTitle: "的回复",
    content: "文章写的不错",
    avatar: getAssetsImage("people6.webp"),
    date: "2024-01-02 10:23:16",
    isRead: false,
  },
  {
    id: 4,
    title: "陈昌望",
    subTitle: "的私信",
    content: "改代码提交重构，请核查",
    avatar: getAssetsImage("people3.jpg"),
    date: "今天 12:23:16",
    isRead: false,
  },
  {
    id: 5,
    title: "程序员",
    subTitle: "私信",
    content: "审批已提交，请查收",
    avatar: getAssetsImage("people4.jpg"),
    date: "今天 16:20:06",
    isRead: false,
  },
];
let noticeList = [
  {
    id: 1,
    title: "加班通知",
    content: "开发组今晚加班上线",
    date: "今天 10:23:16",
    isRead: false,
  },
  {
    id: 2,
    title: "审批通知",
    content: "您的请假审批已通过",
    date: "今天 12:46:15",
    isRead: false,
  },
  {
    id: 3,
    title: "会议通知",
    content: "明天早上9点统一会议",
    date: "2024-01-12 11:27:46",
    isRead: false,
  },
];
let todoList = [
  {
    id: 1,
    title: "技术部小王申请离职",
    status: "success",
    statusLabel: "未开始",
    endDesc: "请在24小时之前完成",
    isRead: false,
  },
  {
    id: 2,
    title: "XX页面XX功能bug修复",
    status: "info",
    statusLabel: "进行中",
    endDesc: "请于2024-02-01之前完成",
    isRead: false,
  },
  {
    id: 3,
    title: "XX页面样式优化调整",
    status: "danger",
    statusLabel: "即将超时",
    endDesc: "请于12小时之内完成",
    isRead: false,
  },
];

Mock.mock("/api/message/queryMessage", () => {
  const total = messageList.filter((item) => !item.isRead).length;
  return successResponse({ list: messageList, total });
});

Mock.mock("/api/message/queryNotice", () => {
  const total = noticeList.filter((item) => !item.isRead).length;

  return successResponse({ list: noticeList, total });
});
Mock.mock("/api/message/queryTodo", () => {
  const total = todoList.filter((item) => !item.isRead).length;
  return successResponse({ list: todoList, total });
});

Mock.mock("/api/message/messageRead", (params) => {
  const { body } = params;
  const { id } = JSON.parse(body);
  const data = messageList.find((item) => id === item.id);
  if (data) {
    data.isRead = true;
  }
  return successResponse();
});
Mock.mock("/api/message/noticeRead", (params) => {
  const { body } = params;
  const { id } = JSON.parse(body);
  const data = noticeList.find((item) => id === item.id);
  if (data) {
    data.isRead = true;
  }
  return successResponse();
});

Mock.mock("/api/message/todoRead", (params) => {
  const { body } = params;
  const { id } = JSON.parse(body);
  const data = todoList.find((item) => id === item.id);
  if (data) {
    data.isRead = true;
  }
  return successResponse();
});

Mock.mock("/api/message/messageAllRead", () => {
  messageList.forEach((item) => (item.isRead = true));
  return successResponse();
});

Mock.mock("/api/message/noticeAllRead", () => {
  noticeList.forEach((item) => (item.isRead = true));
  return successResponse();
});
Mock.mock("/api/message/todoAllRead", () => {
  todoList.forEach((item) => (item.isRead = true));
  return successResponse();
});

Mock.mock("/api/message/messageClear", () => {
  messageList = [];
  return successResponse();
});

Mock.mock("/api/message/noticeClear", () => {
  noticeList = [];
  return successResponse();
});
Mock.mock("/api/message/todoClear", () => {
  todoList = [];
  return successResponse();
});
