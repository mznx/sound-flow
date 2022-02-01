<template>
  <div class="cb-buttons">
    <button
      class="cb-shuffle"
      :class="{ active: this.$store.state.player.playback_state.shuffle }"
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
        v-if="this.$store.state.player.playback_state.paused"
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
        { active: this.$store.state.player.playback_state.repeat_mode !== 0 },
        { track: this.$store.state.player.playback_state.repeat_mode === 2 },
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
      //
      api.spotify.SDK.togglePlay(this.$store.state.player.player);
    },

    previousTrack() {
      //
      api.spotify.SDK.previousTrack(this.$store.state.player.player);
    },

    nextTrack() {
      //
      api.spotify.SDK.nextTrack(this.$store.state.player.player);
    },

    toggleShuffle() {
      api.spotify.player.togglePlaybackShuffle({
        state: !this.$store.state.player.playback_state.shuffle,
        device_id: this.$store.state.player.device_id,
      });
    },

    toggleRepeatMode() {
      let repeat_mode = "";
      switch (this.$store.state.player.playback_state.repeat_mode) {
        case 0:
          repeat_mode = "context";
          break;
        case 1:
          repeat_mode = "track";
          break;
        case 2:
          repeat_mode = "off";
          break;
      }

      api.spotify.player.setRepeatMode({
        state: repeat_mode,
        device_id: this.$store.state.player.device_id,
      });
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

    &.active svg {
      fill: var(--color-accent-light);
    }

    &.track:after {
      content: "1";
      position: absolute;
      top: 4px;
      right: 4px;
      color: var(--color-fg);
      font-size: 10pt;
      font-weight: bold;
      width: 20px;
      height: 20px;
      background-color: var(--color-accent);
      border-radius: 50%;
    }

    &:hover {
      cursor: pointer;

      svg {
        fill: var(--color-control-light);
      }

      &.active svg {
        fill: #a3a1eb;
      }
    }
  }
}
</style>
