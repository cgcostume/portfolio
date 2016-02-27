
Portfolio optimized for researchers and those who strive for a minimal, file-based "content management" (**Datafolio**).
The complete site's content is based on a json/xml file per section (e.g., ```contact.json```, ```projects.json```, ```publications.json```, ```talks.json```, and ```teaching.json```) as well as the pages ```_config.yml``` information. 

#### Examples

* [Daniel Limberger](http://www.daniellimberger.de)

#### Features

* responsive single-page using bootstrap 4
* multi-language support
* sections for publications, projects, talks/keynotes, teaching, contact, and more
* section contents loaded from json data-files (_data)
* unique, distinguishable layouts per section
* easy BibTeX provisioning (show, select, and copy to clipboard, as well as download .bib)
* php free contact form using [Formspree](http://formspree.io/)
* dynamic integration of Flickr photo sets (with basic caching)
* optimized for [gh-pages](https://pages.github.com/) deployment (uses no unsupported plugins)
* minimizes html and css (currently using compress layout method)
* takes advantage of jsdelivr
* valid html5

#### Dependencies

Datafolio uses [Jekyll](http://jekyllrb.com/), [Bootstrap](http://getbootstrap.com/), [Bootswatch](http://bootswatch.com/) themes, [spin.js](http://fgnass.github.io/spin.js/), [blueimp-gallery](https://github.com/blueimp/Bootstrap-Image-Gallery), and accesses the [flickr API](https://www.flickr.com/services/api/).

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
