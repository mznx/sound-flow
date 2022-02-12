<template>
  <div class="playlist" v-if="loaded">
    <div class="playlist-info">
      <img :src="playlist_image" />
      <span>
        <span>{{ playlist.total_tracks }} songs, </span>
        <span>{{ msToTime(playlist_duration, true) }}</span>
      </span>
    </div>
    <div class="playlist-playlist">
      <h2 class="playlist-title">{{ playlist.name }}</h2>
      <div class="playlist-description">{{ playlist.description }}</div>
      <TrackList :tracks="tracks" :context_uri="context_uri" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TrackList from "@/components/TrackList/index.vue";
import * as utils from "@/utils";
import { TrackListInterface } from "@/components/TrackList/types";
import api from "@/api";

@Options({
  data() {
    return {
      loaded: false,
      playlist: null,
      playlist_image: "",
      playlist_duration: 0,
      tracks: [],
      context_uri: "",
    };
  },

  components: {
    TrackList,
  },

  computed: {
    playlist_id: function () {
      return this.$route.params.id;
    },
  },

  methods: {
    getPlaylistMaxImageUrl(playlist: SpotifyApi.PlaylistObjectFull) {
      return utils.getImageUrl(playlist, true);
    },

    getPlaylistDuration(playlist: SpotifyApi.PlaylistObjectFull) {
      const tracks = playlist.tracks.items;
      let duration = 0;
      tracks.forEach((track: SpotifyApi.PlaylistTrackObject) => {
        duration += track.track.duration_ms;
      });
      return duration;
    },

    msToTime(ms: number, format: boolean) {
      return utils.msToTime(ms, format);
    },

    prepareTracks() {
      let prepared_tracks: SpotifyApi.TrackObjectFull[] = [];
      const tracks = this.playlist.tracks.items;
      tracks.forEach((track: SpotifyApi.PlaylistTrackObject) => {
        prepared_tracks.push(track.track);
      });
      return prepared_tracks;
    },

    async setPlaylistParams() {
      this.loaded = false;
      this.playlist = await api.spotify.playlists.getPlaylist({
        params: {
          playlist_id: this.playlist_id,
        },
      });
      this.playlist_image = this.getPlaylistMaxImageUrl(this.playlist);
      this.playlist_duration = this.getPlaylistDuration(this.playlist);
      this.context_uri = this.playlist.uri;
      // this.tracks = this.getTracks();
      const prepared_tracks = this.prepareTracks();
      const tracks: TrackListInterface[] =
        utils.getTracksArray(prepared_tracks);
      this.tracks = tracks;
      this.loaded = true;
    },
  },

  created() {
    this.setPlaylistParams();
  },

  watch: {
    playlist_id() {
      this.setPlaylistParams();
    },
  },
})
export default class Playlist extends Vue {}
</script>

<style scoped lang="scss">
.playlist {
  width: 100%;
  // height: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
}

.playlist-info {
  width: 20%;
  margin-right: 60px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  img {
    border-radius: 15px;
    box-shadow: 0 0 8px -4px;
  }
}

.playlist-playlist {
  flex-grow: 1;
}

.playlist-title {
  color: var(--color-text);
  font-size: 48pt;
  font-weight: bold;
}

.playlist-description {
  margin-bottom: 30px;
  color: var(--color-text-dark);
  font-size: 12pt;
}
</style>
