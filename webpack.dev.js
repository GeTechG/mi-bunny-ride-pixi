const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        compress: true,
        allowedHosts: "all",
        static: false,
        client: {
            logging: "warn",
            overlay: {
                errors: true,
                warnings: false,
            },
            progress: true,
        }
    },
    performance: {
        hints: false
    },
});