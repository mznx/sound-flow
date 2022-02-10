<template>
  <div class="cb-track">
    <router-link :to="context_link">
      <img :src="track_image" />
    </router-link>
    <div class="cb-track-info">
      <router-link :to="album_link" class="cb-track-name">
        {{ track_name }}
      </router-link>
      <ArtistsList class="cb-track-artists" :artists="track_artists" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ArtistsList from "@/components/ArtistsList/index.vue";
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
      context_link: "",
    };
  },

  components: {
    ArtistsList,
  },

  computed: {
    context: function () {
      return this.playback_state.context;
    },
  },

  methods: {
    getTrackAlbumId(track: Spotify.Track): string {
      const uri = track.album.uri;
      const spotify_uri_obj = utils.spotifyUriParse(uri);
      return spotify_uri_obj.val;
    },

    getTrackMinImageUrl(track: Spotify.Track) {
      const track_images: Spotify.Image[] = track.album.images;
      return utils.getImageUrl(track_images, false);
    },

    updateContext(): void {
      const track = this.playback_state.track_window.current_track;
      const parsed_uri = utils.spotifyUriParse(this.playback_state.context.uri);
      this.context_link = `/${parsed_uri.type}/${parsed_uri.val}`;
      this.album_id = this.getTrackAlbumId(track);
      this.album_link = "/album/" + this.album_id;
      this.track_name = track.name;
      this.track_artists = track.artists;
      this.track_image = this.getTrackMinImageUrl(track);
    },
  },

  created() {
    this.updateContext();
  },

  watch: {
    context() {
      this.updateContext();
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
  font-size: 8pt;
}
</style>
