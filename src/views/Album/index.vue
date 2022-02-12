<template>
  <div class="album" v-if="loaded">
    <div class="album-info">
      <img :src="album_image" />
      <span>
        <span>{{ album.total_tracks }} songs, </span>
        <span>{{ msToTime(album_duration, true) }}</span>
      </span>
    </div>
    <div class="album-playlist">
      <h2 class="album-title">{{ album.name }}</h2>
      <ArtistsList class="album-artists" :artists="album.artists" />
      <TrackList :tracks="tracks" :context_uri="context_uri" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TrackList from "@/components/TrackList/index.vue";
import ArtistsList from "@/components/ArtistsList/index.vue";
import * as utils from "@/utils";
import { TrackListInterface } from "@/components/TrackList/types";
import api from "@/api";

@Options({
  data() {
    return {
      loaded: false,
      album: null,
      album_image: "",
      album_duration: 0,
      tracks: [],
      context_uri: "",
    };
  },

  components: {
    TrackList,
    ArtistsList,
  },

  computed: {
    album_id: function () {
      return this.$route.params.id;
    },
  },

  methods: {
    getAlbumMaxImageUrl(album: SpotifyApi.AlbumObjectFull) {
      return utils.getImageUrl(album, true);
    },

    getAlbumDuration(album: SpotifyApi.AlbumObjectFull) {
      const tracks = album.tracks.items;
      let duration = 0;
      tracks.forEach((track) => {
        duration += track.duration_ms;
      });
      return duration;
    },

    msToTime(ms: number, format: boolean) {
      return utils.msToTime(ms, format);
    },

    async setAlbumParams() {
      this.loaded = false;
      this.album = await api.spotify.albums.getAlbum({
        params: { id: this.album_id },
      });
      this.album_image = this.getAlbumMaxImageUrl(this.album);
      this.album_duration = this.getAlbumDuration(this.album);
      this.context_uri = this.album.uri;
      // this.tracks = this.getTracks();
      const tracks: TrackListInterface[] = utils.getTracksArray(
        this.album.tracks.items
      );
      this.tracks = tracks;
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
    box-shadow: 0 0 8px -4px;
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

.album-artists {
  margin-bottom: 30px;
  font-size: 12pt;
}
</style>
