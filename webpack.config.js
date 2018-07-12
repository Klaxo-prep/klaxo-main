const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', path.join(path.resolve(__dirname, 'Source/JavaScript'), 'Mounter.jsx')],
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(path.resolve(__dirname, 'Source'), 'index.html')
        })
    ],
    output: {
        filename: 'app.bundle.js',
        chunkFilename: 'chunk-[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true
    },
    mode: "development"
};