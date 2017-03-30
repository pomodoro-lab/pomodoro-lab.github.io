$(function() {
  $('.circle-bg-img').addClass('animate');
  $('.carousel-indicators').on('click', 'li', function() {
    gotoPage($($(this).attr('data-target')));
  });
  new Hammer($('.navbar-toggle')[0]).on('tap', function() {
    $('.navbar-toggle, .nav').toggleClass('collapse-in');
  })

  var scrolled = false;
  var timeout = null;
  function markScroll() {
    scrolled = true;
    setTimeout(function() {
      scrolled = false;
    }, 1000);
  };

  function rotateCircleImg(deg) {
    $('.circle-bg-img img:nth-child(2)').css('transform', 'rotate(' + deg + 'deg)');
  };

  function gotoPage(page) {
    if (page.length > 0) {
      clearTimeout(timeout);
      $('.page.active, .phone-img.active').removeClass('active');
      page.addClass('active');
      $('#' + page.attr('id') + '_img').addClass('active');
      var deg = 90 * $('.page').index($('.page.active')) / $('.page').length;
      timeout = setTimeout(function() {
        rotateCircleImg(deg);
      }, 10);
      var indicators = $('.carousel-indicators');
      indicators.children('.active').removeClass('active');
      indicators.children("[data-target='#" + page.attr('id') + "']").addClass('active');
    }
  };

  function gotoNextPage() {
    var page = $('.page.active').next('.page');
    if (page.length == 0) { page = $('.page:first-child') }
    gotoPage(page);
  }

  function gotoPrevPage() {
    var page = $('.page.active').prev('.page');
    if (page.length == 0) { page = $('.page:last-child') }
    gotoPage(page);
  }

  if ($.os.phone) {
    var hammertime = new Hammer.Manager(document, {
      touchAction: 'auto',
      inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
      recognizers: [
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_HORIZONTAL
        }]
      ]
    });
    hammertime.on('swipeleft', function() {
      gotoNextPage();
    });
    hammertime.on('swiperight', function() {
      gotoPrevPage();
    });
  } else {
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
          gotoNextPage();
        } else if(e.wheelDeltaY > 0 && onWindowTop()) {
          markScroll();
          gotoPrevPage();
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

  }
});