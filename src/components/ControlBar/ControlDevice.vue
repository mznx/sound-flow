<template>
  <div class="cb-device">
    <inline-svg
      @click="getDevices"
      :src="require('@/assets/icons/control-device.svg')"
    />
    <div class="cd-device-container" :class="{ open: is_open }">
      <span class="cd-device-header">DEVICES:</span>
      <span
        v-for="(device, i) in devices"
        :key="i"
        class="cd-device-device"
        :class="{ active: device.is_active }"
        @click="transferToDevice(i)"
      >
        {{ device.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { mapGetters } from "vuex";
import api from "@/api";

@Options({
  data() {
    return {
      devices: [],
      is_open: false,
    };
  },

  computed: {
    ...mapGetters({
      player: "player/getPlayer",
      device_id: "player/getDeviceId",
      playback_state: "player/getPlaybackState",
    }),
  },

  methods: {
    async getDevices() {
      const devices: any = await api.spotify.player.getAvailableDevices();
      /* --- */ console.log("[debug] ControlDevice devices: ", devices);
      if (devices) this.devices = devices.devices;
      this.is_open = !this.is_open;
    },

    transferToDevice(i: number) {
      if (!this.devices[i].is_active)
        api.spotify.player.transferPlayback({
          body: {
            device_ids: [this.devices[i].id],
          },
        });
    },
  },
})
export default class ControlDevice extends Vue {}
</script>

<style scoped lang="scss">
.cb-device {
  svg {
    fill: var(--color-control);
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
      fill: var(--color-control-light);
    }
  }
}

.cd-device-container {
  display: none;
  position: absolute;
  width: 300px;
  bottom: 80px;
  right: 20px;
  padding: 6px 0;
  background-color: var(--color-fg);
  color: var(--color-text);
  border-radius: 4px;
  box-shadow: 0 0 10px 0px black;

  &.open {
    display: block;
  }
}

.cd-device-device {
  display: block;
  height: 40px;
  line-height: 40px;
  padding: 0 6px;

  &:hover {
    cursor: pointer;
    background-color: var(--color-fg-light);
  }

  &.active {
    color: var(--color-accent-light);
  }
}

.cd-device-header {
  display: block;
  border-bottom: 1px solid white;
  padding: 0 6px;
  margin-bottom: 6px;
}
</style>
