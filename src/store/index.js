import { createPinia } from "pinia";
import useAppStore from "./modules/app";
import useLayoutStore from "@/store/modules/layout";
import useUserStore from "./modules/user";
import useRouterStore from "./modules/router";
import useTabsNavStore from "./modules/tabs-nav";

const pinia = createPinia();

export {
  useAppStore,
  useLayoutStore,
  useUserStore,
  useRouterStore,
  useTabsNavStore,
};
export default pinia;
