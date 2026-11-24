const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        allowedHosts: 'all',
        headers: {
            'Cross-Origin-Resource-Policy': 'cross-origin'
        },
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './marketingApp': './src/bootstrap'
            },
            shared: ['react', 'react-dom']
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};

module.exports = merge(commonConfig, devConfig)