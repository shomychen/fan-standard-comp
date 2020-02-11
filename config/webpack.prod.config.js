const path = require('path');
const nodeExternals = require('webpack-node-externals'); // 使得打包的组件中不包括任何 node_modules 里面的第三方组件，起到减小体积的作用

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2', // 注意这里按 commonjs2 模块规范打包
  },
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
              javascriptEnabled: true,
              importLoaders: 2,
              modules: true,
            },
          },
        ],
      },
    ]
  },
  externals: [nodeExternals()]
};
