<template>
  <div class="info-bar">
    <div class="info-bar-control">
      <button @click="$router.push('/')">
        <inline-svg :src="require('@/assets/icons/info-bar-home.svg')" />
      </button>
      <button @click="$router.go(-1)">
        <inline-svg :src="require('@/assets/icons/info-bar-back.svg')" />
      </button>
      <button @click="$router.go(1)">
        <inline-svg :src="require('@/assets/icons/info-bar-forward.svg')" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({})
export default class ControlBar extends Vue {}
</script>

<style scoped lang="scss">
.info-bar {
  width: 100%;
  height: 38px;
  background-color: var(--color-fg);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
}

.info-bar-control {
  button {
    background-color: unset;
    border: unset;
    fill: var(--color-control);
    height: 100%;
    width: 40px;
    margin: 0 5px;
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
      fill: var(--color-control-light);
    }
  }
}
</style>
