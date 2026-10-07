import { initializeFlickr } from './flickr';

initializeFlickr('.flickr', document.body.dataset.flickrKey ?? '');

for (const button of document.querySelectorAll<HTMLButtonElement>('.btn-clipboard')) {
    button.addEventListener('click', async () => {
        const target = document.querySelector(button.dataset.clipboardTarget!);
        await navigator.clipboard.writeText(target?.textContent ?? '');
    });
}

const toggle = document.querySelector<HTMLInputElement>('#picture-input-toggle');
if (toggle) {
    const input = document.querySelector<HTMLImageElement>('#picture-input')!;
    const copyright = document.querySelector<HTMLElement>('#picture-copyright');
    const label = document.querySelector<HTMLLabelElement>('label[for="picture-input-toggle"]')!;

    const update = () => {
        input.hidden = !toggle.checked;
        if (copyright) copyright.style.visibility = toggle.checked ? 'visible' : 'hidden';
        label.textContent = toggle.checked ? 'Show generated Drawing' : 'Show original Photo';
    };
    update();
    toggle.addEventListener('change', update);
}
