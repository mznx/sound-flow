import { createStore } from "vuex";

export default createStore({
  state: {
    status: "pause",
    player: null,
    device_id: null,
    shuffle_state: false,
    repeat_mode: "off",
  },

  mutations: {
    setStatus(state, status) {
      state.status = status;
    },

    setPlayer(state, player) {
      state.player = player;
    },

    setDeviceID(state, device_id) {
      state.device_id = device_id;
    },

    setShuffleState(state, shuffle_state) {
      state.shuffle_state = shuffle_state;
    },

    setRepeatMode(state, repeat_mode) {
      state.repeat_mode = repeat_mode;
    },
  },
});
