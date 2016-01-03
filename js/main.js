(function ($) {
  'use strict';

  var $navbar = $('#navbar');
  var navbarHeight = $navbar.height();

  $('body').scrollspy({
    target: '#navbar',
    offset: navbarHeight + 10
  });

  $('a[href^="#"]').click(function (event) {
    event.preventDefault();

    $navbar.collapse('hide');

    var target = this.hash || 'body';

    $(window).stop(true).scrollTo(target, {
      duration: 1000,
      interrupt: true,
      offset: -navbarHeight
    });
  });
})(jQuery);
