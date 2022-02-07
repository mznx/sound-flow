<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  created() {
    /* --- */ console.log("[debug] Home (created)");
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.home {
  //
}
</style>
