## 启动命令说明

```
// 启动演示站点DEMO
$ npm run start
// 打包演示站点DEMO
$ npm run build


// 打包基础组件库并发布
$ npm run libirary:build


// 启动文档站点
$ npm run docz:dev 
// 打包文档站点
$ npm run docz:build 

```

### 目录说明

```
│  .babelrc.js             // babel编译基本配置项文件
│  .umirc.ts               // umi服务配置文件
│  doczrc.js               // docz配置文件
│  package.json
│  README.md
│  
├─beta-build               // 测试构建及打包方式的旧文件
│ 
├─docs                     // 组件文档说明，用于docz启动的目录
│      
├─packages                 // 通用组件库文件包，此目录为单独项目，启用编译进行打包与发布操作
│      .fatherrc.js        // 使用umi的father工具，针对可直接生成es/lib可用于模块化引入的文件包
│      webpack.config.js
│      
└─src                      // 演示站点资源文件
    │  app.ts
    │  global.css
    │  
    ├─components
    └─pages

```
