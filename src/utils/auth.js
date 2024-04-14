import Cookies from "js-cookie";

export const TOKEN_KEY = "token";
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 }); //一天到期 new Date(new Date().getTime() + 1 * 60 * 1000)
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const clearToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isLogin = () => {
  return !!getToken();
};
