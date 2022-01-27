<template>
  <div class="callback">
    <CircleLoader />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CircleLoader from "@/components/CircleLoader/index.vue";

@Options({
  components: {
    CircleLoader,
  },
  mounted() {
    // process
    const query = this.$route.query;

    if (query && query.access_token) {
      localStorage.setItem("access_token", query.access_token);
      localStorage.setItem("refresh_token", query.refresh_token);

      window.opener.postMessage({ status: "ok" });
    } else if (query.error) {
      window.opener.postMessage({ status: query.error });
    } else {
      window.opener.postMessage({ status: "invalid query" });
    }

    localStorage.removeItem("spotify_auth_state");
    window.close();
  },
})
export default class Callback extends Vue {}
</script>

<style scoped lang="scss">
.callback {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
