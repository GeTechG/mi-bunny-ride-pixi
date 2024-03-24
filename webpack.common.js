const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {TsconfigPathsPlugin} = require("tsconfig-paths-webpack-plugin");

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({ extensions: ['.ts', '.js'] }),
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'static/' }],
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            hash: true,
            minify: false
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}