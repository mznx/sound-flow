import { Module, ActionContext } from "vuex";
import { RootState } from "../../types";
import { AppStatus, AppState } from "./types";

const state: AppState = {
  status: null,
};

// GETTERS
const getters = {};

// MUTATIONS
function SET_STATE(state: AppState, status: AppStatus): void {
  state.status = status;
}

const mutations = {
  SET_STATE,
};

// ACTIONS
function init({
  dispatch,
  rootGetters,
}: ActionContext<AppState, RootState>): void {
  dispatch("user/init", null, { root: true });
  if (rootGetters["auth/getAccessToken"]) {
    dispatch("player/init", null, { root: true });
  } else {
    dispatch("setState", "not-login");
  }
}

function setState(
  { commit }: ActionContext<AppState, RootState>,
  status: AppStatus
): void {
  commit("SET_STATE", status);
}

const actions = {
  init,
  setState,
};

export const app: Module<AppState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
