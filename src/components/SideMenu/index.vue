<template>
  <div class="side-menu" :class="{ open: is_open }">
    <!--  -->
    <span @click="openClose()" class="side-menu-open-close"></span>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  data() {
    return {
      is_open: false,
    };
  },

  methods: {
    openClose() {
      this.is_open = !this.is_open;
    },
  },
})
export default class SideMenu extends Vue {}
</script>

<style scoped lang="scss">
.side-menu {
  position: fixed;
  width: 240px;
  height: calc(100% - 118px);
  top: 38px;
  left: 0;
  background-color: var(--color-fg);
  border-right: 1px solid var(--color-border);
  transform: translateX(-100%);
  transition: transform 0.3s ease;

  &.open {
    transform: translateX(0);
  }
}

.side-menu-open-close {
  width: 20px;
  height: 100px;
  position: absolute;
  right: -20px;
  top: calc(50% - 50px);
  background-color: var(--color-fg);
  border: 1px solid var(--color-border);
  border-left: none;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  &:hover {
    cursor: pointer;
  }
}
</style>
