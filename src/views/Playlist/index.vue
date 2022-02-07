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
      <div class="playlist-artists">
        <span
          v-for="(art, i) in playlist.artists"
          :key="art"
          class="playlist-artist"
        >
          <span v-if="i > 0">, </span>
          <router-link :to="'/artist/' + spotifyUriParse(art.uri).val">
            {{ art.name }}
          </router-link>
        </span>
      </div>
      <TrackList :tracks="tracks" :context_uri="context_uri" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TrackList from "@/components/TrackList/index.vue";
import * as utils from "@/utils";
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
    spotifyUriParse(uri: string) {
      const uri_arr = uri.split(":");
      return {
        type: uri_arr[1],
        val: uri_arr[2],
      };
    },

    getPlaylistMaxImageUrl(playlist: SpotifyApi.PlaylistObjectFull) {
      const playlist_images: Spotify.Image[] = playlist.images;
      return utils.getImageUrl(playlist_images, true);
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

    getTracks() {
      const tracks = this.playlist.tracks.items;
      tracks.forEach((track: SpotifyApi.PlaylistTrackObject) => {
        const t = {
          name: track.track.name,
          duration: utils.msToTime(track.track.duration_ms, false),
          image: utils.getImageUrl(track.track.album.images, false),
        };
        this.tracks.push(t);
      });
    },

    async setPlaylistParams() {
      this.playlist = await api.spotify.playlists.getPlaylist({
        params: {
          playlist_id: this.playlist_id,
        },
      });
      this.playlist_image = this.getPlaylistMaxImageUrl(this.playlist);
      this.playlist_duration = this.getPlaylistDuration(this.playlist);
      this.context_uri = this.playlist.uri;
      this.getTracks();
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

.playlist-artist {
  color: #999;
  display: inline-block;
  font-size: 15pt;

  a {
    color: #999;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      color: var(--color-text);
      text-decoration: underline;
    }
  }
}
</style>
