
const clipboard = require('clipboard');

// window.addEventListener('DOMContentLoaded', (event) => {
$(function () {

  console.log("moep");

  new clipboard('.btn-clipboard');

  // $('.flickr').on('click', function(event)
  // {
  //   event.preventDefault();
  //   flickr_photosets($(this).attr("id"));
  // });

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
