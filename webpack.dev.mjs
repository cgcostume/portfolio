
import path from 'path';

import { merge } from 'webpack-merge';
import common from './webpack.common.mjs';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function (env) {
    const config = common(env, __dirname);
    return merge(config,
        {
            mode: 'development',
            cache: true,
            devServer: {
                hot: false
            },
            optimization: {
                minimize: true,
            },
        });
}
