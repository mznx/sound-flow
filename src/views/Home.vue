<template>
  <CircleLoader v-if="status !== 'loaded'" />
  <div class="home" v-else>
    <p>a1</p>
    <router-view />
    <p>a2</p>
    <!-- <ControlBar /> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";
import CircleLoader from "@/components/CircleLoader/index.vue";
import ControlBar from "@/components/ControlBar/index.vue";

@Options({
  components: {
    CircleLoader,
    ControlBar,
  },

  computed: {
    ...mapGetters({
      status: "app/getStatus",
    }),
  },

  methods: {},

  created() {
    /* --- */ console.log("[debug] Home (created)");
    if (this.status === "not-logged" || this.status === "loaded") {
      this.$router.push({ name: "Login" });
      return;
    }

    // player.init
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
