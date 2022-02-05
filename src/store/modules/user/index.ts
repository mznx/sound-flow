import { Module, ActionContext } from "vuex";
import { RootState } from "../../types";
import { UserState } from "./types";
import api from "@/api";
import * as API from "@/types/API";

const state: UserState = {
  user: null,
};

// GETTERS
function getUser(state: UserState): SpotifyApi.UserObjectPrivate | null {
  return state.user;
}

const getters = {
  getUser,
};

// MUTATIONS
function SET_USER(state: UserState, user: SpotifyApi.UserObjectPrivate): void {
  state.user = user;
}

const mutations = {
  SET_USER,
};

// ACTIONS
async function init({
  dispatch,
  rootGetters,
}: ActionContext<UserState, RootState>): Promise<void> {
  /* --- */ console.log("[debug] user/init (start)");
  const me = await api.spotify.users.getCurrentUsersProfile();
  if (me) {
    dispatch("setUser", me);
  }
  /* --- */ console.log("[debug] user/init user: ", state.user);
  /* --- */ console.log("[debug] user/init (end)");
}

function setUser(
  { commit }: ActionContext<UserState, RootState>,
  user: SpotifyApi.UserObjectPrivate
): void {
  commit("SET_USER", user);
}

const actions = {
  init,
  setUser,
};

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
