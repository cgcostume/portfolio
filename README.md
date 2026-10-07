# Daniel's Portfolio

This portfolio is optimized for researchers and those who strive for a minimal, file-based content management.
The site's content is based on a YAML file per section (`header.yml`, `contact.yml`, `publications.yml`, `repositories.yml`, and `teaching-activities.yml`) and a BibTeX file per publication.

[![Deploy website](https://github.com/cgcostume/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/cgcostume/portfolio/actions/workflows/deploy.yml)

## Examples

* [Daniel Limberger](https://www.daniellimberger.de) (my personal website)
* Earlier versions of this theme were used by [Carolin Fiedler](http://www.carolinfiedler.de), [Willy Scheibel](http://www.willyscheibel.de), [Amir Semmo](http://www.amirsemmo.de), [Maximilian Söchting](http://msoechting.de), and [Tim Cech](http://www.timcech.de)


## Features

* static, responsive site using [Astro](https://astro.build/) and [Bootstrap 5](http://getbootstrap.com/)
* sections for publications, repositories, and teaching activities, each with a selected (index) and a complete page
* section contents loaded from YAML data files (`src/data/`)
* easy BibTeX provisioning (show, copy to clipboard, or download)
* teaching evaluation summary as static SVG bar charts
* dynamic integration of [Flickr photo sets](https://www.flickr.com/services/api/) via [GLightbox](https://biati-digital.github.io/glightbox/)
* AVIF/WebP thumbnails generated at build time
* unused CSS removed at build time via PurgeCSS
* deployment to [GitHub Pages](https://pages.github.com/) via GitHub Actions


## Development

This website uses [Astro](https://astro.build/), [Bootstrap 5](http://getbootstrap.com/), [GLightbox](https://biati-digital.github.io/glightbox/), and can access the [Flickr API](https://www.flickr.com/services/api/).

Content lives in `src/data/` (YAML and BibTeX), source images in `src/assets/images/` (AVIF/WebP variants are generated at build time), and static files in `public/`. PDFs of the theses are kept in `resources/` and published as assets of the [theses release](https://github.com/cgcostume/portfolio/releases/tag/theses).

### Prerequisites
- [Node.js](https://nodejs.org/en) and [pnpm](https://pnpm.io/) are required for development and testing.
- PDFs are stored with [Git LFS](https://git-lfs.com/).

### Development Commands
- `pnpm install` installs all necessary dependencies.
- `pnpm dev` launches a local server for development and testing.
- `pnpm build` creates the static site in `dist/`, `pnpm preview` serves it.

### Deployment
- Commits to `main` trigger GitHub Actions, which build the site and push it to the `deploy` branch it is served from.
