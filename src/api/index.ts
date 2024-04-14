/**
 * 接口返回结果
 */
export interface HttpResult<T = unknown> {
  status: string;
  msg: string;
  code: number;
  data: T;
}

/**
 * 分页查询返回结构
 */
export interface PageResult<T = unknown> {
  list: T[];
  total: number;
}

/**
 * 分页查询基本参数
 */
export interface PageParam {
  currentPage: number;
  pageSize: number;
}
export interface Pagination {
  currentPage: number;
  pageSize: number;
  total: number;
}
