<template>
  <div class="ant-color-alpha-slider">
    <div class="ant-color-picker__slider-padding">
      <div
        ref="bar"
        class="ant-color-alpha-slider__bar"
        :style="{
          background,
        }"
        @click="handleClick"
      ></div>
    </div>
    <div
      ref="thumb"
      class="ant-color-alpha__thumb"
      :style="{ left: thumbLeft + 'px' }"
    ></div>
  </div>
</template>

<script>
import draggable from '../lib/draggable';

export default {
  name: 'AlphaSlider',
  props: {
    color: {
      type: Object,
    },
  },
  data() {
    return {
      thumbLeft: 0,
      sliderWidth: 0,
      thumbWidth: 0,
      background: null,
    };
  },
  computed: {
    alphaValue() {
      return { alpha: this.color?.get('alpha'), value: this.color?.value };
    },
  },
  watch: {
    alphaValue: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.update();
        });
      },
    },
  },
  methods: {
    handleClick(event) {
      const target = event.target;

      if (target !== this.$refs.thumb) {
        this.handleDrag(event);
      }
    },
    handleDrag(event) {
      const rect = this.$el.getBoundingClientRect();

      let left = event.clientX - rect.left;
      left = Math.max(this.thumbWidth / 2, left);
      left = Math.min(left, rect.width - this.thumbWidth / 2);

      const alpha = Math.round(
        ((left - this.thumbWidth / 2) / (rect.width - this.thumbWidth)) * 100
      );

      this.color.set('alpha', alpha);
    },
    getThumbLeft() {
      const alpha = this.color?.get('alpha');
      return Math.round(
        (alpha * (this.sliderWidth - this.thumbWidth / 2)) / 100
      );
    },
    getBackground() {
      if (this.color && this.color.value) {
        const { r, g, b } = this.color.toRgb();
        return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
      }
      return null;
    },
    update() {
      this.thumbLeft = this.getThumbLeft();
      this.background = this.getBackground();
    },
  },
  mounted() {
    const dragConfig = {
      drag: (event) => {
        this.handleDrag(event);
      },
      end: (event) => {
        this.handleDrag(event);
      },
    };

    draggable(this.$refs.bar, dragConfig);
    draggable(this.$refs.thumb, dragConfig);
    this.sliderWidth = this.$el.clientWidth;
    this.thumbWidth = this.$refs.thumb.offsetWidth;
  },
};
</script>
<style scoped>
.ant-color-alpha-slider {
  box-sizing: border-box;
  position: relative;
  height: 12px;
  margin: 8px 0;
}
.ant-color-picker__slider-padding {
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  background: #fff;
  background-image: linear-gradient(
      45deg,
      #c5c5c5 25%,
      transparent 0,
      transparent 75%,
      #c5c5c5 0,
      #c5c5c5
    ),
    linear-gradient(
      45deg,
      #c5c5c5 25%,
      transparent 0,
      transparent 75%,
      #c5c5c5 0,
      #c5c5c5
    );
  background-size: 6px 6px;
  background-position: 0 0, 3px 3px;
}
.ant-color-alpha-slider__bar {
  position: relative;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  height: 100%;
}
.ant-color-alpha__thumb {
  cursor: pointer;
  position: absolute;
  box-sizing: border-box;
  z-index: 1;
  left: 0;
  top: 50%;
  width: 18px;
  height: 18px;
  transform: translate(-9px, -50%);
  border-radius: 100%;
  background: #fff;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
}
</style>
