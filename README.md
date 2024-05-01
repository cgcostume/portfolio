# Daniel's Portfolio Theme

This portfolio is optimized for researchers and those who strive for a minimal, file-based content management.
The complete site's content is based on a json/yaml file per section (e.g., `contact.json`, `projects.json`, `publications.json`, `talks.json`, and `teaching.json`) as well as the pages `_config.yml` information. 

[![Build Status](https://travis-ci.org/cgcostume/cgcostume.github.io.svg?branch=master)](https://travis-ci.org/cgcostume/cgcostume.github.io)

## Examples

* [Carolin Fiedler](http://www.carolinfiedler.de)
* [Daniel Limberger](http://www.daniellimberger.de) (my personal website)
* [Willy Scheibel](http://www.willyscheibel.de)
* [Amir Semmo](http://www.amirsemmo.de)
* [Maximilian Söchting](http://msoechting.de)
* [Tim Cech](http://www.timcech.de)


## Features

* responsive single-page using [Bootstrap 4](http://getbootstrap.com/)
* multi-language support
* sections for publications, projects, talks/keynotes, teaching, contact, and more
* section contents loaded from json/yaml data-files (_data)
* unique, distinguishable layouts per section
* dynamic integration of [Flickr photo sets](https://www.flickr.com/services/api/) (with basic caching)
* php and javascript free contact form using [Formspree](http://formspree.io/)
* supports deployment using [GitHub Pages](https://pages.github.com/) 
* minimizes html and css (currently using compress layout method)
* easy BibTeX provisioning (show, select, and copy to clipboard, or download)
* valid html5 output (nearly-valid css, due to some issues in bootstrap)
* responsive navigation (with scrollspy) comprising a top-page link (author or icon), section links (nav-links or dropdown-items), and a language toggle for all used languages
* support for vCard via file and QR Code
* basic [Travis CI](https://travis-ci.org/) integration


## Development

This website uses [Pug](https://pugjs.org/api/getting-started.html), [Bootstrap 5](http://getbootstrap.com/), [GLightbox](https://biati-digital.github.io/glightbox/), and can access the [Flickr API](https://www.flickr.com/services/api/).

### Prerequisites
- [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) are required for development and testing.

### Development Commands
- `npm install` installs all necessary dependencies.
- `npm start` launches a local server for development and testing.
- `npm run build:dev` and `npm run build` are used to create the static site.

### Deployment
- Commits trigger GitHub Actions, which deploy updates to the `gh-pages` branch and are served directly from there.
