<template>
  <div class="track-list">
    <div v-for="(track, i) in tracks" :key="i" class="track-list-row">
      <span class="track-list-num" :click="startTrack(i)">{{ i + 1 }}</span>
      <span class="track-list-general">
        <img v-if="track.image" :src="track.image" class="track-list-img" />
        <span class="track-list-name">{{ track.name }}</span>
      </span>
      <span class="track-list-duration">{{ track.duration }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import * as utils from "@/utils";
import api from "@/api";
import * as API from "@/types/API";

@Options({
  props: {
    tracks: Object,
    context_uri: String,
  },

  data() {
    return {
      images: [],
    };
  },

  methods: {
    msToTime(ms: number, format: boolean) {
      return utils.msToTime(ms, format);
    },

    startTrack(offset: number) {
      api.spotify.player.startPlayback({
        body: {
          context_uri: this.context_uri,
          offset: { position: offset },
        },
      });
    },
  },

  created() {
    console.log("[debug] TrackList (created) tracks:", this.tracks);
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
  grid-template-columns: 16px 1fr 1fr;
  grid-gap: 16px;
  align-items: center;
  border-radius: 4px;
  padding: 0 16px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    cursor: pointer;
  }
}

.track-list-num {
  color: #999;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

.track-list-name {
  //
}

.track-list-duration {
  color: #999;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
