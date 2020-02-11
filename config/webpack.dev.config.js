const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

module.exports = {
  mode: 'development',
  // 入口文件
  entry: './src/app.js',
  // 输出
  output: {
    // 单个1 - 打包路径
    path: path.resolve(__dirname, '../dist'),
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
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        // exclude: /node_modules\.(css|less)/,
        exclude: /node_modules/,
        use: [
          // MiniCssExtractPlugin.loader, // 打包成单独引入的样式表
          'style-loader', //  直接生成style标签
          // 'css-loader?modules&localIndentName=[name]_[local]_[hash:base64:5]',
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              // modules: true,
              modules: {
                // localIdentName: "[path][name]-[local]-[hash:5]", // 类名转换格式
                localIdentName: "[name]-[local]", // 类名转换格式
              }
            },
          },
          {
            loader: require.resolve('less-loader'), // compiles Less to LESS
            options: {
              // javascriptEnabled: true,
              importLoaders: 2,
              modules: true,
            },
          },
        ],
      },
      // {
      //   test: /\.(less|css)$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','less-loader'],
      //   sideEffects: true,
      // },
    ]
  },
  // 插件
  plugins: [
    // JS压缩插件
    new uglify(),
    new htmlPlugin({
      template: 'public/index.html'
    }),
    // css/less 转换成.css文件引入
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      chunkFilename: '[name]-[contenthash].css',
    }),
  ],
  // 配置开发服务功能
  devServer: {
    // 设置基本目录结构
    contentBase: './dist',
    host: 'localhost',
    // 是否开启服务端
    compress: true,
    // 配置端口
    port: 8801,
  }
}
