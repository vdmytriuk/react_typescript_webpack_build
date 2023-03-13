import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import StylelintWebpackPlugin from "stylelint-webpack-plugin";

import {BuildOptions} from "./types/config";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
    const {paths} = options;

    const plugins = [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: paths.htmlTemplate
        }),
        new StylelintWebpackPlugin({
           configFile: '.stylelintrc',
           files: '**/*.scss',
           failOnError: true
        }),
        // new BundleAnalyzerPlugin({
        //     openAnalyzer: true
        // })
    ];

    if (options.isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new ReactRefreshWebpackPlugin());
        // plugins.push(new BundleAnalyzerPlugin({}));
    }

    return plugins;
}