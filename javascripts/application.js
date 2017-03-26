$(function() {
  $('.circle-bg-img').addClass('animate');
  $('.carousel-indicators').on('click', 'li', function() {
    gotoPage($($(this).attr('data-target')));
  });

  var scrolled = false;
  var timeout = null;
  function markScroll() {
    scrolled = true;
    setTimeout(function() {
      scrolled = false;
    }, 1000);
  };

  function resetCircleImg() {
    var bgImg = $('.circle-bg-img');
    bgImg.removeClass('animate');
  };

  function animateCircleImg() {
    var bgImg = $('.circle-bg-img');
    bgImg.addClass('animate');
  };

  function gotoPage(page) {
    if (page.length > 0) {
      clearTimeout(timeout);
      $('.page.active, .phone-img.active').removeClass('active');
      resetCircleImg();
      page.addClass('active');
      $('#' + page.attr('id') + '_img').addClass('active');
      timeout = setTimeout(animateCircleImg, 10);
      var indicators = $('.carousel-indicators');
      indicators.children('.active').removeClass('active');
      indicators.children("[data-target='#" + page.attr('id') + "']").addClass('active');
    }
  };

  function onWindowBottom() {
    return ($(window).scrollTop() + $(window).height()) === $(document).height();
  }

  function onWindowTop() {
    return $(window).scrollTop() === 0; 
  }

  $(window).on('mousewheel', function(e) {
    if (!scrolled) {
      if(e.wheelDeltaY < 0 && onWindowBottom()) {
        markScroll();
        gotoPage($('.page.active').next('.page'));
      } else if(e.wheelDeltaY > 0 && onWindowTop()) {
        markScroll();
        gotoPage($('.page.active').prev('.page'));
      }
    }
  });

  $(document).on('keydown', function(e) {
    // UP
    if (e.which == 38) {
      $('.carousel-indicators li.active').prev().click();
    }
    // DOWN
    if (e.which == 40) {
      $('.carousel-indicators li.active').next().click(); 
    }
  });
});