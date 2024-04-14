import Mock from "mockjs";
import { successResponse } from "@/mock/response-wrap";
import dayjs from "dayjs";
import numeral from "numeral";

// =========================== 最近一小时访问量 =======================

const recentSituationData = [];
const visitY = [54, 32, 43, 56, 86, 87, 80, 32, 44, 32, 54, 65, 75]; //访问量
const orderY = [5, 12, 16, 23, 15, 16, 23, 22, 14, 16, 19, 20, 15]; //订单量

for (let i = 0; i <= 12; i++) {
  recentSituationData.push({
    x: dayjs()
      .subtract(i * 5, "minute")
      .format("HH:mm"),
    visitY: visitY[i],
    orderY: orderY[i],
  });
}

Mock.mock("/api/queryRecentSituation", (params) => {
  return successResponse({
    data: recentSituationData,
  });
});
