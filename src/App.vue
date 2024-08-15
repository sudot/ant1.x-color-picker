<template>
  <div id="app">
    <a-form-model
      ref="ruleForm"
      class="form"
      :model="ruleForm"
      :labelCol="{ span: 4 }"
      :wrapperCol="{ span: 14 }"
    >
      <a-form-model-item label="Color1">
        <a-row :gutter="[8, 8]">
          <a-col :span="12">
            <color-picker
              v-model="ruleForm.color"
              show-alpha
              placement="bottomLeft"
              :predefine="predefineColors"
            />
          </a-col>
          <a-col :span="12" :style="{ color: ruleForm.color }">
            回显：{{ ruleForm.color }}
          </a-col>
        </a-row>
      </a-form-model-item>
      <a-form-model-item label="Color2">
        <a-row :gutter="[8, 8]">
          <a-col :span="12">
            <color-picker
              v-model="ruleForm.color2"
              show-alpha
              colorFormat="hex"
              placement="bottomLeft"
              :predefine="predefineColors"
            />
          </a-col>
          <a-col :span="12" :style="{ color: ruleForm.color2 }">
            回显：{{ ruleForm.color2 }}
          </a-col>
        </a-row>
      </a-form-model-item>
    </a-form-model>
    <a-row>
      <a-col :span="5"><h2>文档和源码：</h2></a-col>
      <a-col :span="12">
        <div class="social-links">
          <a
            href="https://gitee.com/sudot/antdv1.x-color-picker"
            title="gitee"
            target="_blank"
            rel="noreferrer noopener"
            class="social-link"
          >
            <img
              alt="gitee logo"
              src="https://gitee.com/assets/favicon.ico"
              decoding="async"
              style="width: 100%; height: 100%"
            />
          </a>
          <a
            href="https://github.com/sudot/antdv1.x-color-picker"
            title="GitHub"
            target="_blank"
            rel="noreferrer noopener"
            class="social-link"
          >
            <a-icon type="github" />
          </a>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ColorPicker from '@/components/color-picker';

export default {
  name: 'App',
  components: {
    ColorPicker,
  },
  data() {
    return {
      ruleForm: {
        color: '',
        color2: '',
      },
      predefineColors: [
        '#FF7875',
        '#FF9C6E',
        '#FFC069',
        '#FFD666',
        '#FFF566',
        '#D3F261',
        '#95DE64',
        '#5CDBD3',
        '#69C0FF',
        '#85A5FF',
        '#B37FEB',
        '#FF85C0',
        '#000000',
        '#FFFFFF',
        '#FFFFFF00',
      ],
    };
  },
};
</script>

<style>
#app {
  width: 800px;
  padding-top: 50px;
}
.social-links {
  display: flex;
  align-items: center;
}
.social-link {
  display: block;
  color: #303133;
  width: 30px;
  height: 30px;
  margin: 0 10px;
}
.social-link .anticon {
  font-size: 30px;
}
.social-link:hover {
  color: #303133;
}
</style>
