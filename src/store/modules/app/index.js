import { defineStore } from "pinia";

const useAppStore = defineStore("app", {
  state: () => {
    return {
      menuFromServer: false, //菜单是否来于服务器
    };
  },
  getters: {},
  actions: {
    updatePatch(partialState) {
      this.$patch(partialState);
    },
  },
});

export default useAppStore;
