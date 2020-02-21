const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 插件
const plugins = [
  new uglify(), // js压缩
  new htmlPlugin({
    minify: { //是对html文件进行压缩
      removeAttributeQuotes: true  //removeAttrubuteQuotes是却掉属性的双引号。
    },
    hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
    template: './beta-build/webpack-config/src/index.html' //是要打包的html模版路径和文件名称。
  }),
  // css/less 转换成.css文件引入, less|css 模块包使用：'style-loader'替换 'MiniCssExtractPlugin.loader'
  // new MiniCssExtractPlugin({
  //   filename: '[name]-[contenthash].css',
  //   chunkFilename: '[name]-[contenthash].css',
  // }),
];

module.exports = {
  // mode: 'development',
  mode: isDev ? 'development' : 'production',
  // 入口文件
  entry: {
    main: './beta-build/webpack-config/src/main.js',
    main2: './beta-build/webpack-config/src/main2.js' //这里新添加一个入口文件
  },
  // 输出
  output: {
    // 单个1 - 打包路径
    path: path.resolve(__dirname, '../webpack-dist'),
    // 单个1 - 打包文件名
    // filename: 'bundle.js', // 原单个main.js直接变成 bundle.js
    // 多个2 - 打包文件名
    filename: '[name].js' // [name]指打包后文件名与原文件名保持一致，有几个入口文件就能对应打包几个文件
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader', // 默认在head添加对应样式文件的<style>标签应用样式，若要让样式直接使用样式表引入，则配置为 `MiniCssExtractPlugin.loader`，并且需要有plugins添加配置的样式文件命名规则
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          }
        ],
        sideEffects: true,
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
        sideEffects: true,
      }
    ]
  },
  // 配置项通过别名来把原导入路径映射成一个新的导入路径，如：
  // resolve: {
  //   alias: {
  //     'react-tabs': path.resolve(__dirname, 'src/index'),
  //   },
  // },
  // 配置开发服务功能
  devServer: {
    // 设置基本目录结构
    contentBase: path.resolve(__dirname, '../webpack-dist'),
    host: 'localhost',
    // 是否开启服务端
    compress: true,
    // 配置端口
    port: 8801,
  },
  // 插件
  plugins,
}
