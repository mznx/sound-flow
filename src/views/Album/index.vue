<template>
  <div class="album" v-if="loaded">
    <div class="album-info">
      <img :src="album_image" />
      <span>
        <span>{{ album.total_tracks }} songs, </span>
        <span>{{ msToTime(album_duration) }}</span>
      </span>
    </div>
    <div class="album-playlist">
      <h2 class="album-title">{{ album.name }}</h2>
      <div class="album-artists">
        <span v-for="(art, i) in album.artists" :key="art" class="album-artist">
          <span v-if="i > 0">, </span>
          <router-link :to="'/artist/' + spotifyUriParse(art.uri).val">
            {{ art.name }}
          </router-link>
        </span>
        <TrackList :tracks="album.tracks" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TrackList from "@/components/TrackList/index.vue";
import api from "@/api";

@Options({
  data() {
    return {
      loaded: false,
      album: null,
      album_image: "",
      album_duration: 0,
    };
  },

  components: {
    TrackList,
  },

  computed: {
    album_id: function () {
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

    getAlbumMaxImageUrl(album: SpotifyApi.AlbumObjectFull) {
      const album_images = album.images;
      let url = "";
      if (album_images[0].height) {
        let max_size: number = album_images[0].height;
        album_images.forEach((alb: SpotifyApi.ImageObject) => {
          if (alb.height && alb.height >= max_size) {
            url = alb.url;
            max_size = alb.height;
          }
        });
      }
      return url;
    },

    getAlbumDuration(album: SpotifyApi.AlbumObjectFull) {
      const tracks = album.tracks.items;
      let duration = 0;
      tracks.forEach((track) => {
        duration += track.duration_ms;
      });
      return duration;
    },

    msToTime(ms: number) {
      const h = Math.trunc(ms / 3600000);
      const m = Math.trunc((ms - h * 3600000) / 60000);
      const s = Math.trunc((ms - h * 3600000 - m * 60000) / 1000);

      let time = "";
      if (h) time += h + "h";
      if (m < 10) time += ` 0${m}m`;
      else time += ` ${m}m`;
      if (s < 10) time += ` 0${s}s`;
      else time += ` ${s}s`;

      return time;
    },

    async setAlbumParams() {
      this.album = await api.spotify.albums.getAlbum({ id: this.album_id });
      this.album_image = this.getAlbumMaxImageUrl(this.album);
      this.album_duration = this.getAlbumDuration(this.album);
      this.loaded = true;
    },
  },

  created() {
    this.setAlbumParams();
  },

  watch: {
    album_id() {
      this.setAlbumParams();
    },
  },
})
export default class Album extends Vue {}
</script>

<style scoped lang="scss">
.album {
  width: 100%;
  // height: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
}

.album-info {
  width: 20%;
  margin-right: 60px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  img {
    border-radius: 15px;
  }
}

.album-playlist {
  flex-grow: 1;
}

.album-title {
  color: var(--color-text);
  font-size: 48pt;
  font-weight: bold;
}

.album-artist {
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
