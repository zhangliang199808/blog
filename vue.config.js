const webpack = require('webpack')

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
  },
  devServer: {
    proxy: {
      '/api':{
          target: 'http://47.101.206.36:9000',
          changeOrigin: true,
          pathRewrite:{  // 路径重写，
            '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
          }
      }
    }
  }
}
