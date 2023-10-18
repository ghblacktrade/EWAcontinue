import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildPlugin } from "./build.plugins";
import { buildLoader } from "./build.loaders";
import { buildResolve } from "./build.resolve";
import { buildDevServer } from "./buildDevServer";


export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const {paths, mode, isDev} = options

    return {
        mode: mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.dist,
            clean: true,
        },
        plugins: buildPlugin(options),
        module: {
            rules: buildLoader(options)
        },
        resolve: buildResolve(),
        devtool: isDev
            ? 'inline-source-map'
            : undefined,
        devServer: isDev
            ?  buildDevServer(options)
            : undefined,
    }
}