<template>
  <div class="track-list">
    <div v-for="(track, i) in tracks" :key="i" class="track-list-row">
      <TrackListPlayback
        :track="track"
        :num="i"
        :uris="uris"
        :context_uri="context_uri"
      />

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
import { TrackListInterface } from "./types";
import TrackListPlayback from "@/components/TrackList/TrackListPlayback.vue";
import ArtistsList from "@/components/ArtistsList/index.vue";

@Options({
  props: {
    tracks: {
      type: Array as PropType<TrackListInterface[]>,
      required: true,
    },
    context_uri: String,
    uris: Array,
  },

  components: {
    TrackListPlayback,
    ArtistsList,
  },

  computed: {
    ...mapGetters({
      playback_state: "player/getPlaybackState",
      player: "player/getPlayer",
      playback: "player/getPlayback",
    }),
  },

  methods: {
    isCurrentTrack(offset: number): boolean {
      if (
        this.tracks[offset].uri ===
        this.playback_state.track_window.current_track.uri
      )
        return true;
      else return false;
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
</style>
