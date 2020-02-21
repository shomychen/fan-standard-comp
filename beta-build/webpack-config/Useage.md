## 测试使用webpack进行打包

使用时，在package.json定义scripts命令来运行
```
scripts: {
    // 打包
    "beta-webpack-build": "webpack --config=beta-build/webpack-config/webpack.dev.config.js", 
    // 启动服务
    "beta-webpack-server": "webpack-dev-server --config=beta-build/webpack-config/webpack.dev.config.js",
}

```
