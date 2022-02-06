
import path from 'path';
import glob from 'glob';
import fs from 'fs';

import PurgecssWebpackPlugin from 'purgecss-webpack-plugin';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';


export default (env, __dirname) => {

    return {
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
                    }],
                },
            }),

        ],
    };
}
