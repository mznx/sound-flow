<template>
  <div class="info-bar"></div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({})
export default class ControlBar extends Vue {}
</script>

<style scoped lang="scss">
.info-bar {
  width: 100%;
  height: 50px;
  background-color: var(--color-fg);
  border-bottom: 1px solid #594d7e;
  flex-shrink: 0;
}
</style>
