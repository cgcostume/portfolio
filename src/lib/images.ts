import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

const sources = import.meta.glob<ImageMetadata>('../assets/images/*.{png,jpg,jpeg}', { import: 'default' });

const basename = (name: string) => name.replace(/^.*\//, '').replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');

/** Looks up the source image by name, ignoring the file extension used in the data files. */
export async function source(name: string): Promise<ImageMetadata> {
    const base = basename(name);
    const match = Object.entries(sources).find(([file]) => basename(file) === base);
    if (!match) throw new Error(`image not found: ${name}`);
    return match[1]();
}

/** Square, center-cropped AVIF and WebP variants of the given width. */
export async function square(name: string, width: number) {
    const src = await source(name);
    const options = { src, width, height: width, fit: 'cover' as const };
    const [avif, webp] = await Promise.all([
        getImage({ ...options, format: 'avif', quality: 60 }),
        getImage({ ...options, format: 'webp', quality: 80 }),
    ]);
    return { avif: avif.src, webp: webp.src };
}
