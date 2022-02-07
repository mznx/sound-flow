<template>
  <div class="track-list">
    <div v-for="(track, i) in tracks.items" :key="track" class="track-list-row">
      <span class="track-list-num">{{ i + 1 }}</span>
      <span class="track-list-name">{{ track.name }}</span>
      <span class="track-list-duration">{{
        msToTime(track.duration_ms, false)
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import * as utils from "@/utils";

@Options({
  props: {
    tracks: Object,
  },

  methods: {
    msToTime(ms: number, format: boolean) {
      return utils.msToTime(ms, format);
    },
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
  grid-template-columns: 30px 1fr 1fr;
  align-items: center;
  border-radius: 4px;
  padding: 0 10px;

  span {
    &:last-child {
      text-align: right;
    }
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    cursor: pointer;
  }
}

.track-list-num {
  color: #999;
}

.track-list-name {
  color: var(--color-text);
}

.track-list-duration {
  color: #999;
}
</style>
