import { defineStore } from "pinia";
import { setToken, clearToken } from "@/utils/auth";
import { login, logout, getUserInfo, LoginParam } from "@/api/user";
import { useRouterStore } from "@/store";
import { removeRouteListener } from "@/utils/route-listener";
import type { UserState } from "@/store/modules/user/types";

const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      name: "",
      avatar: "",
      roles: [],
      permission: [],
      signature: "", //个性签名
      jobName: "", //职责名称
      group: "", //岗位
      email: "",
      profile: "", //简介
      area: [], //区域
      address: "", //具体地址
    };
  },
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    async login(loginForm: LoginParam) {
      try {
        //登录时 清除相关信息 已重新刷新获取信息的信息
        this.clearInfo();
        const { data } = await login(loginForm);
        setToken(data.token);
      } catch (error) {
        clearToken();
        throw error;
      }
    },

    async logout() {
      try {
        //调用退出接口
        await logout();
      } finally {
        this.clearInfo();
      }
    },

    clearInfo() {
      this.resetInfo();
      clearToken();
      //重置菜单
      const routerStore = useRouterStore();
      routerStore.resetInfo();
      removeRouteListener();
    },

    setInfo(partialState: Partial<UserState>) {
      this.$patch(partialState);
    },

    resetInfo() {
      this.$reset();
    },

    async loadInfo() {
      const res = await getUserInfo();
      this.setInfo(res.data);
    },
  },
});

export default useUserStore;
