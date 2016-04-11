var check_capcha = function(response) {
  alert(response);
};

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

  $('[data-trigger="scroll"]').click(function (event) {
    if (this.pathname !== window.location.pathname) {
      return;
    }

    event.preventDefault();

    $('#navbar').collapse('hide');

    var target = this.hash || 'body';

    $(window).stop(true).scrollTo(target, {
      duration: 1000,
      offset: -navbarHeight
    });
  });

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
    arrows: false,
    asNavFor: '#services-nav',
    autoplay: true,
    fade: true
  });

  $('#services').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var $slide = $('.slick-slide', this).eq(nextSlide);
    var label = $('.shortname', $slide).text();

    if (typeof ga === 'function') {
      ga('send', 'event', 'Services', 'change', label);
    }
  });

  $.validator.setDefaults({
    highlight: function (element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
      if (element.parent('.input-group').length) {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    }
  });

  $('#contact-form').validate({
    submitHandler: function (form) {
      // var response = grecaptcha.getResponse();

      // console.dir(response);
      // return false;
      form.submit();
    }
  });
})(jQuery);
