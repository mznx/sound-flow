<template>
  <div class="track-list">
    <div v-for="(track, i) in tracks" :key="i" class="track-list-row">
      <span @click="startPauseTrack(i)">
        <inline-svg
          v-if="
            track.uri === playback_state.track_window.current_track.uri &&
            !playback_state.paused
          "
          class="track-list-playing"
          :src="require('@/assets/icons/track-list-current.svg')"
          width="20"
          height="20"
        />
        <span class="track-list-num" v-else>{{ i + 1 }}</span>
        <!-- <span class="track-list-play"> -->
        <inline-svg
          v-if="track.uri !== playback_state.track_window.current_track.uri"
          class="track-list-play"
          :src="require('@/assets/icons/track-list-play.svg')"
          width="20"
          height="20"
        />
        <inline-svg
          v-else
          class="track-list-play"
          :src="require('@/assets/icons/track-list-pause.svg')"
          width="20"
          height="20"
        />
        <!-- </span> -->
      </span>
      <span class="track-list-general">
        <img v-if="track.image" :src="track.image" class="track-list-img" />
        <span class="track-list-name">{{ track.name }}</span>
      </span>
      <span class="track-list-duration">{{ track.duration }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import * as utils from "@/utils";
import api from "@/api";
import * as API from "@/types/API";
import { mapGetters } from "vuex";

@Options({
  props: {
    tracks: Object,
    context_uri: String,
  },

  data() {
    return {
      images: [],
    };
  },

  computed: {
    ...mapGetters({
      playback_state: "player/getPlaybackState",
      player: "player/getPlayer",
    }),
  },

  methods: {
    msToTime(ms: number, format: boolean) {
      return utils.msToTime(ms, format);
    },

    startPauseTrack(offset: number) {
      if (
        this.tracks[offset].uri !==
        this.playback_state.track_window.current_track.uri
      ) {
        const request_params = {
          body: {
            context_uri: this.context_uri,
            offset: { position: offset },
          },
        };
        api.spotify.player.startPlayback(request_params);
      } else {
        api.spotify.SDK.togglePlay(this.player);
      }
    },
  },

  created() {
    console.log("[debug] TrackList (created) tracks:", this.tracks);
  },
})
export default class TrackList extends Vue {}
</script>

<style scoped lang="scss">
.track-list {
  //
}

.track-list-row {
  height: 50px;
  display: grid;
  grid-template-columns: 16px 1fr 1fr;
  grid-gap: 16px;
  align-items: center;
  border-radius: 4px;
  padding: 0 16px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    cursor: pointer;
  }
}

.track-list-num {
  color: #999;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.track-list-playing {
  fill: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  animation: playing 2s linear infinite;
  @keyframes playing {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.6);
    }
    100% {
      transform: scale(1);
    }
  }
}

.track-list-play {
  display: none;
  align-items: center;
  justify-content: center;
  fill: var(--color-text);
}

.track-list-general {
  color: var(--color-text);
  display: flex;
  flex-direction: row;
  align-items: center;
}

.track-list-img {
  height: 40px;
  margin-right: 16px;
}

.track-list-name {
  //
}

.track-list-duration {
  color: #999;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.track-list-row:hover {
  .track-list-num {
    display: none;
  }
  .track-list-playing {
    display: none;
  }
  .track-list-play {
    display: flex;
  }
}
</style>
