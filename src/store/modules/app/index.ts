import { Module, ActionContext } from "vuex";
import { RootState } from "../../types";
import { AppStatus, AppState } from "./types";

const state: AppState = {
  status: null,
};

// GETTERS
function getStatus(state: AppState): AppStatus {
  return state.status;
}

const getters = {
  getStatus,
};

// MUTATIONS
function SET_STATUS(state: AppState, status: AppStatus): void {
  state.status = status;
}

const mutations = {
  SET_STATUS,
};

// ACTIONS
async function init({
  dispatch,
}: ActionContext<AppState, RootState>): Promise<void> {
  /* --- */ console.log("[debug] app/init (start)");
  await dispatch("auth/init", null, { root: true });
  /* --- */ console.log("[debug] app/init (end)");
  // if (rootGetters["auth/getAccessToken"]) {
  //   dispatch("player/init", null, { root: true });
  // }
}

function setStatus(
  { commit }: ActionContext<AppState, RootState>,
  status: AppStatus
): void {
  console.log("[debug] app/setStatus: ", status);
  commit("SET_STATUS", status);
}

const actions = {
  init,
  setStatus,
};

export const app: Module<AppState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
