const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sourceDirectory = path.resolve(__dirname, 'examples/src');
const targetDirectory = path.resolve(__dirname, 'examples/dist'); // 打包目录

const isDev = process.env.NODE_ENV !== 'production'; // 当前是否是开发模式

const plugins = [
  // new uglify(), // JS压缩插件
  new HtmlWebpackPlugin({
    filename: 'index.html',
    inject: true,
    template: path.resolve(__dirname, 'examples/src/index.html'),
    minify: {
      collapseWhitespace: !isDev,
      removeComments: !isDev,
      removeRedundantAttributes: !isDev,
    },
  }),
  // css/less 转换成.css文件引入
  new MiniCssExtractPlugin({
    filename: '[name]-[contenthash].css',
    chunkFilename: '[name]-[contenthash].css',
  }),
];

if (!isDev) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  );
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  context: sourceDirectory,
  entry: {
    app: './app.js', // 入口文件
  },
  output: {
    path: targetDirectory,
    chunkFilename: 'chunk-[chunkhash].js',
    filename: '[name]-[chunkhash].js',
    hashDigestLength: 8,
  },
  devServer: {
    contentBase: sourceDirectory,
    port: 8000,
  },
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
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
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  // 配置项通过别名来把原导入路径映射成一个新的导入路径
  // resolve: {
  //   alias: {
  //     'react-tabs': path.resolve(__dirname, 'src/index'),
  //   },
  // },
  plugins,
};
