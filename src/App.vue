<template>
  <router-view v-if="inited" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters, mapActions } from "vuex";

@Options({
  components: {},

  computed: {
    ...mapGetters({
      inited: "app/getInitState",
      status: "app/getStatus",
    }),
  },

  methods: {
    ...mapActions({
      init: "app/init",
    }),
  },

  async created() {
    this.init();
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
