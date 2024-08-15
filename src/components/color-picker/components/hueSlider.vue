<template>
  <div class="ant-color-hue-slider">
    <div ref="bar" class="ant-color-hue-slider__bar" @click="handleClick"></div>
    <div
      ref="thumb"
      class="ant-color-hue-slider__thumb"
      :style="{ left: thumbLeft + 'px' }"
    ></div>
  </div>
</template>

<script>
import draggable from '../lib/draggable';

export default {
  name: 'HueSlider',
  props: {
    color: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      thumbLeft: 0,
      sliderWidth: 0,
      thumbWidth: 0,
    };
  },
  computed: {
    hueValue() {
      return this.color?.get('hue');
    },
  },
  watch: {
    hueValue: {
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
      if (event.target !== this.$refs.thumb) {
        this.handleDrag(event);
      }
    },
    handleDrag(event) {
      const rect = this.$el.getBoundingClientRect();
      let left = event.clientX - rect.left;
      left = Math.min(left, rect.width - this.thumbWidth / 2);
      left = Math.max(this.thumbWidth / 2, left);

      const hue = Math.round(
        ((left - this.thumbWidth / 2) / (rect.width - this.thumbWidth)) * 360
      );
      this.color.set('hue', hue);
    },
    getThumbLeft() {
      const sliderWidth = this.sliderWidth || this.$el.clientWidth;
      const thumbWidth = this.thumbWidth || this.$refs.thumb.offsetWidth;
      const hue = this.color.get('hue');
      return Math.round((hue * (sliderWidth - thumbWidth / 2)) / 360);
    },
    update() {
      this.thumbLeft = this.getThumbLeft();
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
.ant-color-hue-slider {
  box-sizing: border-box;
  position: relative;
  height: 12px;
  margin-top: 8px;
  margin-bottom: 12px;
}
.ant-color-hue-slider__bar {
  height: 100%;
  border-radius: 12px;
  position: relative;
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
}
.ant-color-hue-slider__thumb {
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
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
}
</style>
