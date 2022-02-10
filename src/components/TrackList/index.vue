<template>
  <div class="track-list">
    <div v-for="(track, i) in tracks" :key="i" class="track-list-row">
      <span @click="startPauseTrack(i)" class="track-list-index">
        <span v-if="isCurrentTrack(i) && !playback_state.paused">
          <inline-svg
            class="track-list-current"
            :src="require('@/assets/icons/track-list-current.svg')"
          />
          <inline-svg
            class="track-list-control"
            :src="require('@/assets/icons/track-list-pause.svg')"
          />
        </span>
        <span v-else>
          <span class="track-list-num">{{ i + 1 }}</span>
          <inline-svg
            class="track-list-control"
            :src="require('@/assets/icons/track-list-play.svg')"
          />
        </span>
      </span>

      <span class="track-list-general">
        <img v-if="track.image" :src="track.image" class="track-list-img" />
        <span class="track-list-info">
          <span
            class="track-list-name"
            :class="{ 'track-list-active': isCurrentTrack(i) }"
          >
            {{ track.name }}
          </span>
          <ArtistsList :artists="track.artists" class="track-list-artists" />
        </span>
      </span>

      <span class="track-list-duration">{{ track.duration }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { PropType } from "vue";
import { mapGetters } from "vuex";
import { TracksInterface } from "./types";
import ArtistsList from "@/components/ArtistsList/index.vue";
import api from "@/api";

@Options({
  props: {
    tracks: {
      type: Array as PropType<TracksInterface[]>,
      required: true,
    },
    context_uri: String,
  },

  components: {
    ArtistsList,
  },

  computed: {
    ...mapGetters({
      playback_state: "player/getPlaybackState",
      player: "player/getPlayer",
    }),
  },

  methods: {
    spotifyUriParse(uri: string) {
      const uri_arr = uri.split(":");
      return {
        type: uri_arr[1],
        val: uri_arr[2],
      };
    },

    isCurrentTrack(offset: number): boolean {
      if (
        this.tracks[offset].uri ===
        this.playback_state.track_window.current_track.uri
      )
        return true;
      else return false;
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
    /* --- */ console.log("[debug] TrackList (created) tracks:", this.tracks);
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
  grid-template-columns: 16px 4fr minmax(120px, 1fr);
  grid-gap: 16px;
  align-items: center;
  border-radius: 4px;
  padding: 0 16px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    // cursor: pointer;
  }
}

.track-list-index {
  //
}

.track-list-num {
  color: #999;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.track-list-current {
  stroke: var(--color-accent-light);
  fill: var(--color-accent-light);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  animation: playing 1s cubic-bezier(0, 1.3, 0.55, 0) infinite;
  @keyframes playing {
    0% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1.2);
    }
  }
}

.track-list-control {
  display: none;
  align-items: center;
  justify-content: center;
  fill: var(--color-text);
  cursor: pointer;
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

.track-list-info {
  display: flex;
  flex-direction: column;
}

.track-list-name {
  font-size: 11pt;
}

.track-list-active {
  color: var(--color-accent-light);
}

.track-list-artists {
  font-size: 10pt;
}

.track-list-artist {
  color: #999;

  a {
    color: #999;
    text-decoration: none;

    &:hover {
      color: var(--color-text);
      text-decoration: underline;
    }
  }
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
  .track-list-current {
    display: none;
  }
  .track-list-control {
    display: flex;
  }
}
</style>
