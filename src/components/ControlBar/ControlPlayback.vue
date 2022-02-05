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
import * as utils from "@/utils";
import Slider from "@/components/Slider/index.vue";
import api from "@/api";

@Options({
  props: {
    player: Object,
    playback_state: Object,
  },

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
    is_playing: function (): boolean {
      return this.playback_state.paused;
    },
    context: function () {
      return this.playback_state.context;
    },
  },

  methods: {
    updateProgress() {
      clearInterval(this.inverval);
      this.progress = this.playback_state.position;

      if (!this.playback_state.paused) {
        this.inverval = setInterval(() => {
          if (this.progress + 1000 <= this.duration) {
            this.progress += 1000;
          }
        }, 1000);
      }
    },

    async onProgressChange() {
      await api.spotify.SDK.seek(this.player, this.progress);
    },

    getTime(value: number) {
      return utils.msToTime(value);
    },
  },

  watch: {
    context() {
      this.duration = this.playback_state.duration;
      this.progress = this.playback_state.position;
    },
    is_playing() {
      this.updateProgress();
    },
  },

  created() {
    this.duration = this.playback_state.duration;
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
