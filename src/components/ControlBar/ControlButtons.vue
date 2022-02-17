<template>
  <div class="cb-buttons">
    <button
      class="cb-shuffle"
      :class="{ active: this.playback.shuffle_state }"
      @click="toggleShuffle"
    >
      <inline-svg :src="require('@/assets/icons/control-shuffle.svg')" />
    </button>

    <button class="cb-back" @click="previousTrack">
      <inline-svg :src="require('@/assets/icons/control-back.svg')" />
    </button>

    <button class="cb-playpause" @click="playPause">
      <inline-svg
        v-if="!this.playback.is_playing"
        :src="require('@/assets/icons/control-play.svg')"
        width="30px"
        height="30px"
      />
      <inline-svg
        v-else
        :src="require('@/assets/icons/control-pause.svg')"
        width="30px"
        height="30px"
      />
    </button>

    <button class="cb-forward" @click="nextTrack">
      <inline-svg :src="require('@/assets/icons/control-forward.svg')" />
    </button>

    <button
      class="cb-repeat"
      :class="[
        { active: this.playback.repeat_state !== 'off' },
        { track: this.playback.repeat_state === 'track' },
      ]"
      @click="toggleRepeatMode"
    >
      <inline-svg :src="require('@/assets/icons/control-repeat.svg')" />
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { mapGetters } from "vuex";
import api from "@/api";

@Options({
  computed: {
    ...mapGetters({
      player: "player/getPlayer",
      device_id: "player/getDeviceId",
      playback: "player/getPlayback",
      playback_state: "player/getPlaybackState",
    }),
  },

  methods: {
    async playPause() {
      //
      if (this.playback_state) await api.spotify.SDK.togglePlay(this.player);
      else if (this.playback.is_playing)
        await api.spotify.player.pausePlayback({});
      else await api.spotify.player.startPlayback({});
    },

    async previousTrack() {
      //
      if (this.playback_state) await api.spotify.SDK.previousTrack(this.player);
      else await api.spotify.player.prevTrack({});
    },

    async nextTrack() {
      //
      if (this.playback_state) await api.spotify.SDK.nextTrack(this.player);
      else await api.spotify.player.nextTrack({});
    },

    async toggleShuffle() {
      await api.spotify.player.togglePlaybackShuffle({
        query: {
          state: !this.playback.shuffle_state,
        },
      });
    },

    async toggleRepeatMode() {
      let repeat_mode = "";
      switch (this.playback.repeat_state) {
        case "off":
          repeat_mode = "context";
          break;
        case "context":
          repeat_mode = "track";
          break;
        case "track":
          repeat_mode = "off";
          break;
      }

      await api.spotify.player.setRepeatMode({
        query: {
          state: repeat_mode,
        },
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
      top: 0px;
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
