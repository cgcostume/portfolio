
import $ from 'jquery';
import peity from 'peity';
import clipboard from 'clipboard';

import flickr from './flickr.mjs';


// window.addEventListener('DOMContentLoaded', (event) => {
$(function () {

  flickr('.flickr');
  $('.bars').peity('bar', {
    fill: function (value) {
      return value > 4 ? '#adb5bd' : '#343a40'
    },
    max: 4.0,
    min: 0.0,
    padding: 0.2,
  });

  new clipboard('.btn-clipboard');


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

