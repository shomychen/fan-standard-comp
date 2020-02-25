// import image from '@rollup/plugin-image';
// import postcss from 'rollup-plugin-postcss';
// import alias from '@rollup/plugin-alias';
// const path = require('path');
// 打包包括 esm 与 cjs 两种格式
export default {
  entry: 'src/index.js',
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
  cjs: 'babel',
  // doc: {
  //   themeConfig: { mode: 'dark' },
  //   base: '/your-repo'
  // },
  // lessInRollupMode: {
  //   javascriptEnabled: true
  // },
  // extraPostCSSPlugins: [],
  // lessInBabelMode: {
  //   paths: [ path.join(__dirname, 'less', 'includes') ]
  // }, // .less 文件成.css
  // lessInBabelMode: true,  // .less 文件成.css
  cssModules: {
    generateScopedName: '[name]-[local]', // 'foo-bar_[name]__[local]___[hash:base64:5]', // 配置是否开启 css module
  },
  /*extraRollupPlugins: [
    // image(),
    alias({
      entries: [
        { find: '~', replacement: 'node_modules/' },
        { find: '@', replacement: '../src' },
      ]
    }),
    postcss({
      // modules: true, // 增加 css-module 功能
      extensions: ['.less', '.css'],
      use: [
        ['less', {
          javascriptEnabled: true
        }]
      ],
      // inject: isDev, // dev 环境下的 样式是入住到 js 中的，其他环境不会注入
      extract: false // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
    }),
  ],
  extraExternals: [ 'react'], */
  extraBabelPlugins: [
    // 配置 babel-plugin-import 按需加载 antd
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }],
  ],
}
