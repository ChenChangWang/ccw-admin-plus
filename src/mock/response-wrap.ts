export const successResponse = (data?: unknown, msg: string = "请求成功") => {
  return { data, status: "ok", msg, code: 200 };
};

export const failResponse = (data?: unknown, msg?: string, code = 500) => {
  return { data, status: "fail", msg, code };
};
