import path from 'path';
import glob from 'glob';

import { merge } from 'webpack-merge';
import common from './webpack.common.mjs';

import { PurgeCSSPlugin } from 'purgecss-webpack-plugin';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function (env) {
    const config = common(env, __dirname);
    return merge(config,
        {
            mode: 'production',
            cache: false,
            plugins: [

                new PurgeCSSPlugin({
                    paths: glob.sync(path.join(__dirname, 'source', '/**/*'), { nodir: true }),
                    safelist: { greedy: [/^(gslide|gdesc)-/] }
                }),

            ],
        });
}
