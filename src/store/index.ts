import { createStore } from "vuex";

export default createStore({
  state: {
    status: "pause",
  },

  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
  },
});
