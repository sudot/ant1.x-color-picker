<template>
  <div
    class="ant-color-svpanel"
    :style="{
      backgroundColor: background,
    }"
  >
    <div class="ant-color-svpanel__white"></div>
    <div class="ant-color-svpanel__black"></div>
    <div
      class="ant-color-svpanel__cursor"
      :style="{
        top: cursorTop + 'px',
        left: cursorLeft + 'px',
      }"
    ></div>
  </div>
</template>

<script>
import draggable from '../lib/draggable';

export default {
  name: 'SvPanel',
  props: {
    color: {
      type: Object,
    },
  },
  data() {
    return {
      panelWidth: 0,
      panelHeight: 0,
      cursorTop: 0,
      cursorLeft: 0,
      background: 'hsl(0, 100%, 50%)',
    };
  },
  computed: {
    colorValue() {
      const saturation = this.color?.get('saturation');
      const hue = this.color?.get('hue') || 0;
      const value = this.color?.get('value');
      return { saturation, hue, value };
    },
  },
  watch: {
    colorValue: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.update();
        });
      },
    },
  },
  methods: {
    update() {
      const { saturation, hue, value } = this.colorValue;
      this.cursorLeft = (saturation * this.panelWidth) / 100;
      this.cursorTop = ((100 - value) * this.panelHeight) / 100;
      this.background = `hsl(${hue}, 100%, 50%)`;
    },
    handleDrag(event) {
      const rect = this.$el.getBoundingClientRect();

      let left = event.clientX - rect.left;
      let top = event.clientY - rect.top;

      left = Math.max(0, left);
      left = Math.min(left, rect.width);
      top = Math.max(0, top);
      top = Math.min(top, rect.height);

      this.cursorLeft = left;
      this.cursorTop = top;

      this.color.set({
        saturation: (left / rect.width) * 100,
        value: 100 - (top / rect.height) * 100,
      });
    },
  },

  mounted() {
    draggable(this.$el, {
      drag: (event) => {
        this.handleDrag(event);
      },
      end: (event) => {
        this.handleDrag(event);
      },
    });
    this.panelWidth = this.$el.clientWidth;
    this.panelHeight = this.$el.clientHeight;
  },
};
</script>

<style scoped>
.ant-color-svpanel {
  position: relative;
  height: 180px;
  border-radius: 3px;
  overflow: hidden;
}

.ant-color-svpanel__white,
.ant-color-svpanel__black {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.ant-color-svpanel__white {
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}
.ant-color-svpanel__black {
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}
.ant-color-svpanel__cursor {
  position: absolute;
  width: 18px;
  height: 18px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
    0 0 1px 2px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
