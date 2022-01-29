import { createStore } from "vuex";

export default createStore({
  state: {
    status: "pause",
    player: null,
    device_id: null,
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
  },
});
