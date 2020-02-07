const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    // 入口文件
    entry: './src/app.js',
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
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.(css|less)$/,
            //     use: ['style-loader', 'less-loader', 'css-loader'],
            //     // exclude: /node_modules/
            // },
            {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    // {
                    //     loader: require.resolve('postcss-loader'),
                    //     options: {
                    //         ident: 'postcss',
                    //         plugins: () => [
                    //             require('postcss-flexbugs-fixes'),
                    //             autoprefixer({
                    //                 browsers: [
                    //                     '>1%',
                    //                     'last 4 versions',
                    //                     'Firefox ESR',
                    //                     'not ie < 9', // React doesn't support IE8 anyway
                    //                 ],
                    //                 flexbox: 'no-2009',
                    //             }),
                    //         ],
                    //     },
                    // },
                    {
                        loader: require.resolve('less-loader'), // compiles Less to LESS
                        // options: {
                        //     importLoaders: 2,
                        //     modules: true,
                        //     // getLocalIdent: getCSSModuleLocalIdent,
                        // },
                    },
                ],
            },
            // {
            //     test: /\.cm\.styl$/,
            //     loader: 'style-loader!css-loader?modules&camelCase&localIdentName=[local]-[hash:base64:5]!stylus-loader'
            // }
        ]
    },
    // 插件
    plugins: [
        // JS压缩插件
        new uglify(),
        new htmlPlugin({
            template: 'public/index.html'
        })
    ],
    // 配置开发服务功能
    devServer: {
        // 设置基本目录结构
        contentBase: './dist',
        host: 'localhost',
        // 是否开启服务端
        compress: true,
        // 配置端口
        port: 8801,
    }
}