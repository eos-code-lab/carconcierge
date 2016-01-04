(function ($) {
  'use strict';

  var navbarHeight = $('.navbar').height();

  $('body').scrollspy({
    target: '#navbar',
    offset: navbarHeight + 10
  });

  $('a[href^="#"]').click(function (event) {
    event.preventDefault();

    $('#navbar').collapse('hide');

    var target = this.hash || 'body';

    $(window).stop(true).scrollTo(target, {
      duration: 1000,
      interrupt: true,
      offset: -navbarHeight
    });
  });

  var source = $('#reviews-template').html();
  var template = Handlebars.compile(source);
  var context = {
    reviews: [
      {
        reviewer: 'Andrei Popescu',
        avatar: 'assets/app/img/avatar.png',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, officia!',
        rating: 4
      },
      {
        reviewer: 'Ion Popescu',
        avatar: 'assets/app/img/avatar.png',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, nisi.',
        rating: 3
      }
    ]
  };
  var html = template(context);

  $('#reviews-template').after(html);

  $('.reviews').slick({
    autoplay: true,
    nextArrow: '<button type="button" class="slick-next"><span class="glyphicon glyphicon-chevron-right"></span></button>',
    prevArrow: '<button type="button" class="slick-prev"><span class="glyphicon glyphicon-chevron-left"></span></button>'
  });
})(jQuery);
