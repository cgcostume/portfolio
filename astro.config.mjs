import { defineConfig } from 'astro/config';
import purgecss from 'astro-purgecss';

export default defineConfig({
    site: 'https://daniellimberger.de',
    integrations: [
        purgecss({
            // classes added at runtime by GLightbox and Bootstrap's collapse
            safelist: {
                standard: ['show', 'collapsing', 'animate'],
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
