const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'fanStandardComp', // 导出方法名(注：不能包含-)
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
    filename: 'fan-standard-comp.umd.js',
    globalObject: 'this',
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/typescript', '@babel/env', '@babel/react'],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              [
                '@babel/env',
                {
                  loose: true,
                  modules: false,
                },
              ],
              '@babel/react',
            ],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(jpeg|jpg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
          // {
          //   loader: 'url-loader', options: { limit: 1000  } // 图片导入，与 file-loader类似
          // },
        ],
        sideEffects: true,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader:'file-loader',
          options: {
            name: "[name].[ext]",
            outputPath: './fonts'
          }
        }]
      }
    ],
  },
  externals: {
    react: 'React',
    antd: 'antd',
    lodash: 'lodash',
  },
};
