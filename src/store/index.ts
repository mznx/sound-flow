import { createStore } from "vuex";
import { RootState } from "./types";

import { app } from "./modules/app/";
import { auth } from "./modules/auth/";
import { player } from "./modules/player/";

export default createStore<RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    auth,
    player,
  },
});
