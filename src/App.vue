<template>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters, mapActions } from "vuex";
import AppLayout from "@/layouts/AppLayout.vue";

@Options({
  components: {
    AppLayout,
  },

  computed: {
    ...mapGetters({
      status: "app/getStatus",
    }),
  },

  methods: {
    ...mapActions({
      init: "app/init",
    }),
  },

  async created() {
    await this.init();
    /* --- */ console.log("[debug] status: ", this.status);
    switch (this.status) {
      case "logged":
        /* --- */ console.log("[debug] log -> go home");
        this.$router.push({ name: "Home" });
        break;
      case "not-logged":
        /* --- */ console.log("[debug] no log -> go login");
        this.$router.push({ name: "Login" });
        break;
      default:
        /* --- */ console.log("[debug] default?");
        break;
    }
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "assets/styles/main.scss";

#app {
  width: 100%;
  height: 100%;
}
</style>
