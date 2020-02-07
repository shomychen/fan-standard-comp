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
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader",// compiles Less to CSS
                        options: {
                            sourceMap: true,
                            // modifyVars:theme
                        }
                    }
                ]
            },
            {
                test: /\.cm\.styl$/,
                loader: 'style-loader!css-loader?modules&camelCase&localIdentName=[local]-[hash:base64:5]!stylus-loader'
            }
        ]
    },
    externals: [nodeExternals()]
};
