const { defineConfig } = require('@vue/cli-service');

const pkgName = process.VUE_CLI_SERVICE.pkg.name;

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: `/${pkgName}`,
});
