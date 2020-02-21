// rollup.config.js

import pkg from '../../package.json';
import { basename, extname, join } from 'path';
import { terser } from 'rollup-plugin-terser';
// import typescript2 from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
// import inject from 'rollup-plugin-inject';
// import { camelCase } from 'lodash';
// import tempDir from 'temp-dir';
// import autoprefixer from 'autoprefixer';
import NpmImport from 'less-plugin-npm-import';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
// import { IBundleOptions } from './types';
import json from 'rollup-plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve"; // 用于识别node_modules中的包
import babel from "rollup-plugin-babel";
import less from "rollup-plugin-less";
import replace from "@rollup/plugin-replace";
import alias from '@rollup/plugin-alias';


// amd – 异步模块定义，用于像RequireJS这样的模块加载器
// cjs – CommonJS，适用于 Node 和 Browserify/Webpack
// es – 将软件包保存为ES模块文件
// iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
// umd – 通用模块定义，以amd，cjs 和 iife 为一体
const buildArray = ['amd', 'cjs', 'esm', 'iife', 'umd']

function getPlugins() {
  return [
    url(),
    svgr(),
    // css 处理，暂时没有加插件
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
    // postcss({
    //   extract: extractCSS,
    //   inject: injectCSS,
    //   modules,
    //   minimize: !!minCSS,
    //   use: [
    //     [
    //       'less',
    //       {
    //         plugins: [new NpmImport({ prefix: '~' })],
    //         javascriptEnabled: true,
    //         ...lessInRollupMode,
    //       },
    //     ],
    //     [
    //       'sass',
    //       {
    //         ...sassInRollupMode,
    //       },
    //     ],
    //   ],
    //   plugins: [autoprefixer(autoprefixerOpts), ...extraPostCSSPlugins],
    // }),
    // ...(injectOpts ? [inject(injectOpts)] : []),
    // ...(replaceOpts && Object.keys(replaceOpts || {}).length ? [replace(replaceOpts)] : []),
    nodeResolve({
      mainFields: ['module', 'jsnext:main', 'main'],
    }),
    // babel(babelOpts),
    babel({
      exclude: /\/node_modules\//, "presets": ["@babel/preset-env", "@babel/preset-react"], plugins: ['transform-react-remove-prop-types'] }),
    json(),
    alias({
      entries: [
        // { find: '~', replacement: '../node_modules/' },
        { find: '@', replacement: '../src' },
      ]
    })
  ];
}

export default {
  input: 'src/index.js',
  output: {
    format: 'esm',
    file: 'dist/fan-comp.js',
  },
  plugins: [...getPlugins()],
  // external: testExternal.bind(null, external, externalsExclude),
}
