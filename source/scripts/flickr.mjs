
import $ from 'jquery';
import GLightbox from 'glightbox';

const API = 'https://api.flickr.com/services/rest/';
const API_KEY = data.config.flickr_api_key;

const lightbox = GLightbox({
  touchNavigation: true,
  loop: true,
  autoplayVideos: true
})
let ELEMENTS_CACHE = [];

export default function initialize(elementClass) {

  $(elementClass).on('click', function (event) {
    event = event || window.event;
    event.preventDefault();

    const badge = event.target || event.srcElement;
    const link = badge.parentNode;

    photoset($(badge), link.dataset.photosetId);
  });

};


function createFlickrPhotoUrl(photo) {
  return "https://farm" + photo.farm
    + ".staticflickr.com/" + photo.server + "/"
    + photo.id + "_" + photo.secret + "_b.jpg";
}

function photoset(badge, photosetId) {

  console.log(badge, photosetId);

  if (photosetId in ELEMENTS_CACHE) {
    lightbox.setElements(ELEMENTS_CACHE[photosetId]);
    lightbox.open();
    return;
  }

  badge.text('fetching');
  badge.addClass('animate');

  $.getJSON(API,
    {
      method: 'flickr.photosets.getPhotos',
      api_key: API_KEY,
      photoset_id: photosetId,
      format: 'json',
      nojsoncallback: 1
    })

    .done(function (data) {
      if (!data.photoset)
        return;

      var elements = [];

      $.each(data.photoset.photo, function (i, photo) {
        elements.push({
          href: createFlickrPhotoUrl(photo),
          type: 'image',
          descPosition: 'bottom',
          // zoomable: true,
          // draggable: true,
          description: photo.title,
          alt: photo.title
        });
      });

      ELEMENTS_CACHE[photosetId] = elements;
      lightbox.setElements(ELEMENTS_CACHE[photosetId]);
      lightbox.open();
    })
    .fail(function (data, textStatus, error) {
      alert(`flickr.photosets.getPhotos as json failed, status: ${textStatus}, error: ${error}`);
    })
    .always(function () {
      badge.removeClass('animate');
      badge.text('Flickr');
    });
};
