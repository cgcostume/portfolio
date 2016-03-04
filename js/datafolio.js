---
layout: compress
---

var flickr_api = "https://api.flickr.com/services/rest/";
var flickr_api_key = "{{ site.flickr_api_key }}";

function flickr_photo_url(photo)
{
  return "https://farm" + photo.farm 
    + ".staticflickr.com/" + photo.server + "/" 
    + photo.id + "_" + photo.secret + "_b.jpg";
}

var gallery_cache = [];

function blueimp_gallery(photoset_id)
{
  blueimp.Gallery(gallery_cache[photoset_id]
    , { useBootstrapModal : false, event : event, container: '#blueimp-gallery' });  
}

function blueimp_video(photoset_id)
{
  blueimp.Gallery(gallery_cache[photoset_id]
    , { useBootstrapModal : false, event : event, container: '#blueimp-gallery' });  
}

function flickr_photosets(photoset_id) 
{
  if(photoset_id in gallery_cache)
  {
    blueimp_gallery(photoset_id);
    return;
  }

  var spinner = $('#' + photoset_id + ' .label');
  var spinner_text = spinner.text();
  spinner.text("fetching");
  spinner.addClass("animate");

  $.getJSON(flickr_api, 
    {
      method : "flickr.photosets.getPhotos",
      api_key : flickr_api_key, 
      photoset_id : photoset_id,
      format : "json",
      nojsoncallback : 1
    })

  .done(function(data) 
  {
    if(!data.photoset)
        return;

    var gallery = [];

    $.each(data.photoset.photo, function(i, photo) {
      gallery.push( { href  : flickr_photo_url(photo), title : photo.title } ) });

    gallery_cache[photoset_id] = gallery;
    blueimp_gallery(photoset_id);
  })
  .fail( function(data, textStatus, error) 
  {
    alert("flickr.photosets.getPhotos as json failed, status: " + textStatus + ", error: " + error);
  })
  .always( function() 
  { 
    spinner.removeClass("animate");
    spinner.text(spinner_text);
  });
}

$(document).ready(function() 
{ 
  new Clipboard('.btn-clipboard');

  $('.flickr').on('click', function(event) 
  { 
    event.preventDefault();
    flickr_photosets($(this).attr("id")); 
  });

  var scroll = getURLParameter("scroll");
  if(scroll)
  {
    var url = window.location.href;
    url = url.replace(/scroll=\d*&?/, '');
    url = url.replace(/&$/, '');
    url = url.replace(/\/\?$/, '/');

    window.history.pushState("string", "Title", url);

    $(window).scrollTop(scroll);
  }

});

function scrollAwareHRef(object, href)
{
  object.attr('href', href + "?scroll=" + $(window).scrollTop());
}

function getURLParameter(sParam)
{
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');

  for (var i = 0; i < sURLVariables.length; i++)
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam)
      return sParameterName[1];
  }
  return null;
}

$("#contact-form").validate({

  lang : '{{ page.lang }}',

  rules : {
    name     : 'required',
    _replyto : { required : true, email : true },
    message  : { required : true, maxlength : 1024 } }, 

  errorClass   : 'error form-control-static text-danger',
  errorElement : 'div',

  highlight : function(label) 
  { $(label).closest('.form-group').addClass('has-error'); },

  success : function(label) 
  { $(label).closest('.form-group').removeClass('has-error');
    $(label).remove(); },

  submitHandler : function(form) 
  { $.ajax(
    { url  : form.action,
      type : form.method,
      data : $(form).serializeJSON()
    });
  }
});
