"use strict";

var scroll = new SmoothScroll('a[href*="#"]', {
  // Selectors
  ignore: 'no-scroll',
  // Selector for links to ignore (must be a valid CSS selector)
  header: null,
  // Selector for fixed headers (must be a valid CSS selector)
  // Speed & Easing
  speed: 666,
  // Integer. How fast to complete the scroll in milliseconds
  offset: 0,
  // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
  easing: 'easeInOutQuint',
  // Easing pattern to use
  //customEasing: function (time) {}, // Function. Custom easing pattern
  // Callback API
  before: function before() {},
  // Callback to run before scroll
  after: function after() {} // Callback to run after scroll

});

(function () {
  var otherText = $('#input_1_13_other');
  $(document).ready(function () {
    $('.scroll-top').hide();
    $(window).scroll(function showScrollButton() {
      if (100 < $(this).scrollTop()) {
        // if the window's position is greater than 100 pixels away from the top
        // of the page, fade the scroll button in
        $('.scroll-top').fadeIn();
      } else {
        // if not, fade the button so it's out of the way
        $('.scroll-top').fadeOut();
      }
    });
    $('.ginput_card_security_code_icon').remove();
    otherText.inputmask({
      alias: 'currency',
      allowMinus: false,
      clearMaskOnLostFocus: false,
      digits: 2,
      prefix: '$'
    }).attr('pattern', '[0-9]*');
  }); // This function pushes the footer down
  // on pages that have short content

  $(window).on('load resize', function stickyFooter() {
    // sticky footer stuff
    var windowHeight = $(window).height(),
        adminbarHeight = $('#wpadminbar').height(),
        contentHeight = $('.wrapper').outerHeight(),
        footerHeight = $('footer').outerHeight();

    if (contentHeight + footerHeight < windowHeight) {
      if ($('#wpadminbar').length) {
        $('.wrapper').css('margin-bottom', windowHeight - (contentHeight + footerHeight + adminbarHeight));
      } else {
        $('.wrapper').css('margin-bottom', windowHeight - (contentHeight + footerHeight));
      }
    }
  });
  otherText.on('change', function () {
    $('#input_1_43').text(otherText.val());
    $('#ginput_base_price_1_43').val(otherText.val());
  });
})(jQuery);