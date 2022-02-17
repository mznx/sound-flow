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
import { mapGetters } from "vuex";
import ArtistsList from "@/components/ArtistsList/index.vue";
import * as utils from "@/utils";

@Options({
  data() {
    return {
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
    ...mapGetters({
      playback: "player/getPlayback",
    }),
    item: function () {
      return this.playback.item;
    },
  },

  methods: {
    getTrackAlbumId(track: Spotify.Track): string {
      const uri = track.album.uri;
      const spotify_uri_obj = utils.spotifyUriParse(uri);
      return spotify_uri_obj.val;
    },

    getTrackMinImageUrl(track: Spotify.Track) {
      const track_album = track.album;
      return utils.getImageUrl(track_album, false);
    },

    updateContext(): void {
      const track = this.playback.item;
      this.album_link = "/album/" + track.album.id;
      this.track_name = track.name;
      this.track_artists = track.artists;
      this.track_image = this.getTrackMinImageUrl(track);

      let context_uri = "";
      if (this.playback.context) context_uri = this.playback.context.uri;
      else context_uri = this.playback.item.artists[0].uri;
      const parsed_uri = utils.spotifyUriParse(context_uri);
      this.context_link = `/${parsed_uri.type}/${parsed_uri.val}`;
    },
  },

  created() {
    this.updateContext();
  },

  watch: {
    item() {
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
