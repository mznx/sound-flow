<template>
  <span></span>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class CircleLoader extends Vue {}
</script>

<style scoped lang="scss">
$size-circle: 50px;

span {
  position: absolute;
  top: calc(50% - $size-circle / 2);
  left: calc(50% - $size-circle / 2);
  width: 50px;
  height: 50px;
  border: 4px solid white;
  border-radius: 50%;
  border-bottom-color: transparent;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
