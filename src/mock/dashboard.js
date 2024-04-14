import Mock from "mockjs";
import { successResponse } from "@/mock/response-wrap";
import dayjs from "dayjs";
import numeral from "numeral";

// =========================== 访问量、订单量数据 =======================
const visitData = [];
const visitY = [5, 6, 9, 8, 4, 2, 3, 5, 1, 6, 8, 4, 7, 5, 6];
for (let i = visitY.length - 1; i >= 0; i--) {
  visitData.push({
    x: dayjs().subtract(i, "day").format("YYYY-MM-DD"),
    y: visitY[i],
  });
}

const orderData = [];
const orderY = [60, 70, 111, 33, 32, 52, 33, 44, 13, 21, 34, 55, 90, 34, 66];
for (let i = orderY.length - 1; i >= 0; i--) {
  orderData.push({
    x: dayjs().subtract(i, "day").format("YYYY-MM-DD"),
    y: orderY[i],
  });
}

Mock.mock("/api/queryIntroduce", (params) => {
  return successResponse({
    visitData,
    orderData,
  });
});

// =========================== 销售额、门店销售数据 =======================
const salesData = [];
const salesY = [
  1152, 2265, 988, 3561, 2654, 2335, 1246, 1236, 554, 888, 789, 933,
];
for (let i = 0; i < 12; i++) {
  salesData.push({
    x: `${i + 1}月`,
    y: salesY[i],
  });
}

const shopData = [];
for (let i = 1; i < 8; i++) {
  shopData.push({
    title: `建设路${i}号店`,
    total: 13564,
  });
}
Mock.mock("/api/querySales", (params) => {
  return successResponse({
    salesData,
    shopData,
  });
});

// =========================== 搜索用户数据 =======================

const searchUserData = [];
const searchUserY = [
  64, 85, 84, 75, 67, 56, 48, 52, 55, 34, 45, 36, 55, 67, 84,
];
for (let i = visitY.length - 1; i >= 0; i--) {
  searchUserData.push({
    x: dayjs().subtract(i, "day").format("YYYY-MM-DD"),
    y: searchUserY[i],
  });
}

Mock.mock("/api/querySearchUser", (params) => {
  return successResponse({
    data: searchUserData,
  });
});

// =========================== 热门搜索表格数据 =======================
const topSearchList = [];
for (let i = 1; i < 53; i++) {
  topSearchList.push({
    id: i,
    keyword: `搜索关键词${i}`, //
    userNum: Math.floor(Math.random() * 1000), //用户数
    range: Math.floor(Math.random() * (30 - 10 + 1)) + 10, //涨幅
    status: Math.random() < 0.5 ? 0 : 1,
  });
}
Mock.mock("/api/queryTopSearchList", (params) => {
  const { body } = params;
  const { currentPage, pageSize } = JSON.parse(body);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  return successResponse({
    list: topSearchList.slice(startIndex, endIndex),
    total: 52,
  });
});

// =========================== 销售额类别占比 =======================
const salesProportionAllData = [
  {
    name: "家用电器",
    value: 4544,
  },
  {
    name: "食用酒水",
    value: 2121,
  },
  {
    name: "个护健康",
    value: 3131,
  },
  {
    name: "服饰箱包",
    value: 2323,
  },
  {
    name: "母婴产品",
    value: 1212,
  },
  {
    name: "其他",
    value: 1261,
  },
];

const salesProportionOnlineData = [
  {
    name: "家用电器",
    value: 234,
  },
  {
    name: "食用酒水",
    value: 321,
  },
  {
    name: "个护健康",
    value: 111,
  },
  {
    name: "服饰箱包",
    value: 98,
  },
  {
    name: "母婴产品",
    value: 111,
  },
  {
    name: "其他",
    value: 131,
  },
];

const salesProportionStoreData = [
  {
    name: "家用电器",
    value: 69,
  },
  {
    name: "食用酒水",
    value: 179,
  },
  {
    name: "个护健康",
    value: 284,
  },
  {
    name: "服饰箱包",
    value: 165,
  },
  {
    name: "其他",
    value: 99,
  },
];
Mock.mock("/api/querySalesProportion", (params) => {
  const { body } = params;
  const { type } = JSON.parse(body);
  let data = [];
  if (type === "online") {
    data = salesProportionOnlineData;
  } else if (type === "store") {
    data = salesProportionStoreData;
  } else {
    data = salesProportionAllData;
  }
  return successResponse({
    data: data,
  });
});
