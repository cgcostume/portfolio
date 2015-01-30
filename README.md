
Portfolio optimized for simple, file-based content management (**Datafolio**).
The complete site's content is based on a json/xml file per section (e.g., ```contact.json```, ```projects.json```, ```publications.json```, ```talks.json```, and ```teaching.json```) and the pages ```_config.yml``` information. 
It uses [Jekyll](http://jekyllrb.com/), [Bootstrap](http://getbootstrap.com/), [Bootswatch](http://bootswatch.com/) themes, [spin.js](http://fgnass.github.io/spin.js/), [blueimp-gallery](https://github.com/blueimp/Bootstrap-Image-Gallery), and accesses the [flickr API](https://www.flickr.com/services/api/).

#### Features

* fully responsive, one-page design with scroll navigation
* provides sections for publications, projects, talks/keynotes, teaching, and contact
* sections' content is loaded from json data-files (_data)
* uses unique, distinguishable layouts for each section
* enables easy BibTeX provisioning (show, select and copy, as well as download .bib)
* php free contact form using [Formspree](http://formspree.io/)
* supports dynamic integration of Flickr photosets (with simple caching)
* optimized for [gh-pages](https://pages.github.com/) deployment (uses no unsupported plugins)
* favors pretty html output over jekyll code formatting 
* simple source code and structure that can be modified or extended easily
* supports vimeo and youtube video playback
* yields valid html5

#### Notes

##### Win10 Setup Log:

* https://help.github.com/articles/using-jekyll-with-pages/
* http://jekyll-windows.juthilo.com/1-ruby-and-devkit/
* got yajl error ...
  * installed python27 trying to fix yajl error
  * setting "highlighter: false" in _config.yml helped for yajl error for now (http://stackoverflow.com/questions/16498287/jekyll-liquid-exception-cannot-load-such-file-yajl-2-0-yajl)
* set up some CNAME for my domain as shown here: https://help.github.com/articles/adding-a-cname-file-to-your-repository/
