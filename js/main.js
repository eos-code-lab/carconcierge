(function ($) {
  'use strict';

  var navbarHeight = $('.navbar').height();

  $('body').scrollspy({
    target: '#navbar',
    offset: navbarHeight + 10
  });

  $('[data-trigger="scroll"]').click(function (event) {
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
        reviewer: 'Delia Meronic',
        avatar: 'https://scontent.xx.fbcdn.net/hprofile-xtp1/v/t1.0-1/c0.8.100.100/p100x100/12301565_10205233894075925_8656676215106924491_n.jpg?oh=0a1349815cc9d3b5153772a328e1ebb1&oe=5700613A',
        text: 'In luna decembrie  a anului trecut am fost nevoita sa rezolv partea de acte necesare inmatricularii unei masini. Prin intermediul unui prieten care deja colaborase cu Gabi, am apelat la serviciile acestuia si spre bucuria mea, a preluat bataia de cap si s-a ocupat de tot ceea ce inseamna drumuri la administratii finaciare, RAR, politie, etc. Plata serviciilor a fost mai mult decat civilizata iar faptul ca m-a scutit de toata alergatura si contactul cu sectorul public, priceless.....mai ales ca a fost o vreme de sa nu scoti nici cainele din casa. Gabi, multumesc!!',
        rating: 5
      },{
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

  $('#services-nav').slick({
    asNavFor: '#services',
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true,
    nextArrow: '<button type="button" class="slick-next"><span class="glyphicon glyphicon-chevron-right"></span></button>',
    prevArrow: '<button type="button" class="slick-prev"><span class="glyphicon glyphicon-chevron-left"></span></button>',
    slidesToShow: 3
  });

  $('#services').slick({
    arrows: false,
    asNavFor: '#services-nav',
    fade: true
  });
})(jQuery);
