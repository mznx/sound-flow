<template>
  <CircleLoader v-if="status !== 'loaded'" />
  <div class="app-layout" v-else>
    <InfoBar />
    <div class="app-layout-content">
      <router-view class="content-wrapper" />
    </div>
    <ControlBar />
    <SideMenu />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters, mapActions } from "vuex";
import CircleLoader from "@/components/CircleLoader/index.vue";
import InfoBar from "@/components/InfoBar/index.vue";
import ControlBar from "@/components/ControlBar/index.vue";
import SideMenu from "@/components/SideMenu/index.vue";

@Options({
  components: {
    CircleLoader,
    InfoBar,
    ControlBar,
    SideMenu,
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
    } else if (this.status !== "loaded") {
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
  max-width: 1400px;
  margin: 20px auto;
  padding: 0 40px;
}
</style>
