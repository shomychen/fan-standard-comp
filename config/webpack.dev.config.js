const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    // 入口文件
    entry: {
        main:'./src/main.js',
        main2:'./src/main2.js' //这里新添加一个入口文件
    },
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    // 插件
    plugins: [
        // JS压缩插件
        new uglify(),
        new htmlPlugin({
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template:'./src/index.html' //是要打包的html模版路径和文件名称。
        })
    ],
    // 配置开发服务功能
    devServer: {
        // 设置基本目录结构
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        // 是否开启服务端
        compress: true,
        // 配置端口
        port: 8801,
    }
}