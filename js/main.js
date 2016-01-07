(function ($) {
  'use strict';

  var navbarHeight = $('.navbar').height();

  $('body').scrollspy({
    target: '#navbar',
    offset: navbarHeight + 10
  });

  $('[data-toggle="scroll"]').click(function (event) {
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
        reviewer: 'Claudia Ifrim',
        avatar: 'https://scontent.xx.fbcdn.net/hprofile-xfp1/v/l/t1.0-1/c167.31.386.386/s100x100/44202_1411148200733_735995_n.jpg?oh=ad19b2f805afbf63840d243868f5f190&oe=5744B2AE',
        text: 'In vara anului trecut am achizitionat o noua masina. Am zis bugetul disponibil si ce as vrea de la masina pe care o caut si Gabi mi-a prezentat 3 oferte, a negociat pretul pentru oferta aleasa, a tinut legatura cu firma de leasing si s-a ocupat de toate formalitatile necesare. Pentru mine a ramas doar un test drive si preluarea masinii livrate.',
        rating: 5
      }
    ]
  };
  var html = template(context);

  $('#reviews-template').after(html);

  $('#reviews').slick({
    autoplay: true,
    nextArrow: '<button type="button" class="slick-next"><span class="glyphicon glyphicon-chevron-right"></span></button>',
    prevArrow: '<button type="button" class="slick-prev"><span class="glyphicon glyphicon-chevron-left"></span></button>'
  });

  $('#services').slick({
    appendArrows: $('.services-controls'),
    fade: true,
    nextArrow: '<button type="button" class="slick-next"><span class="glyphicon glyphicon-chevron-right"></span></button>',
    prevArrow: '<button type="button" class="slick-prev"><span class="glyphicon glyphicon-chevron-left"></span></button>'
  });

  $('[data-toggle="slick"]').click(function () {
    var $this = $(this);
    var target = $this.data('target');
    var slide = $this.data('slide');

    $(target).slick('slickGoTo', slide);
  });
})(jQuery);
