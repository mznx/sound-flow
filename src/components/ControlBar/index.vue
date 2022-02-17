<template>
  <div class="control-bar">
    <div class="control-bar-left">
      <ControlCurrentTrack />
    </div>
    <div class="control-bar-center">
      <ControlButtons />
      <ControlPlayback />
    </div>
    <div class="control-bar-right">
      <ControlDevice />
      <ControlVolume />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ControlButtons from "./ControlButtons.vue";
import ControlPlayback from "./ControlPlayback.vue";
import ControlVolume from "./ControlVolume.vue";
import ControlCurrentTrack from "./ControlCurrentTrack.vue";
import ControlDevice from "./ControlDevice.vue";

@Options({
  components: {
    ControlButtons,
    ControlPlayback,
    ControlVolume,
    ControlCurrentTrack,
    ControlDevice,
  },
})
export default class ControlBar extends Vue {}
</script>

<style scoped lang="scss">
.control-bar {
  width: 100%;
  height: 80px;
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: var(--color-fg);
  border-top: 1px solid var(--color-border);
  padding: 8px 10px;
}

.control-bar-left {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.control-bar-center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.control-bar-right {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
