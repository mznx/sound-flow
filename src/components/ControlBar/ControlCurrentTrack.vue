<template>
  <div class="cb-track">
    <img :src="track_image" />
    <div class="cb-track-info">
      <p class="cb-track-name">{{ track_name }}</p>
      <div class="cb-track-artists">
        <p v-for="(art, i) in track_artists" :key="art">
          <span v-if="i > 0">, </span>{{ art.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    player: Object,
    playback_state: Object,
  },

  data() {
    return {
      track_image: "",
      track_name: "",
      track_artists: [],
    };
  },

  computed: {
    context: function () {
      return this.playback_state.context;
    },
  },

  watch: {
    context() {
      const track = this.playback_state.track_window.current_track;
      this.track_name = track.name;
      this.track_artists = track.artists;
      const track_images = track.album.images;
      let image = "";
      let min_size = track_images[0].height;
      track_images.forEach((img: Spotify.Image) => {
        if (img.height && img.height <= min_size) {
          image = img.url;
          min_size = img.height;
        }
      });
      this.track_image = image;
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
  color: var(--color-text);

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
  font-size: 10pt;
}

.cb-track-artists {
  p {
    display: inline-block;
    font-size: 8pt;
  }
}
</style>
