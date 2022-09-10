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
        new Dotenv({
            systemvars: true
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ]
                    }
                },
                exclude: /node-modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
}