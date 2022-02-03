import { createStore } from "vuex";

import app from "./modules/app";
import player from "./modules/player";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    player,
  },
});
