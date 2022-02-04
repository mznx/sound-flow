import { Module, ActionContext } from "vuex";
import { RootState } from "../../types";
import { PlayerState } from "./types";
import api from "@/api";
import * as API from "@/types/API";

const state: PlayerState = {
  player: null,
  device_id: null,
  playback: null,
  playback_state: null,
};

// GETTERS
function getPlayer(state: PlayerState): Spotify.Player | null {
  return state.player;
}

function getDeviceId(state: PlayerState): string | null {
  return state.device_id;
}

function getPlayback(
  state: PlayerState
): SpotifyApi.CurrentlyPlayingObject | null {
  return state.playback;
}

function getPlaybackState(state: PlayerState): Spotify.PlaybackState | null {
  return state.playback_state;
}

const getters = {
  getPlayer,
  getDeviceId,
  getPlayback,
  getPlaybackState,
};

// MUTATIONS
function SET_PLAYER(state: PlayerState, player: Spotify.Player): void {
  state.player = player;
}

function SET_DEVICE_ID(state: PlayerState, device_id: string): void {
  state.device_id = device_id;
}

function SET_PLAYBACK(
  state: PlayerState,
  playback: SpotifyApi.CurrentlyPlayingObject
): void {
  state.playback = playback;
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
  SET_PLAYBACK,
  SET_PLAYBACK_STATE,
};

// ACTIONS
async function init({
  dispatch,
  rootGetters,
}: ActionContext<PlayerState, RootState>): Promise<void> {
  console.log("debug: player/init");
  const waitTransferComplete = async () => {
    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        const playback_state: Spotify.PlaybackState | null =
          state.playback_state;
        if (playback_state !== null) {
          clearInterval(interval);
          resolve(playback_state);
        }
      });
    });
  };

  const access_token = rootGetters["auth/getAccessToken"];
  const player = await api.spotify.SDK.init(access_token);

  // errors
  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("playback_error", ({ message }) => {
    console.error(message);
  });

  // events
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    dispatch("setPlayer", player);
    dispatch("setDeviceId", device_id);
    api.spotify.player.transferPlayback({
      device_ids: [device_id],
    });
  });

  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  player.addListener("player_state_changed", (playback_state) => {
    console.log("current state: ", playback_state);
    dispatch("setPlaybackState", playback_state);
  });

  player.addListener("autoplay_failed", () => {
    console.log("Autoplay is not allowed by the browser autoplay rules");
  });

  const connect = await api.spotify.SDK.connect(player);
  await waitTransferComplete();

  dispatch("app/setStatus", "loaded", { root: true });
}

function setPlayer(
  { commit }: ActionContext<PlayerState, RootState>,
  player: Spotify.Player
): void {
  console.log("debug: player/setPlayer: ", player);
  commit("SET_PLAYER", player);
}

function setDeviceId(
  { commit }: ActionContext<PlayerState, RootState>,
  device_id: string
): void {
  console.log("debug: player/setDeviceId: ", device_id);
  commit("SET_DEVICE_ID", device_id);
}

function setPlayback(
  { commit }: ActionContext<PlayerState, RootState>,
  playback: SpotifyApi.CurrentlyPlayingObject
): void {
  console.log("debug: player/setPlayback: ", playback);
  commit("SET_PLAYBACK", playback);
}

function setPlaybackState(
  { commit }: ActionContext<PlayerState, RootState>,
  playback_state: Spotify.PlaybackState
): void {
  console.log("debug: player/setPlaybackState: ", playback_state);
  commit("SET_PLAYBACK_STATE", playback_state);
}

const actions = {
  init,
  setPlayer,
  setDeviceId,
  setPlayback,
  setPlaybackState,
};

export const player: Module<PlayerState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
