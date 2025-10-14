
import path from 'path';

import { merge } from 'webpack-merge';
import common from './webpack.common.mjs';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function (env) {
    const config = await common(env, __dirname);
    return merge(config,
        {
            mode: 'development',
            cache: false,
            devServer: {
                hot: false,
                static: {
                    directory: path.resolve(__dirname, 'build'),
                },
                port: 8080,
                open: false,
                devMiddleware: {
                    writeToDisk: true,
                },
            },
            optimization: {
                minimize: true,
            },
        });
}
