
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import webpack from 'webpack';

import yaml from 'yaml';

const parseYAMLThenStringifySync = (filename) => {
    const data = fs.readFileSync(`./source/data/${filename}`, 'utf8');
    return JSON.stringify(yaml.parse(data));
}

const createBibliographyFromBibFilesSync = (filenames) => {
    const entries = {};
    filenames.forEach((filename) => {
        const entry = fs.readFileSync(filename, 'utf8');
        const key = path.basename(filename, '.bib');
        entries[key] = entry;
    });
    return JSON.stringify(entries);
}

const rev = fs.readFileSync('.git/HEAD').toString().trim();
const gitCommitHash = rev.indexOf(':') === -1 ? 'unknown' :
    fs.readFileSync('.git/' + rev.substring(5)).toString().trim();

const bibFiles = glob.sync(path.join('source/data/bibliography', '/*.bib'));

const data = {
    revision: JSON.stringify(gitCommitHash),
    config: parseYAMLThenStringifySync('config.yml'),
    contact: parseYAMLThenStringifySync('contact.yml'),
    header: parseYAMLThenStringifySync('header.yml'),
    publications: parseYAMLThenStringifySync('publications.yml'),
    bibliography: createBibliographyFromBibFilesSync(bibFiles)
};


import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

/* For now, all image sources are specified at pug-compile-time based on the respective yaml files. This makes it
   difficult to use webpack loader for webp-optimization, since this implies require with expressions... */

import imagemin from 'imagemin';
import webp from 'imagemin-webp';

export default function (env, __dirname) {

    const pugFiles = glob.sync(path.join(__dirname, 'source', '/*.pug'));
    console.log(`collecting pug files in "${path.join(__dirname, 'source')}":`, pugFiles);

    const templates = [];
    pugFiles.forEach((template) => {
        const filename = path.relative(path.join(__dirname, 'source'), template);
        templates.push(new HtmlWebpackPlugin({
            filename: filename.replace('.pug', '.html'),
            template: filename,
            inject: false
        }));
    });

    const images = glob.sync(path.join(__dirname, 'source/images', '/*.{jpe?g,png}'));
    console.log(`optimizing images in "${path.join(__dirname, 'source/images')}":`, images);

    imagemin(images, {
        destination: 'source/images',
        plugins: [
            webp({ quality: [88, 96] })
        ]
    })


    return {

        context: path.resolve(__dirname, "./source"),
        entry: {
            'styles': ['./styles/main.scss'],
            'bootstrap': ['./scripts/bootstrap.mjs'],
            'scripts': ['./scripts/scripts.mjs'],
        },

        plugins: [
            ...templates,
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'images/**/*.webp', to: '[path]/[name][ext]', force: false },
                    { from: 'data/bibliography/*.bib', to: 'bibliography/[name][ext]', force: false },
                    { from: 'vcard.vcf', to: '[name][ext]', force: false },
                    /* third party scripts */
                    { from: '../node_modules/jquery/dist/jquery.min.js', to: '[name][ext]' },
                ]
            }),
            new webpack.DefinePlugin({
                data: data,
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
                // {
                //     test: /\.(jpe?g|png)$/i,
                //     type: 'asset/resource',
                //     generator: { filename: 'webp-generated/[name][ext]' }
                // },
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

        // optimization: {
        //     minimizer: [
        //         '...',
        //         new ImageMinimizerPlugin({
        //             minimizer: {
        //                 implementation: ImageMinimizerPlugin.imageminMinify,
        //                 options: {
        //                     plugins: ['imagemin-mozjpeg', 'imagemin-pngquant']
        //                 }
        //             },
        //             generator: [
        //                 { // use `?as=webp`
        //                     preset: 'webp',
        //                     implementation: ImageMinimizerPlugin.imageminGenerate,
        //                     options: {
        //                         plugins: [['imagemin-webp', { quality: [88, 96] }]],
        //                     },
        //                 }]
        //         })
        //     ]
        // }
    };
}
