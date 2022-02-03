interface AppState {
  access_token: string | null;
  refresh_token: string | null;
}

const state: AppState = {
  access_token: null,
  refresh_token: null,
};

// getters
function getToken(state: AppState): string | null {
  return state.access_token;
}

function getRefreshToken(state: AppState): string | null {
  return state.refresh_token;
}

const getters = {
  getToken,
  getRefreshToken,
};

// mutations
function setToken(state: AppState, token: string): void {
  state.access_token = token;
}

function setRefreshToken(state: AppState, token: string): void {
  state.refresh_token = token;
}

const mutations = {
  setToken,
  setRefreshToken,
};

// actions
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
