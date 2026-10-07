import { defineConfig } from 'astro/config';
import purgecss from 'astro-purgecss';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://daniellimberger.de',
    integrations: [
        sitemap({
            // pages are built as .html files (build.format 'file'), keep sitemap in line with canonical urls
            serialize: (item) => ({ ...item, url: item.url.replace(/([^/])$/, '$1.html') }),
        }),
        purgecss({
            // classes added at runtime by GLightbox
            safelist: {
                standard: ['animate'],
                greedy: [/^g[a-z]/, /^(current|prev|next|loaded|zoomed|dragging|desc-|description|fade|slide|zoom|glightbox)/],
            },
        }),
    ],
    build: {
        format: 'file',
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
                },
            },
        },
    },
});
