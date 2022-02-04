import { Module, ActionContext } from "vuex";
import { RootState } from "../../types";
import { PlayerState } from "./types";

const state: PlayerState = {
  player: null,
  device_id: null,
  playback_state: null,
};

// GETTERS
function getPlayer(state: PlayerState): Spotify.Player | null {
  return state.player;
}

function getDeviceId(state: PlayerState): string | null {
  return state.device_id;
}

function getPlaybackState(state: PlayerState): Spotify.PlaybackState | null {
  return state.playback_state;
}

const getters = {
  getPlayer,
  getDeviceId,
  getPlaybackState,
};

// MUTATIONS
function SET_PLAYER(state: PlayerState, player: Spotify.Player): void {
  state.player = player;
}

function SET_DEVICE_ID(state: PlayerState, device_id: string): void {
  state.device_id = device_id;
}

function SET_PLAYBACK_STATE(
  state: PlayerState,
  playback_state: Spotify.PlaybackState
): void {
  state.playback_state = playback_state;
}

const mutations = {
  SET_PLAYER,
  SET_DEVICE_ID,
  SET_PLAYBACK_STATE,
};

// ACTIONS
function init(): void {
  //
}

function setPlayer(
  { commit }: ActionContext<PlayerState, RootState>,
  player: Spotify.Player
): void {
  commit("SET_PLAYER", player);
}

function setDeviceId(
  { commit }: ActionContext<PlayerState, RootState>,
  device_id: string
): void {
  commit("SET_DEVICE_ID", device_id);
}

function setPlaybackState(
  { commit }: ActionContext<PlayerState, RootState>,
  playback_state: Spotify.PlaybackState
): void {
  commit("SET_PLAYBACK_STATE", playback_state);
}

const actions = {
  init,
  setPlayer,
  setDeviceId,
  setPlaybackState,
};

export const player: Module<PlayerState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
