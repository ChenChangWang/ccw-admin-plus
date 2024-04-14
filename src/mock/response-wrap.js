export const successResponse = (data, msg = "请求成功") => {
  return { data, status: "ok", msg, code: 200 };
};

export const failResponse = (data, msg, code = 500) => {
  return { data, status: "fail", msg, code };
};
