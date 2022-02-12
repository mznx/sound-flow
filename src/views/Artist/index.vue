<template>
  <div class="artist" v-if="loaded">
    <div class="artist-header">
      <img :src="artist_image" />
      <h1>{{ artist.name }}</h1>
    </div>

    <div class="artist-top-tracks">
      <TrackList :tracks="tracks" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TrackList from "@/components/TrackList/index.vue";
import { TrackListInterface } from "@/components/TrackList/types";
import * as utils from "@/utils";
import api from "@/api";

@Options({
  data() {
    return {
      loaded: false,
      artist: null,
      artist_image: "",
      tracks: [],
    };
  },

  components: {
    TrackList,
  },

  computed: {
    artist_id: function () {
      return this.$route.params.id;
    },
  },

  methods: {
    getArtistMaxImageUrl(): string {
      return utils.getImageUrl(this.artist, true);
    },

    async setArtistParams() {
      this.loaded = false;
      this.artist = await api.spotify.artists.getArtist({
        params: { id: this.artist_id },
      });
      this.artist_image = this.getArtistMaxImageUrl();
      const artist_albums = await api.spotify.artists.getArtistAlbums({
        params: { id: this.artist_id },
      });
      const artist_top = await api.spotify.artists.getArtistTopTracks({
        params: { id: this.artist_id },
        query: { market: "ES" },
      });
      if (artist_top && "tracks" in artist_top) {
        const top_tracks = artist_top.tracks.slice(0, 10);
        const tracks: TrackListInterface[] = utils.getTracksArray(top_tracks);
        this.tracks = tracks;
      }
      this.loaded = true;

      /* --- */ console.log(
        "[debug] Artist\nartist_info: ",
        this.artist,
        "\nartist_albums: ",
        artist_albums,
        "\nartist_top: ",
        artist_top
      );
    },
  },

  created() {
    this.setArtistParams();
  },

  watch: {
    artist_id() {
      this.setArtistParams();
    },
  },
})
export default class Arist extends Vue {}
</script>

<style scoped lang="scss">
.artist {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.artist-header {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 0 20px -10px;
  }

  h1 {
    margin-left: 60px;
    font-size: 80pt;
    font-weight: bold;
    color: var(--color-text);
  }
}

.artist-top-tracks {
  width: 60%;
  margin: 0 auto;
}
</style>
