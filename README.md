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

This website uses [Jekyll](http://jekyllrb.com/), [Bootstrap 4](http://getbootstrap.com/), [Blueimp Gallery](https://github.com/blueimp/Bootstrap-Image-Gallery), can access the [Flickr API](https://www.flickr.com/services/api/), and [Formspree](http://formspree.io/).

#### Setting up the Build Environment (on Windows)

For the development and testing of the website jekyll (https://jekyllrb.com/) is required. A fast and simple setup of jekyll, is possible via chocolatey (https://chocolatey.org/) either using the ```setup.bat``` script or proceed as follows (for non-Windows platforms the specific package managers, e.g., apt-get, can be used instead of Chocolatey):

* For installing chocolatey open a command prompt as administrator and run the following command:
```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```
* Now close the command prompt and open a new one (not necessarily with administrative priviliges) to install jekyll (which requires ruby) by running:
```
choco install ruby -y
gem install jekyll
```

For deployment of the website, the following optimizations (mostly minimizations) that require node, npm as well as uncss, cssmin, and svgo should be considered.

* Open a command prompt and run;
```
choco install nodejs -y
npm install
npm update
```
This should already install all required packages listed in ```package.json```.
* However, if a package was not found (e.g., svgo), try manually installing it by running:
```
npm install -g svgo
```

#### Building the Website (any platform)

* Auto rebuilding (on any change) and watching the website (stored in '_site') can be done by running (requires only jekyll)
```
jekyll serve
```
With the server running, the website should be available at http://localhost:4000.
