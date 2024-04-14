import axios from "axios";
import type { PageResult, PageParam } from "./index.ts";

export type AxisData = { x: string; y: number };

export interface IntroduceData {
  visitData: AxisData[]; //访问量
  orderData: AxisData[]; //订单量数据
}

export interface ShopData {
  title: string;
  total: number;
} //门店销售数据

export interface SalesData {
  salesData: AxisData[]; //销售额
  shopData: ShopData[]; //门店销售数据
}

export interface TopSearchData {
  id: number;
  keyword: string; //搜索关键词
  userNum: number; //用户数
  range: number; //涨幅
  status: number; //状态
}

export interface TopSearchParam extends PageParam {}

export interface SalesProportionData {
  name: string;
  value: number;
}

export type SalesProportionType = "all" | "online" | "store";
export interface SalesProportionParam {
  type: SalesProportionType;
}

export function getIntroduceData() {
  return axios.post<IntroduceData>("/api/queryIntroduce");
}

export function getSalesData() {
  return axios.post<SalesData>("/api/querySales");
}

export function getSearchUserData() {
  return axios.post<{ x: string; y: string }[]>("/api/querySearchUser");
}

export function getTopSearchData(data: TopSearchParam) {
  return axios.post<PageResult<TopSearchData>>("/api/queryTopSearchList", data);
}

export function getSalesProportionData(data: SalesProportionParam) {
  return axios.post<SalesProportionData[]>("/api/querySalesProportion", data);
}
