<template>
  <div class="home">
    <router-view name="homeRouter" />
    <p>dsa</p>
    <ControlBar />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CircleLoader from "@/components/CircleLoader/index.vue";
import ControlBar from "@/components/ControlBar/index.vue";

@Options({
  data() {
    return {
      loading: true,
      token: null,
    };
  },
  components: {
    CircleLoader,
    ControlBar,
  },
  methods: {},
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
