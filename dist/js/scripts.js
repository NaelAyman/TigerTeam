(function() {

  // Start Current Date

  var currentDate = new Date();
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  $('.date').append(currentDate.toLocaleDateString('ar-EG', options));

  // Start Loader

  $(window).on('load', function () {
    $("body").css("overflow-y", "auto");
    $(".loader").fadeOut();
    $(".loading").fadeOut().css({
        'transituin-delay' : '1s'
    });
  });

  // Start Navbar 

  $('.overlay').fadeOut();
  
  $(".mob-collaps").on('click', function() {
    $(this).parent().find(".nav-links > ul").toggleClass('nav-open');

    $('.overlay').fadeToggle();

    $(this).find("span:first-child").toggleClass('rotate');
    $(this).find("span:nth-child(2)").toggleClass('none');
    $(this).find("span:nth-child(3)").toggleClass('rotate2');
  });

  $(".overlay").on('click', function() {
    $(".nav-links ul").removeClass('nav-open');
    $('.search-form').fadeOut();
    $(this).fadeOut();

    $(".mob-collaps span:first-child").removeClass('rotate');
    $(".mob-collaps span:nth-child(2)").removeClass('none');
    $(".mob-collaps span:nth-child(3)").removeClass('rotate2');
  });

  // Start Prevent Default

  $('.default').on('click', function(e) {
    e.preventDefault();
  });

  // Start Fixed Nav

  $(window).on('scroll',function() {
    var scroll = $(this).scrollTop();
    
    if(scroll >= 44) {
      $('.nav-menu').addClass('affix');
    } else {
      $('.nav-menu').removeClass('affix');
    }
  });

  // Start Search Form

  $('.search-form').fadeOut();

  $('.search').on('click', function(e) {
    e.preventDefault();
    $('.overlay').fadeIn();
    $('.search-form').fadeIn();
  });

  // Start Nice Select

  $('select').niceSelect();

})(jQuery);
//# sourceMappingURL=scripts.js.map
