var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebPack=require('webpack');

module.exports = { //注意这里是exports不是export
    entry: __dirname + "/app/main.js", //唯一入口文件，就像Java中的main方法
    output: { //输出目录
        path: __dirname + "/build", //打包后的js文件存放的地方
        filename: "bundle.js" //打包后的js文件名
    },
    module: { // 如何处理项目中不同类型的模块
        rules: [ // 用于规定在不同模块被创建时如何处理模块的规则数组
            {
                test: /\.(js|jsx)$/, //一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/, //屏蔽不需要处理的文件（文件夹）（可选）
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello World app',
            template: './app/index.html'
        }),
        new WebPack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json', '.scss', '.less', 'jsonp'],
    },
    devServer: {
        historyApiFallback: true,
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    }
};