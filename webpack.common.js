'use strict';

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const yaml = require('yaml');
const parseYAMLThenStringifySync = (filename) => JSON.stringify(yaml.parse(fs.readFileSync(`./source/data/${filename}`, 'utf8')));

const rev = fs.readFileSync('.git/HEAD').toString().trim();
const gitCommitHash = rev.indexOf(':') === -1 ? 'unknown' :
    fs.readFileSync('.git/' + rev.substring(5)).toString().trim();

const data = {
    revision: JSON.stringify(gitCommitHash),
    contact: parseYAMLThenStringifySync('contact.yml'),
    header: parseYAMLThenStringifySync('header.yml'),
    publications: parseYAMLThenStringifySync('publications.yml')
};

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const imagemin = require('imagemin');
const webp = require('imagemin-webp');
// const { imageminSvgo } = require('imagemin-svgo');

imagemin(['source/images/*.{jpg,png}'], {
    destination: 'source/images',
    plugins: [
        webp({ quality: 96 })
    ]
})
// imagemin(['source/images/*.{svg}'], {
//     destination: 'source/images',
//     plugins: [
//         imageminSvgo({
//             plugins: [{
//                 name: 'removeViewBox',
//                 active: false
//             }]
//         })
//     ]
// })


// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


module.exports = function (env) {

    const pugFiles = glob.sync(path.join(__dirname, 'source', '/*.pug'));
    console.log(pugFiles);

    const templates = [];
    pugFiles.forEach((template) => {
        const filename = path.relative(path.join(__dirname, 'source'), template);
        templates.push(new HtmlWebpackPlugin({
            filename: filename.replace('.pug', '.html'),
            template: filename,
            inject: false
        }));
    });

    return {

        context: path.resolve(__dirname, "./source"),
        entry: {
            'styles': ['./styles/main.scss'],
        },

        plugins: [
            ...templates,
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'images/**/*.webp', to: '[path]/[name][ext]', force: false },
                    { from: 'vcard.vcf', to: '[name][ext]', force: false },
                ]
            }),
            // new ImageMinimizerPlugin({
            //     test: /\.(jpe?g|png)$/i,
            //     deleteOriginalAssets: true,
            //     filename: '[path][name].webp',
            //     minimizerOptions: {
            //         encodeOptions: {
            //             webp: { /* how to change quality? */
            //             },
            //         },
            //         plugins: ['imagemin-webp'],
            //     },
            // }),
            new webpack.DefinePlugin({
                data: data,
                // VISUALIZATIONS: JSON.stringify(require('./source/visualizations.json')),
                // RESOURCES: JSON.stringify(require('./source/resources.json')),
                // MEDIA: JSON.stringify(media),
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        ],

        output: {
            path: path.resolve(__dirname, "./build"),
            library: undefined,
        },

        module: {
            rules: [
                {
                    test: /\.(png)$/,
                    type: 'asset',
                },
                {
                    test: /\.pug$/,
                    include: /source/,
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'pug-loader',
                    }],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ]
        },
    };
}
