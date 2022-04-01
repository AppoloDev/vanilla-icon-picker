const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-remove-empty-scripts');
const {version} = require('../package.json');
const util = require('util');
const webpack = util.promisify(require('webpack'));
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

(async () => {
    const banner = new webpack.BannerPlugin(`Icon Picker ${version} MIT | https://github.com/AppoloDev/icon-picker`);

    // CSS
    await webpack({
        entry: {
            'default': path.resolve('./src/scss/themes/icon-picker.default.scss'),
            'bootstrap-5': path.resolve('./src/scss/themes/icon-picker.bootstrap-5.scss')
        },

        output: {
            path: path.resolve('./dist/themes')
        },

        module: {
            rules: [
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
            banner,
            new FixStyleOnlyEntriesPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].min.css'
            })
        ]
    })

    // JS
    await webpack({
        mode: 'production',

        entry: {
            'icon-picker.min': path.resolve('./src/js/IconPicker.js')
        },

        output: {
            path: path.resolve('./dist'),
            library: {
                name: 'IconPicker',
                export: 'default',
                type: 'umd2'
            }
        },

        plugins: [
            banner,
            new webpack.SourceMapDevToolPlugin({
                filename: 'icon-picker.min.map'
            })
        ],

        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false
                })
            ]
        }
    })
})();
