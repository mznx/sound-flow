<template>
  <div class="cb-playback">
    <div class="cb-progress-time">{{ getTime(progress) }}</div>
    <div class="cb-progress-bar">
      <Slider
        v-model="progress"
        :style_bg="{ backgroundColor: 'var(--color-control)' }"
        :style_fg="{ backgroundColor: 'var(--color-accent)' }"
        :style_dot="{ backgroundColor: 'var(--color-control-light)' }"
        :max="duration"
        @up="onProgressChange"
      />
    </div>
    <div class="cb-progress-time">{{ getTime(duration) }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { mapGetters } from "vuex";
import * as utils from "@/utils";
import Slider from "@/components/Slider/index.vue";
import api from "@/api";

@Options({
  data() {
    return {
      progress: 0,
      duration: 0,
      inverval: null,
    };
  },

  components: {
    Slider,
  },

  computed: {
    ...mapGetters({
      player: "player/getPlayer",
      device_id: "player/getDeviceId",
      playback: "player/getPlayback",
      playback_state: "player/getPlaybackState",
    }),
    context: function () {
      return this.playback;
    },
  },

  methods: {
    updateProgress() {
      clearInterval(this.inverval);
      this.duration = this.playback.item.duration_ms;
      this.progress = this.playback.progress_ms;

      if (this.playback.is_playing) {
        this.inverval = setInterval(() => {
          if (this.progress + 1000 <= this.duration) {
            this.progress += 1000;
          }
        }, 1000);
      }
    },

    async onProgressChange() {
      if (this.playback_state)
        await api.spotify.SDK.seek(this.player, this.progress);
      else {
        await api.spotify.player.seek({
          query: { position_ms: Math.trunc(this.progress) },
        });
      }
    },

    getTime(value: number) {
      return utils.msToTime(value, false);
    },
  },

  watch: {
    context() {
      this.updateProgress();
    },
  },

  created() {
    this.updateProgress();
  },
})
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
}

.cb-progress-time {
  padding: 0 10px;
  color: var(--color-text);
  text-align: center;
}
</style>
