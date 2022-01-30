import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import InlineSvg from "vue-inline-svg";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import store from "@/store";

createApp(App)
  .use(router)
  .use(store)
  .component("inline-svg", InlineSvg)
  .component("VueSlider", VueSlider)
  .mount("#app");
