<template>
  <div class="cb-track">
    <img :src="track_image" />
    <div class="cb-track-info">
      <router-link :to="album_link" class="cb-track-name">
        {{ track_name }}
      </router-link>
      <div class="cb-track-artists">
        <span
          v-for="(art, i) in track_artists"
          :key="art"
          class="cb-track-artist"
        >
          <span v-if="i > 0">, </span>
          <router-link :to="'/artist/' + spotifyUriParse(art.uri).val">
            {{ art.name }}
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import * as utils from "@/utils";

@Options({
  props: {
    player: Object,
    playback_state: Object,
  },

  data() {
    return {
      album_id: "",
      album_link: "",
      track_name: "",
      track_artists: [],
      track_image: "",
    };
  },

  computed: {
    context: function () {
      return this.playback_state.context;
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

    getTrackAlbumId(track: Spotify.Track): string {
      const uri = track.album.uri;
      const spotify_uri_obj = this.spotifyUriParse(uri);
      return spotify_uri_obj.val;
    },

    getTrackMinImageUrl(track: Spotify.Track) {
      const track_images: Spotify.Image[] = track.album.images;
      return utils.getImageUrl(track_images, false);
    },
  },

  watch: {
    context() {
      const track = this.playback_state.track_window.current_track;
      this.album_id = this.getTrackAlbumId(track);
      this.album_link = "/album/" + this.album_id;
      this.track_name = track.name;
      this.track_artists = track.artists;
      this.track_image = this.getTrackMinImageUrl(track);
    },
  },
})
export default class ControlCurrentTrack extends Vue {}
</script>

<style scoped lang="scss">
.cb-track {
  width: 100%;
  height: 100%;
  display: flex;

  img {
    height: 100%;
    border-radius: 4px;
  }
}

.cb-track-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}

.cb-track-name {
  color: var(--color-text);
  font-size: 10pt;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.cb-track-artists {
  .cb-track-artist {
    color: #999;
    display: inline-block;
    font-size: 8pt;

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
}
</style>
