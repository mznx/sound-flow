<template>
  <div class="slider" :style="style.general" ref="slider">
    <div class="slider-backgroound" :style="style.bg" @click="onSliderClick">
      <div class="slider-fill" :style="style.fg"></div>
    </div>
    <div class="slider-dot" :style="style.dot" @mousedown="onDotDown"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    color_bg: String,
    color_fg: String,
    height: String,
    radius: String,
    max: Number,
    dot_size: Number,
    modelValue: Number,
  },
  emits: ["update:modelValue"],
  data() {
    return {
      _dot_size: 12,
      _radius: "4px",
      _max: 100,
      dot_pressed: false,
      style: {},
      abra: 0,
    };
  },
  methods: {
    setValue(val: number) {
      this.$emit("update:modelValue", val);
    },

    onSliderClick(e: PointerEvent) {
      const slider_width = this.$refs.slider.offsetWidth;
      let click_x = e.clientX - this.$refs.slider.offsetLeft;
      if (click_x < 0) click_x = 0;

      const percent_click = click_x / slider_width;
      this.setValue(this._max * percent_click);
    },

    onDotDown() {
      this.dot_pressed = true;
      window.addEventListener("mouseup", this.onDotUp);
      window.addEventListener("mousemove", this.onDotMove);
    },

    onDotUp() {
      this.dot_pressed = false;
      window.removeEventListener("mouseup", this.onDotUp);
      window.removeEventListener("mousemove", this.onDotMove);
    },

    onDotMove(e: MouseEvent) {
      if (this.dot_pressed) {
        const curr_pos =
          (this.modelValue / this._max) * this.$refs.slider.offsetWidth;
        const new_pos = curr_pos + e.movementX;
        const new_val = (new_pos * this._max) / this.$refs.slider.offsetWidth;
        this.setValue(new_val);
      }
    },
  },
  mounted() {
    if (this.max) this._max = this.max;
    if (this.dot_size) this._dot_size = this.dot_size;

    this.style = {
      general: { height: this.height },
      bg: { backgroundColor: this.color_bg, borderRadius: this._radius },
      fg: { backgroundColor: this.color_fg, borderRadius: this._radius },
      dot: {
        width: `${this._dot_size}px`,
        height: `${this._dot_size}px`,
        top: `calc(-50% - ${this._dot_size / 2}px)`,
        transform: `translateX(-${this._dot_size / 2}px)`,
      },
    };
  },
  watch: {
    max() {
      this._max = this.max;
    },
    modelValue() {
      const percent = (this.modelValue / this._max) * 100;
      this.style.fg.transform = `translateX(calc(-100% + ${percent}%))`;
      this.style.dot.left = `${percent}%`;
    },
  },
})
export default class Slider extends Vue {}
</script>

<style scoped lang="scss">
.slider {
  width: auto;
  height: 4px;
  position: relative;
}

.slider-backgroound {
  width: 100%;
  height: 100%;
  background-color: #aaa;
  overflow: hidden;
}

.slider-fill {
  width: 100%;
  height: 100%;
  background-color: #ddd;
  transform: translateX(-100%);
  // transition: all 0.5s ease;
}

.slider-dot {
  background-color: #fff;
  position: relative;
  border-radius: 50%;
  box-shadow: 0 0 4px -1px;
  cursor: pointer;
  // transition: all 0.5s ease;
}
</style>
