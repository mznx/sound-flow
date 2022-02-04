<template>
  <CircleLoader v-if="status !== 'loaded'" />
  <div class="home" v-else>
    <InfoBar />
    <div class="home-content">
      <router-view />
    </div>
    <ControlBar />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters, mapActions } from "vuex";
import CircleLoader from "@/components/CircleLoader/index.vue";
import InfoBar from "@/components/InfoBar/index.vue";
import ControlBar from "@/components/ControlBar/index.vue";

@Options({
  components: {
    CircleLoader,
    InfoBar,
    ControlBar,
  },

  computed: {
    ...mapGetters({
      status: "app/getStatus",
    }),
  },

  methods: {
    ...mapActions({
      init: "player/init",
    }),
  },

  created() {
    /* --- */ console.log("[debug] Home (created)");
    if (this.status === "not-logged" || this.status === "loaded") {
      this.$router.push({ name: "Login" });
      return;
    }

    // player.init
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    this.init();
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.home-content {
  width: 100%;
  height: 100%;
}
</style>
