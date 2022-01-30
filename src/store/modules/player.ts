interface PlayerState {
  player: Spotify.Player | null;
  device_id: string | null;
  playback_state: Spotify.PlaybackState | null;
}

const state: PlayerState = {
  player: null,
  device_id: null,
  playback_state: null,
};

// getters
function getPlayer(state: PlayerState): Spotify.Player | null {
  return state.player;
}

function getDeviceID(state: PlayerState): string | null {
  return state.device_id;
}

function getPlaybackState(state: PlayerState): Spotify.PlaybackState | null {
  return state.playback_state;
}

const getters = {
  getPlayer,
  getDeviceID,
  getPlaybackState,
};

// mutations
function setPlayer(state: PlayerState, player: Spotify.Player): void {
  state.player = player;
}

function setDeviceID(state: PlayerState, device_id: string): void {
  state.device_id = device_id;
}

function setPlaybackState(
  state: PlayerState,
  playback_state: Spotify.PlaybackState
): void {
  state.playback_state = playback_state;
}

const mutations = {
  setPlayer,
  setDeviceID,
  setPlaybackState,
};

// actions
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
