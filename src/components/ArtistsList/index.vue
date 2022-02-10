<template>
  <div class="artists-list">
    <span v-for="(art, i) in artists" :key="i" class="artist">
      <span v-if="i > 0">, </span>
      <router-link :to="'/artist/' + spotifyUriParse(art.uri).val">
        {{ art.name }}
      </router-link>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import * as utils from "@/utils";

@Options({
  props: {
    artists: Array,
  },

  methods: {
    spotifyUriParse(uri: string) {
      return utils.spotifyUriParse(uri);
    },
  },
})
export default class ArtistsList extends Vue {}
</script>

<style scoped lang="scss">
.artists-list {
  //
}

.artist {
  display: inline-block;
  color: var(--color-text-dark);

  a {
    color: var(--color-text-dark);
    text-decoration: none;

    &:hover {
      color: var(--color-text);
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
