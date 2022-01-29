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
      player: null,
    };
  },
  components: {
    CircleLoader,
    ControlBar,
  },
  methods: {
    async run() {
      // start app
      this.player = await this.connectToSpotifySDK();
    },

    connectToSpotifySDK() {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      return api.spotifySDK.connect(this.token);
    },
  },
  async mounted() {
    // check token
    this.token = localStorage.getItem("access_token");
    const res: APIAuth.CheckToken = await api.auth.checkToken(this.token);
    if (res && res.status === "ok") {
      this.loading = false;
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
