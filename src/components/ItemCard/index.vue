<template>
  <div class="item-card" @click="openItemContext">
    <p>{{ item.name }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import * as utils from "@/utils";

@Options({
  props: {
    item: {},
  },

  methods: {
    openItemContext() {
      const uri = utils.spotifyUriParse(this.item.uri);
      this.$router.push(`/${uri.type}/${uri.val}`);
    },
  },
})
export default class ItemCard extends Vue {}
</script>

<style scoped lang="scss">
.item-card {
  width: 250px;
  height: 250px;
  background-color: var(--color-fg);
  border-radius: 10px;
  color: var(--color-text);

  &:hover {
    cursor: pointer;
  }
}
</style>
