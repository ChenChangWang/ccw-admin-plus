import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import type { HttpResult } from "./index.ts";

axios.defaults.baseURL = import.meta.env.API_BASE_URL;
// 添加请求拦截器
axios.interceptors.request.use(
  function (config: InternalAxiosRequestConfig<any>) {
    // 让每个请求都携带令牌  这个例子使用JWT令牌授权是一个自定义的头密钥请根据实际情况进行修改
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response: AxiosResponse<any,any>) {
    const res = response.data;
    if (res.code !== 200) {
      //TODO 一些自定义错误可以在这里拦截做一些事情

      return Promise.reject(new Error(res.msg || "系统异常！"));
    }
    // 对响应数据做点什么
    return res;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);
