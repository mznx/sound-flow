import { Module, ActionContext } from "vuex";
import { RootState } from "../../types";
import { AuthState } from "./types";
import api from "@/api";
import * as API from "@/types/API";

const state: AuthState = {
  access_token: null,
  refresh_token: null,
};

// GETTERS
function getAccessToken(state: AuthState): string | null {
  return state.access_token;
}

function getRefreshToken(state: AuthState): string | null {
  return state.refresh_token;
}

const getters = {
  getAccessToken,
  getRefreshToken,
};

// MUTATIONS
function SET_ACCESS_TOKEN(state: AuthState, token: string): void {
  state.access_token = token;
}

function SET_REFRESH_TOKEN(state: AuthState, token: string): void {
  state.refresh_token = token;
}

const mutations = {
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
};

// ACTIONS
async function init({
  dispatch,
}: ActionContext<AuthState, RootState>): Promise<void> {
  /* --- */ console.log("[debug] auth/init (start)");
  dispatch("app/setStatus", "not-logged", { root: true });
  const access_token: string | null = localStorage.getItem("access_token");
  const refresh_token: string | null = localStorage.getItem("refresh_token");

  if (access_token && refresh_token) {
    /* --- */ console.log("[debug] auth/init (check start)");
    const res_check: API.CheckToken = await api.backend.auth.checkToken(
      access_token
    );
    if (res_check.status === "ok") {
      dispatch("setAccessToken", access_token);
      dispatch("app/setStatus", "logged", { root: true });
    } else {
      const res_refresh: API.RefreshToken = await api.backend.auth.refreshToken(
        refresh_token
      );
      if ("access_token" in res_refresh) {
        localStorage.setItem("access_token", res_refresh.access_token);
        dispatch("setAccessToken", res_refresh.access_token);
        dispatch("app/setStatus", "logged", { root: true });
      }
    }
    /* --- */ console.log("[debug] auth/init (check end)");
  }
  /* --- */ console.log("[debug] auth/init (end)");
}

function setAccessToken(
  { commit }: ActionContext<AuthState, RootState>,
  access_token: string
): void {
  console.log("[debug] auth/setAccessToken: ", access_token);
  commit("SET_ACCESS_TOKEN", access_token);
}

function setRefreshToken(
  { commit }: ActionContext<AuthState, RootState>,
  refresh_token: string
): void {
  commit("SET_REFRESH_TOKEN", refresh_token);
}

const actions = {
  init,
  setAccessToken,
  setRefreshToken,
};

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
