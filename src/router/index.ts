import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Callback from "@/views/Callback.vue";
import NotFound from "@/views/NotFound.vue";
import Album from "@/views/Album/index.vue";
import Artist from "@/views/Artist/index.vue";
import Playlist from "@/views/Playlist/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: AppLayout,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "album/:id",
        component: Album,
      },
      {
        path: "artist/:id",
        component: Artist,
      },
      {
        path: "playlist/:id",
        component: Playlist,
      },
    ],
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
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
