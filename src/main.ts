import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "./locale";
import directive from "@/directive";

import "./assets/styles/index.scss";

import router from "./router";
import App from "./App.vue";

import "@/api/request";
import "@/mock";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(directive);

app.mount("#app");
