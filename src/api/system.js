import axios from "axios";

export function getUserList(data) {
  return axios.post("/api/user/list", data);
}

export function getRoleList(data) {
  return axios.post("/api/role/list", data);
}

export function getMenuList(data) {
  return axios.post("/api/menu/list", data);
}

export function queryIconList(params, source) {
  const instance = axios.create();
  return instance.get("https://api.simplesvg.com/search", {
    cancelToken: source?.token,
    params,
  });
}

export function collectionIconList(prefix = "ep", source) {
  const instance = axios.create();
  return instance.get("https://api.simplesvg.com/collection", {
    cancelToken: source?.token,
    params: { prefix: prefix, pretty: 1 },
  });
}
