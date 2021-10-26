const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {version} = require('../package.json');
const webpack = require('webpack');
const path = require("path");

module.exports = {
    mode: 'development',

    entry: {
        'dist/fontawsomepicker.min': path.resolve('./src/js/fontawsomepicker.js'),
        'dist/css/fontawsomepicker.min': path.resolve('./src/scss/base.scss'),
    },

    output: {
        filename: '[name].js',
        library: {
            type: 'umd',
            name: 'FontawsomePicker',
            export: 'default',
            umdNamedDefine: true
        }
    },

    devServer: {
        static: '.',
        host: '0.0.0.0',
        port: 3006
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
