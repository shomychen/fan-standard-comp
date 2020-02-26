import { IConfig } from 'umi-types';
// import theme from './src/variables/varBuildBase.js'

import varBuildBase from './src/variables/varBuildBase.js'; // 浅色主题 变量文件
import varBuildLight from './src/variables/varBuildLight.js'; // 浅色主题 变量文件
// ref: https://umijs.org/config/
let baseTheme = {
  '@primary-color': '#528DFF',
  ...varBuildBase,
  ...varBuildLight, // 简约主题
  }
const config: IConfig =  {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' }
      ]
    }
  ],
  theme: baseTheme,
  // theme: theme,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: '演示站点',
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
