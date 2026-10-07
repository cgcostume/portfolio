import GLightbox from 'glightbox';

const API = 'https://api.flickr.com/services/rest/';

const lightbox = GLightbox({ touchNavigation: true, loop: true, autoplayVideos: true });
const cache = new Map<string, object[]>();

interface Photo { server: string; id: string; secret: string; title: string; }

const photoUrl = (photo: Photo) =>
    `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;

async function fetchPhotoset(apiKey: string, photosetId: string) {
    const params = new URLSearchParams({
        method: 'flickr.photosets.getPhotos',
        api_key: apiKey,
        photoset_id: photosetId,
        format: 'json',
        nojsoncallback: '1',
    });
    const response = await fetch(`${API}?${params}`);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const data = await response.json();
    return (data.photoset?.photo ?? []).map((photo: Photo) => ({
        href: photoUrl(photo),
        type: 'image',
        descPosition: 'bottom',
        description: photo.title,
        alt: photo.title,
    }));
}

async function open(badge: HTMLElement, apiKey: string, photosetId: string) {
    if (!cache.has(photosetId)) {
        badge.textContent = 'fetching';
        badge.classList.add('animate');
        try {
            cache.set(photosetId, await fetchPhotoset(apiKey, photosetId));
        } catch (error) {
            // fall back to the album on flickr itself
            console.error('flickr.photosets.getPhotos failed:', error);
            window.location.href = (badge.closest('a') as HTMLAnchorElement).href;
            return;
        } finally {
            badge.classList.remove('animate');
            badge.textContent = 'Flickr';
        }
    }
    lightbox.setElements(cache.get(photosetId)!);
    lightbox.open();
}

export function initializeFlickr(selector: string, apiKey: string) {
    for (const link of document.querySelectorAll<HTMLAnchorElement>(selector)) {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            open(link.querySelector('.badge') ?? link, apiKey, link.dataset.photosetId!);
        });
    }
}
