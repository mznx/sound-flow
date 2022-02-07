<template>
  <CircleLoader v-if="status !== 'loaded'" />
  <div class="app-layout" v-else>
    <InfoBar />
    <div class="app-layout-content">
      <div class="content-wrapper">
        <router-view />
      </div>
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
      playerInit: "player/init",
      userInit: "user/init",
    }),
  },

  async created() {
    /* --- */ console.log("[debug] AppLayout (created)");
    if (this.status === "not-logged") {
      this.$router.push({ name: "Login" });
      return;
    }

    // player.init
    if (this.status !== "loaded") {
      await this.playerInit();
      await this.userInit();
    }
  },
})
export default class AppLayout extends Vue {}
</script>

<style scoped lang="scss">
.app-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.app-layout-content {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.content-wrapper {
  margin: 0 auto;
  padding: 0 20px;
}
</style>
