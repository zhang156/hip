'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InsertHtml = require('./webpack-insert-html')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const APP = process.env.APP
const modulePath = 'modules'

if (!APP) {
  console.log('Please set APP name')
  process.exit(1)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
      ]
    }, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    hot: true, // 热加载
    contentBase: false, // 静态资源引用路径  since we use CopyWebpackPlugin.
    compress: true, // gzip压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false, // 编译出错时页面全屏覆盖错误信息
    publicPath: config.dev.assetsPublicPath, // 此路径下的打包文件可在浏览器中访问
    proxy: config.dev.proxyTable,
    quiet: true, // 在控制台屏蔽webpack的错误和警告，常用来配合FriendlyErrorsPlugin（能够识别某些类的webpack错误并进行清理、聚合和排序，从而提供更好的开发体验。）  necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    } // 与监视文件相关的控制选项 poll轮询
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    /*  new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }), */
    /* new InsertHtml({
      tag: 'head',
      html: `<script>window.appId='${APP}'</script>`
    }), */
    new HtmlWebpackPlugin({
      // 模板来源
      template: `./src/${modulePath}/${APP}/${APP}.html`,
      // 文件名称
      filename: `${config.build.assetsRoot}/${APP}/index.html`,
      favicon: path.resolve('favicon.ico'),
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
