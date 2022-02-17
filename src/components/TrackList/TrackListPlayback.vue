<template>
  <span @click="startPauseTrack(num)" class="track-list-index">
    <span v-if="isCurrentTrack() && playback.is_playing">
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
      <span class="track-list-num">{{ num + 1 }}</span>
      <inline-svg
        class="track-list-control"
        :src="require('@/assets/icons/track-list-play.svg')"
      />
    </span>
  </span>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { PropType } from "vue";
import { mapGetters } from "vuex";
import { TrackListInterface } from "./types";
import api from "@/api";

@Options({
  props: {
    track: {
      type: Object as PropType<TrackListInterface>,
      required: true,
    },
    context_uri: String,
    uris: Array,
    num: Number,
  },

  computed: {
    ...mapGetters({
      playback_state: "player/getPlaybackState",
      player: "player/getPlayer",
      playback: "player/getPlayback",
    }),
  },

  methods: {
    isCurrentTrack(): boolean {
      if (this.track.uri === this.playback.item.uri) return true;
      else return false;
    },

    async startPauseTrack(offset: number) {
      if (!this.isCurrentTrack()) {
        let request_params = {};
        if (this.uris)
          request_params = {
            body: {
              uris: this.uris,
              offset: { position: offset },
            },
          };
        else
          request_params = {
            body: {
              context_uri: this.context_uri,
              offset: { position: offset },
            },
          };
        await api.spotify.player.startPlayback(request_params);
      } else {
        if (this.playback_state) await api.spotify.SDK.togglePlay(this.player);
        else if (this.playback.is_playing)
          await api.spotify.player.pausePlayback({});
        else await api.spotify.player.startPlayback({});
      }
    },
  },

  created() {
    /* --- */ console.log("[debug] TrackListPlayback (created)");
  },
})
export default class TrackListPlayback extends Vue {}
</script>

<style scoped lang="scss">
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
