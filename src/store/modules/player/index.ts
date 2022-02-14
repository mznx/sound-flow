import { Module, ActionContext } from "vuex";
import { RootState } from "../../types";
import { PlayerState } from "./types";
import api from "@/api";

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
  /* --- */ console.log("[debug] player/init (start)");
  const waitTransferComplete = async () => {
    /* --- */ console.log("[debug] player/waitTransferComplete");
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

  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);

  const access_token = rootGetters["auth/getAccessToken"];
  const player = await api.spotify.SDK.init(access_token);

  // errors
  player.addListener("initialization_error", ({ message }) => {
    console.error("[Spotify WPS] ", message);
  });

  player.addListener("authentication_error", ({ message }) => {
    console.error("[Spotify WPS] ", message);
  });

  player.addListener("account_error", ({ message }) => {
    console.error("[Spotify WPS] ", message);
  });

  player.addListener("playback_error", ({ message }) => {
    console.error("[Spotify WPS] ", message);
  });

  // events
  player.addListener("ready", ({ device_id }) => {
    console.log("[Spotify WPS] Ready with Device ID", device_id);
    dispatch("setPlayer", player);
    dispatch("setDeviceId", device_id);
    api.spotify.player.transferPlayback({
      body: { device_ids: [device_id] },
    });
  });

  player.addListener("not_ready", ({ device_id }) => {
    console.log("[Spotify WPS] Device ID has gone offline", device_id);
  });

  player.addListener("player_state_changed", (playback_state) => {
    dispatch("setPlaybackState", playback_state);
    dispatch("setPlayback");
  });

  player.addListener("autoplay_failed", () => {
    console.log(
      "[Spotify WPS] Autoplay is not allowed by the browser autoplay rules"
    );
  });

  await api.spotify.SDK.connect(player);
  await waitTransferComplete();

  dispatch("app/setStatus", "loaded", { root: true });
  /* --- */ console.log("[debug] player/init (end)");
}

function setPlayer(
  { commit }: ActionContext<PlayerState, RootState>,
  player: Spotify.Player
): void {
  /* --- */ console.log("[debug] player/setPlayer: ", player);
  commit("SET_PLAYER", player);
}

function setDeviceId(
  { commit }: ActionContext<PlayerState, RootState>,
  device_id: string
): void {
  /* --- */ console.log("[debug] player/setDeviceId: ", device_id);
  commit("SET_DEVICE_ID", device_id);
}

async function setPlayback({
  commit,
}: ActionContext<PlayerState, RootState>): Promise<void> {
  const playback = await api.spotify.player.getPlaybackState({});
  /* --- */ console.log("[debug] player/setPlayback: ", playback);
  commit("SET_PLAYBACK", playback);
}

function setPlaybackState(
  { commit }: ActionContext<PlayerState, RootState>,
  playback_state: Spotify.PlaybackState
): void {
  /* --- */ console.log("[debug] player/setPlaybackState: ", playback_state);
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
