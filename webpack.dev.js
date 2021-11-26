/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

// const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = function (env) {
    const config = common(env);
    return merge(config,
        {
            mode: 'development',
            cache: true,
            // output: {
            //     filename: 'styles.css',
            // },
        });
};
