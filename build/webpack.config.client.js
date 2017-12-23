const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';


let config = {
    entry:{
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: "[name][hash].js",
        path: path.join(__dirname, '../dist'),
        publicPath: "/public/"
    },
    module: {
        rules: [
            {
                enforce: "pre", // 编译之前执行eslint检查
                test: /.(js|jsx)$/,
                loader: "eslint-loader",
                exclude: path.join(__dirname, "../node_modules")
            },
            {
                test: /.jsx$/,
                loader: "babel-loader"
            },
            {
                test: /.js$/,
                loader: "babel-loader",
                exclude: path.join(__dirname, '../node_modules')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../client/template.html")
        })
    ]
};


if (isDev) {
    config.entry = {
        app: [
            'react-hot-loader/patch',
            config.entry.app
        ]
    };
    config.devServer = {
        host: "0.0.0.0",
        port: 8888,
        contentBase: path.join(__dirname, "../dist"),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: "/public/",
        historyApiFallback: {
            index: "/public/index.html"
        }
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}

module.exports = config;