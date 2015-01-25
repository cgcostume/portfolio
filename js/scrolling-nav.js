// collapse the navbar on scroll
$(window).scroll(function() 
{
  if ($(".navbar").offset().top > 64)
    $(".navbar-fixed-top").addClass("top-nav-collapse");
  else
    $(".navbar-fixed-top").removeClass("top-nav-collapse"); 
});

// page scrolling feature (requires easing plugin)
$(function() 
{
  $('a.page-scroll').bind('click', function(event) 
  { 
    var $anchor = $(this);
    $('html, body').stop().animate(
      { scrollTop: $($anchor.attr('href')).offset().top - 45 }, 1000, 'easeInOutExpo');

    event.preventDefault();
  });
});
