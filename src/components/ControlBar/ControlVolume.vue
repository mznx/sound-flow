<template>
  <div class="cb-volume">
    <Slider
      v-model="volume"
      :style_bg="{ backgroundColor: 'var(--color-control)' }"
      :style_fg="{ backgroundColor: 'var(--color-accent)' }"
      :style_dot="{ backgroundColor: 'var(--color-control-light)' }"
      :max="1"
      @up="onVolumeChange"
      @move="onVolumeChange"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { mapGetters } from "vuex";
import Slider from "@/components/Slider/index.vue";
import api from "@/api";

@Options({
  data() {
    return {
      volume: 0,
    };
  },

  components: {
    Slider,
  },

  computed: {
    ...mapGetters({
      player: "player/getPlayer",
      playback: "player/getPlayback",
      playback_state: "player/getPlaybackState",
    }),
    context: function () {
      return this.playback;
    },
  },

  methods: {
    async onVolumeChange() {
      if (this.playback_state)
        await api.spotify.SDK.setVolume(this.player, this.volume);
      else
        await api.spotify.player.setVolume({
          query: { volume_percent: Math.trunc(this.volume * 100) },
        });
    },
  },

  watch: {
    async context() {
      if (this.playback_state)
        this.volume = await api.spotify.SDK.getVolume(this.player);
      else this.volume = this.playback.device.volume_percent / 100;
    },
  },
})
export default class ControlVolume extends Vue {}
</script>

<style scoped lang="scss">
.cb-volume {
  width: 100px;
}
</style>
