
import fs from 'fs';
import { globSync } from 'glob';
import path from 'path';
import webpack from 'webpack';
import git from 'git-rev-sync';

import yaml from 'yaml';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import sharp from 'sharp';


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


export default async (env, __dirname) => {

    const bibFiles = globSync(path.join('source/data/bibliography', '*.bib'));

    const data = {
        revision: JSON.stringify(git.short(__dirname)),
        config: parseYAMLThenStringifySync('config.yml'),
        contact: parseYAMLThenStringifySync('contact.yml'),
        header: parseYAMLThenStringifySync('header.yml'),
        publications: parseYAMLThenStringifySync('publications.yml'),
        repositories: parseYAMLThenStringifySync('repositories.yml'),
        teaching_activities: parseYAMLThenStringifySync('teaching-activities.yml'),
        bibliography: createBibliographyFromBibFilesSync(bibFiles)
    };

    // Pug Configuration

    const pugFiles = globSync(path.join(__dirname, 'source', '*.pug').replace(/\\/g, '/'));
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

    // Image Optimization (AVIF + WebP) - must complete before webpack processes files

    const imagesPattern = path.join(__dirname, 'source', 'images', '*.{jpg,jpeg,png}').replace(/\\/g, '/');
    console.log(`Looking for images with pattern: ${imagesPattern}`);
    const images = globSync(imagesPattern);
    console.log(`optimizing images in "${path.join(__dirname, 'source/images')}":`, images);

    // Generate AVIF and WebP versions for each source image in multiple resolutions
    const promises = [];
    const resolutions = [
        { width: 384, postfix: '-384w' },
        { width: 768, postfix: '-768w' }
    ];

    for (const imagePath of images) {
        const outputBase = imagePath.replace(/\.(jpg|jpeg|png)$/i, '');

        // Get source file modification time
        const sourceStats = fs.statSync(imagePath);
        const sourceMtime = sourceStats.mtime;

        // Generate each resolution variant
        for (const { width, postfix } of resolutions) {
            const avifPath = `${outputBase}${postfix}.avif`;
            const webpPath = `${outputBase}${postfix}.webp`;

            // Check if files need regeneration (missing or older than source)
            const avifExists = fs.existsSync(avifPath);
            const webpExists = fs.existsSync(webpPath);

            const needsAvif = !avifExists || (avifExists && fs.statSync(avifPath).mtime < sourceMtime);
            const needsWebp = !webpExists || (webpExists && fs.statSync(webpPath).mtime < sourceMtime);

            needsAvif && promises.push(sharp(imagePath).resize(width, width, { fit: 'cover' })
                .avif({ quality: 60, effort: 9, chromaSubsampling: '4:4:4' }).toFile(avifPath)
                .then(() => console.log(`Generated: ${path.basename(outputBase)}${postfix}.avif`))
                .catch(err => console.error(`Failed to generate AVIF for ${imagePath} at ${width}px:`, err.message)));

            needsWebp && promises.push(sharp(imagePath).resize(width, width, { fit: 'cover' })
                .webp({ quality: 80, effort: 6 }).toFile(webpPath)
                .then(() => console.log(`Generated: ${path.basename(outputBase)}${postfix}.webp`))
                .catch(err => console.error(`Failed to generate WebP for ${imagePath} at ${width}px:`, err.message)));
        }
    }

    // Wait for all image processing to complete before webpack continues
    if (promises.length > 0) {
        await Promise.all(promises);
        console.log(`Completed processing ${promises.length} image conversions`);
    }


    return {

        context: path.resolve(__dirname, 'source'),
        entry: {
            'styles': ['./styles/main.scss'],
            'bootstrap': ['./scripts/bootstrap.mjs'],
            'scripts': ['./scripts/scripts.mjs'],
        },

        plugins: [
            ...templates,
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'images/**/*.avif', to: '[path]/[name][ext]', force: false },
                    { from: 'images/**/*.webp', to: '[path]/[name][ext]', force: false },
                    { from: 'favicon*', to: '[path]/[name][ext]', force: false },
                    { from: 'resources/**/*', to: '[path]/[name][ext]', force: false },
                    { from: 'data/bibliography/*.bib', to: 'bibliography/[name][ext]', force: false },
                    { from: 'vcard.vcf', to: '[name][ext]', force: false },
                    /* third party scripts and assets */
                    // { from: '../node_modules/jquery/dist/jquery.min.js', to: '[name][ext]' },
                    { from: '../node_modules/glightbox/dist/css/glightbox.min.css', to: '[name][ext]' },
                ]
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),
            new webpack.DefinePlugin({
                data: data,
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            })
        ],

        output: {
            path: path.resolve(__dirname, 'build'),
            library: undefined,
        },

        module: {
            rules: [
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
                        {
                            loader: 'sass-loader',
                            options: {
                                api: 'modern-compiler',
                                sassOptions: {
                                    silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
                                },
                            },
                        },
                    ],
                },
            ]
        },
    };
}
