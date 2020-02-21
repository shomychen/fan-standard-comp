// rollup.config.js

import pkg from './package.json';
import { basename, extname, join } from 'path';
import { terser } from 'rollup-plugin-terser';
// import typescript2 from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
// import inject from 'rollup-plugin-inject';
// import { camelCase } from 'lodash';
// import tempDir from 'temp-dir';
// import autoprefixer from 'autoprefixer';
import NpmImport from 'less-plugin-npm-import';
// import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
// import { IBundleOptions } from './types';
import json from 'rollup-plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve"; // 用于识别node_modules中的包
import babel from "rollup-plugin-babel";
import less from "rollup-plugin-less";
import replace from "@rollup/plugin-replace";
import alias from '@rollup/plugin-alias';

export default {
  input: 'src/index.js',
  output: {
    // file: 'bundleex.js',
    // format: 'cjs',
    // file: 'dist/fan-comp.esm.js',
    format: 'esm', // 输出的格式 可以是 cjs commonJs 规范 | es es Module 规范 | iife 浏览器可引入的规范
    // sourceMap: true,
  },
  plugins: [
    // ...getPlugins(),
    json(),
    url(),
    // svgr(),
    commonjs({ exclude: 'src/**' }),
    nodeResolve({
      extensions: [".js", ".ts", ".jsx"]
    }),
    babel({
      exclude: 'node_modules/**', // 排除node_modules 下的文件
      runtimeHelpers: true,
      extensions: [".js", ".ts", ".jsx"],
    }),
    less(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    alias({
      entries: [
        { find: '~', replacement: '../node_modules/' },
        { find: '@', replacement: '../src' },
      ]
    })
  ],

};
