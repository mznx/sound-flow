<template>
  <div class="cb-playback">
    <div class="cb-progress-time">{{ getTime(progress) }}</div>
    <div class="cb-progress-bar">
      <vue-slider
        v-model="progress"
        :max="duration"
        v-on:change="onProgressChange"
        :tooltip="'none'"
        :railStyle="{ background: 'var(--color-control)' }"
        :processStyle="{ background: 'var(--color-accent)' }"
      />
    </div>
    <div class="cb-progress-time">{{ getTime(duration) }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import * as utils from "@/utils";

@Options({
  data() {
    return {
      progress: 0,
      duration: 0,
      inverval: null,
    };
  },
  computed: {
    is_playing: function (): boolean {
      return this.$store.state.player.playback_state.paused;
    },
    context: function () {
      return this.$store.state.player.playback_state.context;
    },
  },
  methods: {
    updateProgress() {
      clearInterval(this.inverval);
      this.progress = this.$store.state.player.playback_state.position;

      if (!this.$store.state.player.playback_state.paused) {
        this.inverval = setInterval(() => {
          if (this.progress + 1000 <= this.duration) {
            this.progress += 1000;
          }
        }, 1000);
      }
    },

    onProgressChange(value: number) {
      console.log(value);
      this.$store.state.player.player.seek(value);
    },

    getTime(value: number) {
      return utils.msToTime(value);
    },
  },
  watch: {
    context() {
      this.duration = this.$store.state.player.playback_state.duration;
      this.progress = this.$store.state.player.playback_state.position;
    },
    is_playing() {
      this.updateProgress();
    },
  },
  mounted() {
    this.duration = this.$store.state.player.playback_state.duration;
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
