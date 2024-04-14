import { defineStore } from "pinia";
import { AppState } from "@/store/modules/app/types";

const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      menuFromServer: false, //菜单是否来于服务器
    };
  },
  getters: {},
  actions: {
    updatePatch(partialState: Partial<AppState>) {
      this.$patch(partialState);
    },
  },
});

export default useAppStore;
