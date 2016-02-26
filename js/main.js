(function ($) {
  'use strict';

  var navbarHeight = $('.navbar').height();

  $('body').scrollspy({
    target: '#navbar',
    offset: navbarHeight + 10
  });

  $('#navbar').on('activate.bs.scrollspy', function (event) {
    var label = $(event.target).text();

    if (typeof ga === 'function') {
      ga('send', 'event', 'ScrollSpy', 'activate', label);
    }
  });

  $('.navbar-fixed-top').autoHidingNavbar();

  $('[data-trigger="scroll"]').click(function (event) {
    event.preventDefault();

    $('#navbar').collapse('hide');

    var target = this.hash || 'body';

    $(window).stop(true).scrollTo(target, {
      duration: 1000,
      offset: -navbarHeight
    });
  });

  var source = $('#reviews-template').html();
  var template = Handlebars.compile(source);
  var context = {
    reviews: [
      {
        reviewer: 'Ami Barbu',
        avatar: 'https://scontent.xx.fbcdn.net/hprofile-xpf1/v/t1.0-1/p100x100/11070013_10204804645490594_1105531698772016969_n.jpg?oh=affce68257de24687e7f537e64d8a6ee&oe=570C555E',
        text: 'In 2015 am avut nevoie sa vand o masina. Programul meu incarcat cu serviciu si doi copii mici nu imi permite nici macar sa raspund la toate apelurile celor interesati de cumpararea masinii scoase de mine la vanzare, despre timp pentru intalniri, vizionari si teste cu potentialii cumparatori ce sa mai spun? Mi-a fost recomandat calduros sa lucrez cu Car Concierge si la finalul colaborarii nu pot sa spun decat ca am reusit sa vand masina la un pret mai bun decat speram si habar nu am avut cum s-a intamplat asta! Gabriel a fost ca un inger pazitor care s-a ocupat de absolut tot, comunicand cu mine fiecare etapa si asigurandu-se constant ca actioneaza conform cu ceea ce imi doresc eu. Il recomand mai mult decat calduros si pe aceasta cale il asigur ca voi reapela cu incredere si relaxare la serviciile lui cu prima ocazie cand voi mai avea nevoie. Eu am fost un sofer inteligent si nu am pierdut timp deloc! ;) Tu de ce nu ai fi la fel?',
        rating: 5
      },
      {
        reviewer: 'Mihai Petcu',
        avatar: 'https://scontent.xx.fbcdn.net/hprofile-xpt1/v/t1.0-1/p100x100/10245519_1317171761632513_4434215803633833387_n.jpg?oh=29aa1cf1dcf0dbff1fff87870a9aae56&oe=573BAE64',
        text: 'Inainte de toate Gabi este un prieten, am ajuns sa fim prieteni de-a lungul anilor, iar faptul ca noi inca colaboram cu toate ca amandoi ne-am schimbat domeniile de activitate in ultimii ani spune multe. Nu voi enumera aici serviciile de care am beneficiat din partea Car Concierge, pentru compania noastra, pentru ca nici eu nu le mai stiu pe toate insa retin aspectul cel mai important si acela ca in momentul in care am apelat la ei pentru oricare din serviciile oferite mi-am si luat gandul de la problema respectiva. Comfortul de care beneficiezi colaborand cu Car Concierge merita cu siguranta pretul cerut pentru serviciile oferite. Ar fi multe de spus insa ma rezum la a mentiona faptul ca voi colabora cu Gabi indiferent de numele companiei si il voi recomanda deasemenea.',
        rating: 5
      },
      {
        reviewer: 'Servet Giafer',
        avatar: 'https://scontent.xx.fbcdn.net/hprofile-xaf1/v/t1.0-1/c44.44.550.550/s100x100/430303_493612170667818_1672251789_n.jpg?oh=dbaa522929cc80d68a94cb985a082562&oe=5709C862',
        text: 'L-am cunoscut pe Gabi prin intermediul unei prietene. Eram in cautarea unei masini noi insa nu ma puteam hotari asupra modelului si motorizarii. Ne-am intalnit, i-am spus cam ce vreau de la o masina si in ce buget sa se incadreze, el mi-a prezentat cateva modele (aducandu-mi o serie de argumente pro si contra asupra fiecaruia), iar in urma test-drive-urilor m-am hotarat asupra unui model. Tot el s-a ocupat atat de negocierea cu dealer-ul (obtinand un pret mai bun ca cel obtinut de mine), cat si de toate actele necesare firmei de leasing scutindu-ma de multe drumuri si mult timp pierdut. Si toate acestea la un pret mai mult decat decent. Este un profesionist in adevaratul sens al cuvantului si il recomand cu incredere. Multumesc mult pentru ajutor, Gabi!',
        rating: 5
      },
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

  $('.review').dotdotdot({
    after: '<a href="https://www.facebook.com/carconcierge.ro/reviews/" target="_blank">Vezi mai mult &rsaquo;</a>',
    ellipsis: '… ',
    watch: true
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
    adaptiveHeight: true,
    arrows: false,
    asNavFor: '#services-nav',
    fade: true
  });

  $('#services').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var $slide = $('.slick-slide', this).eq(nextSlide);
    var label = $('.shortname', $slide).text();

    if (typeof ga === 'function') {
      ga('send', 'event', 'Services', 'change', label);
    }
  });
})(jQuery);
