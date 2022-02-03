<template>
  <div
    class="slider"
    :style="style.general"
    ref="slider"
    @mouseover="onSliderOver"
    @mouseout="onSliderOut"
    @mousedown="onSliderDown"
  >
    <div class="slider-backgroound" :style="style.bg">
      <div class="slider-fill" :style="style.fg"></div>
    </div>
    <div class="slider-dot" :style="style.dot"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    style_bg: Object,
    style_fg: Object,
    style_dot: Object,
    height: Number,
    dot_size: Number,
    min: Number,
    max: Number,
    modelValue: Number,
  },
  emits: ["update:modelValue", "down", "up", "move"],
  data() {
    return {
      _dot_size: 12,
      _min: 0,
      _max: 100,
      slider_pressed: false,
      slider_over: false,
      style: {},
    };
  },
  methods: {
    setValue(val: number) {
      if (val < this._min) val = this._min;
      else if (val > this._max) val = this._max;
      this.$emit("update:modelValue", val);
    },

    updateSlider() {
      // const percent = (this.modelValue / this._max) * 100; // [0; 100]
      const percent =
        ((this.modelValue - this._min) / (this._max - this._min)) * 100; // [0; 100]
      this.style.fg.transform = `translateX(calc(-100% + ${percent}%))`;
      this.style.dot.left = `${percent}%`;

      if (this.slider_over) this.style.dot.display = "block";
      else if (!this.slider_pressed) this.style.dot.display = "none";
    },

    onSliderDown() {
      this.slider_pressed = true;
      window.addEventListener("mouseup", this.onSliderUp);
      window.addEventListener("mousemove", this.onSliderMove);
      this.$emit("down");
    },

    onSliderUp(e: MouseEvent) {
      this.slider_pressed = false;
      window.removeEventListener("mouseup", this.onSliderUp);
      window.removeEventListener("mousemove", this.onSliderMove);
      this.onSliderMove(e);
      this.updateSlider();
      this.$emit("up");
    },

    onSliderMove(e: MouseEvent) {
      const slider_rect = this.$refs.slider.getBoundingClientRect();
      let click_x = e.clientX - slider_rect.left;
      if (click_x < 0) click_x = 0;
      if (click_x > slider_rect.width) click_x = slider_rect.width;
      const percent = click_x / slider_rect.width; // [0; 1]

      this.setValue((this._max - this._min) * percent + this._min);
      this.$emit("move");

      // delete
      const selection = window.getSelection();
      if (selection !== null) {
        selection.removeAllRanges();
      }
    },

    onSliderOver() {
      this.slider_over = true;
      this.updateSlider();
    },

    onSliderOut() {
      this.slider_over = false;
      this.updateSlider();
    },
  },
  mounted() {
    if (this.min) this._min = this.min;
    if (this.max) this._max = this.max;
    if (this.dot_size) this._dot_size = this.dot_size;

    this.style = {
      general: { height: `${this.height + 8}px` },
      bg: {},
      fg: {},
      dot: {
        width: `${this._dot_size}px`,
        height: `${this._dot_size}px`,
        top: `calc(-50% - ${this._dot_size / 2}px)`,
        transform: `translateX(-${this._dot_size / 2}px)`,
      },
    };
    Object.assign(this.style.bg, this.style_bg);
    Object.assign(this.style.fg, this.style_fg);
    Object.assign(this.style.dot, this.style_dot);

    this.updateSlider();
  },
  watch: {
    min() {
      this._min = this.min;
      this.updateSlider();
    },
    max() {
      this._max = this.max;
      this.updateSlider();
    },
    modelValue() {
      this.updateSlider();
    },
  },
})
export default class Slider extends Vue {}
</script>

<style scoped lang="scss">
.slider {
  width: auto;
  height: 12px;
  padding: 4px 0;
  position: relative;
  box-sizing: border-box;
}

.slider-backgroound {
  width: 100%;
  height: 100%;
  background-color: #aaa;
  border-radius: 4px;
  overflow: hidden;
}

.slider-fill {
  width: 100%;
  height: 100%;
  background-color: #ddd;
  border-radius: 4px;
  transform: translateX(-100%);
  // transition: all 0.5s ease;
}

.slider-dot {
  display: none;
  background-color: #fff;
  position: relative;
  border-radius: 50%;
  box-shadow: 0 0 4px -1px;
  cursor: pointer;
  // transition: all 0.5s ease;
}
</style>
