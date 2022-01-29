<template>
  <CircleLoader v-if="this.loading" />
  <div class="home" v-else>
    <ControlBar />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CircleLoader from "@/components/CircleLoader/index.vue";
import ControlBar from "@/components/ControlBar/index.vue";
import api from "@/api";
import * as APIAuth from "@/types/APIAuth";

@Options({
  data() {
    return {
      loading: true,
      token: null,
    };
  },
  components: {
    CircleLoader,
    ControlBar,
  },
  methods: {
    async run() {
      // start app
      await this.connectToSpotifySDK();
      this.loading = false;
    },

    async connectToSpotifySDK() {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      const player = await api.spotify.SDK.init(this.token);
      const playback_instance = await api.spotify.SDK.connect(player);

      this.$store.commit("setPlayer", player);
      this.$store.commit("setDeviceID", playback_instance.device_id);

      await api.spotify.player.transferPlayback(this.$store.state.device_id);
    },
  },
  async mounted() {
    // check token
    this.token = localStorage.getItem("access_token");
    const res: APIAuth.CheckToken = await api.backend.auth.checkToken(
      this.token
    );
    if (res && res.status === "ok") {
      this.run();
    } else {
      this.$router.push({ name: "Login" });
    }
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
