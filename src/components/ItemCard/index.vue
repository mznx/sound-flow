<template>
  <div class="item-card" @click="openItemContext()">
    <img :src="getItemImage()" class="item-img" />
    <p class="item-name">{{ item.name }}</p>
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

    getItemImage() {
      const url = utils.getImageUrl(this.item, true);
      console.log(url);
      // return utils.getImageUrl(this.item, true);
      return url;
    },
  },
})
export default class ItemCard extends Vue {}
</script>

<style scoped lang="scss">
.item-card {
  width: 250px;
  height: 300px;
  background-color: var(--color-elem);
  border-radius: 10px;
  padding: 10px;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: var(--color-elem-light);
  }
}

.item-img {
  //
}

.item-name {
  height: 50px;
  line-height: 50px;
  font-size: 13pt;
  font-weight: bold;
  overflow: hidden;
}
</style>
