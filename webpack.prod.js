/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const glob = require('glob');
const path = require('path');
const fs = require('fs');

const PurgecssPlugin = require('purgecss-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');


const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = function (env) {
    const config = common(env);
    return merge(config,
        {
            mode: 'production',
            cache: false,
            plugins: [

                new PurgecssPlugin({
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
};
