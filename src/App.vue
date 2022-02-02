<template>
  <AppLayout />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppLayout from "@/layouts/AppLayout.vue";

@Options({
  components: {
    AppLayout,
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
