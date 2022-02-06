<template>
  <div class="track-list">
    <div v-for="(track, i) in tracks.items" :key="track" class="track-list-row">
      <span>{{ i + 1 }}</span>
      <span>{{ track.name }}</span>
      <span>{{ track.duration_ms }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    tracks: Object,
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
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
}
</style>
