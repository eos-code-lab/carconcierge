(function ($) {
  'use strict';

  var navbarHeight = $('.navbar').height();

  $('body').scrollspy({
    target: '#navbar',
    offset: navbarHeight + 10
  });

  $('#navbar').on('activate.bs.scrollspy', function (event) {
    var $element = $(event.target);
    var label = $element.text();

    window.history.replaceState({}, '', $('> a', $element).attr('href'));

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
    errorClass: 'help-block',
    errorElement: 'span',
    errorPlacement: function (error, element) {
      if (element.parent('.input-group').length) {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function (element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.form-group').removeClass('has-error');
    }
  });

  $('#contact-form').validate({
    ignore: [],
    messages: {
      recaptcha: {
        required: 'Validarea reCAPTCHA a eșuat.'
      }
    },
    rules: {
      recaptcha: {
        required: function() {
          return grecaptcha.getResponse() === '';
        }
      }
    },
    submitHandler: function () {
      if (typeof ga === 'function') {
        ga('send', 'event', 'Contact', 'submit', 'Trimiteți-ne un mesaj');
      }

      if (typeof goog_report_conversion === 'function') {
        goog_report_conversion();
      }

      // form.submit();
      $('#contact-form').submit(function (e) {
        e.preventDefault();

        var contactForm = $(this);

        // show feedback for the user on submit
        $('button[type="submit"]', contactForm).each(function () {
          var btn = $(this);
          btn.prop('type','button');
          btn.prop('orig_label',btn.text());
          btn.text('In curs de livrare ...');
        });

        // verify information and send message on email
        $.ajax({
          type: 'post',
          url: 'contact.php',
          data: contactForm.serialize(),
          success: afterFormSubmitted,
          dataType: 'json'
        });
      });
    }
  });
})(jQuery);

function removeFeedback() {
  var form = $('form#contact-form');

  //reverse the feedback from the button
  $('button[type="button"]', form).each(function() {
    var btn = $(this);
    var label = btn.prop('orig_label');
    if (label) {
      btn.prop('type','submit');
      btn.text(label);
      btn.prop('orig_label','');
    }
  });
}

function clenup() {
  $('#success_message').hide();
  $('#error_message').hide();
  removeFeedback();
  $('form#contact-form').trigger('reset');
  $('form#contact-form').show();
}

function afterFormSubmitted(data) {
  // cleanup old messages
  $('#success_message ul').remove();
  $('#error_message ul').remove();

  if (data.result == 'success') {
    $('form#contact-form').hide();
    $('#success_message').show();
    $('#error_message').hide();
    setTimeout(function () {
      clenup();
    },3000);
  } else {
    $('#error_message').append('<ul></ul>');
    $('#error_message ul').append('<li>Completati campurile obligatorii si completati reCAPTCHA.</li>');
    $('#success_message').hide();
    $('#error_message').show();

    removeFeedback();
  }
}
