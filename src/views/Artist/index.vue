<template>
  <div class="artist">{{ $route.params.id }}</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Arist extends Vue {}
</script>

<style scoped lang="scss">
.artist {
  width: 100%;
  height: 100%;
  color: white;
}
</style>
