import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import InlineSvg from "vue-inline-svg";
import store from "@/store";

createApp(App)
  .use(router)
  .use(store)
  .component("inline-svg", InlineSvg)
  .mount("#app");
