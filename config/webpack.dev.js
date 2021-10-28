const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {version} = require('../package.json');
const webpack = require('webpack');
const path = require("path");

module.exports = {
    mode: 'development',

    cache: false,

    entry: {
        'dist/icon-picker.min': path.resolve('./src/js/IconPicker.js'),
        'dist/css/icon-picker.min': path.resolve('./src/scss/base.scss'),
    },

    output: {
        filename: '[name].js',
        publicPath: '/',
        library: {
            type: 'umd',
            name: 'IconPicker',
            export: 'default',
            umdNamedDefine: true
        }
    },

    devServer: {
        static: '.',
        hot: false
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(version)
        })
    ]
};
