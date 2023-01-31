const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    resolve: {
        alias: {
            "~": path.resolve(__dirname, './src'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv(),
    ],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node-modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                use: ['source-map-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jp(e*)g|gif)$/i,
                use: ['file-loader'],
            },
            {
                test: /\.svg$/i,
                /** icon 속성은 import한 svg를 커스텀할 수 있도록 해주는 옵션 */
                use: [{ loader: '@svgr/webpack', options: { icon: true } }],
            }
        ],
    },
}