
import path from 'path';
import glob from 'glob';
import fs from 'fs';

import PurgecssWebpackPlugin from 'purgecss-webpack-plugin';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';

import { merge } from 'webpack-merge';
import common from './webpack.common.mjs';


import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function (env) {
    const config = common(env, __dirname);
    return merge(config,
        {
            mode: 'production',
            cache: false,
            plugins: [

                new PurgecssWebpackPlugin({
                    paths: glob.sync(path.join(__dirname, 'source', '/**/*'), { nodir: true }),
                }),

                new WebpackShellPluginNext({
                    onBuildEnd: {
                        scripts: [() => {
                            fs.unlinkSync(path.resolve(__dirname, "./build/styles.js"));
                        }]
                    }
                })

            ]
        });
}
