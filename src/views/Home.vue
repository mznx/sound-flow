<template>
  <div class="home">
    <div class="home-cards">
      <ItemCard v-for="(f, i) in featured" :key="i" :item="f" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ItemCard from "@/components/ItemCard/index.vue";
import api from "@/api";

@Options({
  data() {
    return {
      featured: [],
    };
  },

  components: {
    ItemCard,
  },

  async created() {
    /* --- */ console.log("[debug] Home (created)");
    const featured_pl = await api.spotify.playlists.getFeaturedPlaylists({});
    if (featured_pl && "playlists" in featured_pl)
      this.featured = featured_pl.playlists.items;
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.home {
  //
}

.home-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 40px;
  justify-content: space-between;
}
</style>
