<template>
  <div class="ant-color-predefine">
    <div>系统预设颜色</div>
    <div class="ant-color-predefine__colors">
      <div
        v-for="(item, index) in rgbaColors"
        :key="colors[index]"
        :title="colors[index]"
        :class="{ 'is-alpha': item._alpha < 100 }"
        class="ant-color-predefine__color-selector"
        @click="handleSelect(index)"
      >
        <div :style="{ backgroundColor: item.value }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Color from '../lib/color';

export default {
  name: 'PreDefine',
  props: {
    colors: {
      type: Array,
      required: true,
    },
  },
  emits: ['selected'],
  computed: {
    rgbaColors() {
      return this.colors.map((value) => {
        const c = new Color({ enableAlpha: true, format: 'rgba' });
        c.fromString(value);
        return c;
      });
    },
  },
  methods: {
    handleSelect(index) {
      this.$emit('selected', this.colors[index]);
    },
  },
};
</script>

<style scoped>
.ant-color-predefine {
  display: flex;
  flex-direction: column;
  width: 280px;
  margin-top: 8px;
  font-size: 12px;
}
.ant-color-predefine__colors {
  margin-top: 8px;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}
.ant-color-predefine__color-selector {
  width: 20px;
  height: 20px;
  margin: 0 0 8px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.ant-color-predefine__color-selector:nth-child(10n + 1) {
  margin-left: 0;
}
.ant-color-predefine__color-selector > div {
  height: 100%;
  border-radius: 3px;
  border: 1px solid #e8e8e8;
  transition: all 0.2s cubic-bezier(0.38, 0, 0.24, 1);
}
.ant-color-predefine__color-selector > div:hover {
  transform: scale(1.25);
  transform-origin: center;
}
</style>
