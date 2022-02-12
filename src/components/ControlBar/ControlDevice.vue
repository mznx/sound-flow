<template>
  <div class="cb-device">
    <inline-svg :src="require('@/assets/icons/control-device.svg')" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { mapGetters } from "vuex";

@Options({
  computed: {
    ...mapGetters({
      player: "player/getPlayer",
      device_id: "player/getDeviceId",
      playback_state: "player/getPlaybackState",
    }),
  },
})
export default class ControlDevice extends Vue {}
</script>

<style scoped lang="scss">
.cb-device {
  fill: var(--color-control);
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    fill: var(--color-control-light);
  }
}
</style>
