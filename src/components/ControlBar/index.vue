<template>
  <div class="control-bar">
    <div class="cb-left">
      <ControlCurrentTrack :player="player" :playback_state="playback_state" />
    </div>
    <div class="cb-center">
      <ControlButtons
        :player="player"
        :device_id="device_id"
        :playback_state="playback_state"
      />
      <ControlPlayback :player="player" :playback_state="playback_state" />
    </div>
    <div class="cb-right">
      <ControlVolume :player="player" :playback_state="playback_state" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { mapGetters } from "vuex";
import ControlButtons from "./ControlButtons.vue";
import ControlPlayback from "./ControlPlayback.vue";
import ControlVolume from "./ControlVolume.vue";
import ControlCurrentTrack from "./ControlCurrentTrack.vue";

@Options({
  components: {
    ControlButtons,
    ControlPlayback,
    ControlVolume,
    ControlCurrentTrack,
  },

  computed: {
    ...mapGetters({
      player: "player/getPlayer",
      device_id: "player/getDeviceId",
      playback_state: "player/getPlaybackState",
    }),
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

.cb-left {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.cb-center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cb-right {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
