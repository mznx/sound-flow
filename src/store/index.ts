import { createStore } from "vuex";
import { RootState } from "./types";

import { app } from "./modules/app/";
import { auth } from "./modules/auth/";
import { player } from "./modules/player/";
import { user } from "./modules/user/";

export default createStore<RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    auth,
    player,
    user,
  },
});
