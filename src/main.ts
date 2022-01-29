import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import InlineSvg from "vue-inline-svg";

createApp(App).use(router).component("inline-svg", InlineSvg).mount("#app");
