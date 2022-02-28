
import clipboard from 'clipboard';
import Gallery from 'blueimp-gallery';


var flickr_api = "https://api.flickr.com/services/rest/";
var flickr_api_key = data.config.flickr_api_key;

function flickr_photo_url(photo) {
  return "https://farm" + photo.farm
    + ".staticflickr.com/" + photo.server + "/"
    + photo.id + "_" + photo.secret + "_b.jpg";
}

var gallery_cache = [];

function blueimp_gallery(event, photoset_id) {
  Gallery(gallery_cache[photoset_id]
    , {
      event: event,
      container: '.blueimp-gallery',
      hidePageScrollbars: false,
    });
}
/*
function blueimp_video(photoset_id)
{
  Gallery(gallery_cache[photoset_id]
    , { useBootstrapModal : false, event : event, container: '.blueimp-gallery' });
}
*/

function flickr_photosets(event, photoset_id) {

  if (photoset_id in gallery_cache) {
    blueimp_gallery(event, photoset_id);
    return;
  }

  var spinner = $(`a[data-photoset-id='${photoset_id}'] .badge`);
  spinner.text('fetching');
  spinner.addClass('animate');

  $.getJSON(flickr_api,
    {
      method: 'flickr.photosets.getPhotos',
      api_key: flickr_api_key,
      photoset_id: photoset_id,
      format: 'json',
      nojsoncallback: 1
    })

    .done(function (data) {
      if (!data.photoset)
        return;

      var gallery = [];

      $.each(data.photoset.photo, function (i, photo) {
        gallery.push({ href: flickr_photo_url(photo), title: photo.title })
      });

      gallery_cache[photoset_id] = gallery;
      blueimp_gallery(event, photoset_id);
    })
    .fail(function (data, textStatus, error) {
      alert(`flickr.photosets.getPhotos as json failed, status: ${textStatus}, error: ${error}`);
    })
    .always(function () {
      spinner.removeClass('animate');
      spinner.text('Flickr');
    });
}


// window.addEventListener('DOMContentLoaded', (event) => {
$(function () {

  new clipboard('.btn-clipboard');

  $('.flickr').on('click', function (event) {
    event = event || window.event;
    const target = event.target || event.srcElement;
    event.preventDefault();
    flickr_photosets(event, $(this).data("photoset-id"));
  });

  if ($('#picture-input-toggle')[0]) {
    const togglePortrait = function () {
      const toggle = $('#picture-input-toggle')[0];
      $('#picture-input').attr('hidden', () => !toggle.checked);
      $('#picture-copyright').css('visibility', toggle.checked ? 'visible' : 'hidden');
      $('label[for="picture-input-toggle"]').html(toggle.checked ? 'Show generated Drawing' : 'Show original Photo');
    };
    togglePortrait();
    $('#picture-input-toggle').on('click', togglePortrait);
  }

  var scroll = getURLParameter('scroll');
  if (scroll) {
    var url = window.location.href;
    url = url.replace(/scroll=\d*&?/, '');
    url = url.replace(/&$/, '');
    url = url.replace(/\/\?$/, '/');

    window.history.pushState('string', 'Title', url);

    $(window).scrollTop(scroll);
  }

});

function scrollAwareHRef(object, href) {
  object.attr('href', href + '?scroll=' + $(window).scrollTop());
}

function getURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');

  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam)
      return sParameterName[1];
  }
  return null;
}

