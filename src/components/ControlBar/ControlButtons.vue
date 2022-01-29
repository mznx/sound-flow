<template>
  <div class="cb-buttons">
    <button class="cb-shuffle">
      <inline-svg
        :src="require('@/assets/icons/control-shuffle.svg')"
        width="30"
        height="30"
        fill="var(--color-control)"
      />
    </button>

    <button class="cb-back">
      <inline-svg
        :src="require('@/assets/icons/control-back.svg')"
        width="20"
        height="20"
        fill="var(--color-control)"
      />
    </button>

    <button class="cb-playpause" @click="playPause">
      <inline-svg
        v-if="status === 'pause'"
        :src="require('@/assets/icons/control-play.svg')"
        width="40"
        height="40"
        fill="var(--color-control)"
      />
      <inline-svg
        v-else
        :src="require('@/assets/icons/control-pause.svg')"
        width="40"
        height="40"
        fill="var(--color-control)"
      />
    </button>

    <button class="cb-forward">
      <inline-svg
        :src="require('@/assets/icons/control-forward.svg')"
        width="20"
        height="20"
        fill="var(--color-control)"
      />
    </button>

    <button class="cb-repeat">
      <inline-svg
        :src="require('@/assets/icons/control-repeat.svg')"
        width="20"
        height="20"
        fill="var(--color-control)"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  data() {
    return {
      status: null,
    };
  },
  methods: {
    playPause() {
      if (this.status === "pause") this.$store.commit("setStatus", "play");
      else this.$store.commit("setStatus", "pause");

      this.status = this.$store.state.status;
    },
  },
  mounted() {
    this.status = this.$store.state.status;
  },
})
export default class ControlButtons extends Vue {}
</script>

<style scoped lang="scss">
.cb-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    background: none;
    border: 0;
    height: 100%;
    width: 50px;
    margin: 0 2px;

    &:hover {
      cursor: pointer;

      svg {
        fill: var(--color-control-hover);
      }
    }
  }
}
</style>
