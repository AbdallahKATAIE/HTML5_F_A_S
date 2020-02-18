
const path = require('path');

module.exports = {
  publicPath: '/public',
  assetsDir: 'assets',
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@public': path.resolve(__dirname, 'public'),
      }
    }
  },
  css: {
    sourceMap: true
  },
  lintOnSave: false
}