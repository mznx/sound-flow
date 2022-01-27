import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/Login.vue";
import Callback from "@/views/Callback.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
