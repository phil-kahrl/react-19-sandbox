'use strict';

const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin');

const isProduction = process.env.NODE_ENV === 'production';
rimraf.sync(path.resolve(__dirname, '../build'));
webpack(
    {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
        entry: [path.resolve(__dirname, 'index.js')],
        output: {
            path: path.resolve(__dirname, './build'),
            filename: 'main.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: path.resolve(__dirname, './public/index.html'),
            }),
            new ReactServerWebpackPlugin({isServer: false}),
        ]

    },
    (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            const info = stats.toJson();
            if (stats.hasErrors()) {
                console.log('Finished running webpack with errors.');
                info.errrors.forEach( (e) => console.error(e));
                process.exit(1);
            } else {
                console.log('Finished running webpack.')
            }
        }
    }
)