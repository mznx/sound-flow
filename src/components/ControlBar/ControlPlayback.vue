<template>
  <div class="cb-playback">
    <div class="cb-progress-bar"></div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class ControlPlayback extends Vue {}
</script>

<style scoped lang="scss">
.cb-playback {
  display: flex;
  flex-grow: 1;
  align-items: center;
}

.cb-progress-bar {
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background-color: var(--color-control);
}
</style>
