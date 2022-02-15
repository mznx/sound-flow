import { Module, ActionContext } from "vuex";
import { RootState } from "../../types";
import { AppStatus, AppState } from "./types";

const state: AppState = {
  inited: false,
  status: null,
};

// GETTERS
function getInitState(state: AppState): boolean {
  return state.inited;
}

function getStatus(state: AppState): AppStatus {
  return state.status;
}

const getters = {
  getInitState,
  getStatus,
};

// MUTATIONS
function SET_INIT_STATE(state: AppState, inited: boolean): void {
  state.inited = inited;
}

function SET_STATUS(state: AppState, status: AppStatus): void {
  state.status = status;
}

const mutations = {
  SET_INIT_STATE,
  SET_STATUS,
};

// ACTIONS
async function init({
  dispatch,
}: ActionContext<AppState, RootState>): Promise<void> {
  /* --- */ console.log("[debug] app/init (start)");
  await dispatch("auth/init", null, { root: true });
  dispatch("setInitState", true);
  /* --- */ console.log("[debug] app/init (end)");
}

function setInitState(
  { commit }: ActionContext<AppState, RootState>,
  inited: boolean
): void {
  /* --- */ console.log("[debug] app/setInitState: ", inited);
  commit("SET_INIT_STATE", inited);
}

function setStatus(
  { commit }: ActionContext<AppState, RootState>,
  status: AppStatus
): void {
  /* --- */ console.log("[debug] app/setStatus: ", status);
  commit("SET_STATUS", status);
}

const actions = {
  init,
  setInitState,
  setStatus,
};

export const app: Module<AppState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
