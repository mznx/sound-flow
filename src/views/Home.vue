<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
