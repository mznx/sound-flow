<template>
  <div class="cb-buttons">
    <button
      class="cb-shuffle"
      :class="{ active: this.$store.state.shuffle_state }"
      @click="toggleShuffle"
    >
      <inline-svg
        :src="require('@/assets/icons/control-shuffle.svg')"
        width="30"
        height="30"
      />
    </button>

    <button class="cb-back" @click="previousTrack">
      <inline-svg
        :src="require('@/assets/icons/control-back.svg')"
        width="20"
        height="20"
      />
    </button>

    <button class="cb-playpause" @click="playPause">
      <inline-svg
        v-if="this.$store.state.status === 'pause'"
        :src="require('@/assets/icons/control-play.svg')"
        width="35"
        height="35"
      />
      <inline-svg
        v-else
        :src="require('@/assets/icons/control-pause.svg')"
        width="35"
        height="35"
      />
    </button>

    <button class="cb-forward" @click="nextTrack">
      <inline-svg
        :src="require('@/assets/icons/control-forward.svg')"
        width="20"
        height="20"
      />
    </button>

    <button
      class="cb-repeat"
      :class="[
        { active: this.$store.state.repeat_mode !== 'off' },
        { track: this.$store.state.repeat_mode === 'track' },
      ]"
      @click="toggleRepeatMode"
    >
      <inline-svg
        :src="require('@/assets/icons/control-repeat.svg')"
        width="20"
        height="20"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import api from "@/api";

@Options({
  data() {
    return {};
  },
  methods: {
    playPause() {
      this.$store.state.status === "pause"
        ? this.$store.commit("setStatus", "play")
        : this.$store.commit("setStatus", "pause");
      api.spotify.SDK.togglePlay(this.$store.state.player);
    },

    previousTrack() {
      //
      api.spotify.SDK.previousTrack(this.$store.state.player);
    },

    nextTrack() {
      //
      api.spotify.SDK.nextTrack(this.$store.state.player);
    },

    toggleShuffle() {
      this.$store.commit("setShuffleState", !this.$store.state.shuffle_state);
      api.spotify.player.togglePlaybackShuffle(
        this.$store.state.shuffle_state,
        this.$store.state.device_id
      );
    },

    toggleRepeatMode() {
      switch (this.$store.state.repeat_mode) {
        case "off":
          this.$store.commit("setRepeatMode", "context");
          break;
        case "context":
          this.$store.commit("setRepeatMode", "track");
          break;
        case "track":
          this.$store.commit("setRepeatMode", "off");
          break;
      }

      api.spotify.player.toggleRepeatMode(
        this.$store.state.repeat_mode,
        this.$store.state.device_id
      );
    },
  },
})
export default class ControlButtons extends Vue {}
</script>

<style scoped lang="scss">
.cb-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 40px;

  button {
    position: relative;
    background: none;
    border: 0;
    height: 100%;
    width: 50px;
    margin: 0 2px;

    svg {
      fill: var(--color-control);
      transition: all 0.3s ease;
    }

    &:hover {
      cursor: pointer;

      svg {
        fill: var(--color-control-hover);
      }
    }

    &.active svg {
      fill: var(--color-accent-light);
    }

    &.track:after {
      content: "1";
      position: absolute;
      top: 0;
      right: 0;
      color: var(--color-accent-light);
      font-size: 10pt;
      font-weight: bold;
    }
  }
}
</style>
