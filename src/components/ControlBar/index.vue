<template>
  <div class="control-bar">
    <div class="cb-left"></div>
    <div class="cb-center">
      <ControlButtons />
      <ControlPlayback />
    </div>
    <div class="cb-right"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ControlButtons from "./ControlButtons.vue";
import ControlPlayback from "./ControlPlayback.vue";

@Options({
  components: {
    ControlButtons,
    ControlPlayback,
  },
})
export default class ControlBar extends Vue {}
</script>

<style scoped lang="scss">
.control-bar {
  width: 100%;
  height: 80px;
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: var(--color-fg);
  border-top: 1px solid #594d7e;
}

.cb-left {
  width: 100%;
  height: 100%;
}

.cb-center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0;
}

.cb-right {
  width: 100%;
  height: 100%;
}
</style>
