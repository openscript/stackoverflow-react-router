import * as Webpack from 'webpack';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as path from 'path';

const config: Webpack.Configuration = {
    entry: ['./src/index.tsx'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },

    devtool: 'source-map',
    devServer: {
        historyApiFallback: true
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: '/node_modules/',
                use: 'awesome-typescript-loader'
            }, {
                test: /\.scss$/,
                exclude: '/node_modules/',
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: true,
                        namedExport: true,
                        sass: true
                    }
                }, {
                    loader: 'sass-loader',
                    query: {
                        sourceMap: true
                    }
                }]
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/index.html' }
        ])
    ]
};

export default config;