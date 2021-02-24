/*
 =========================================================
 * Dy-Kraf | Motomobs - v1.0.0
 =========================================================

 * Product Page: http://www.dykraf.com/theme/motomobs
 * Copyright 2017 Creative Tim (http://www.dykraf.com)
 * Licensed under MIT (https://bitbucket.org/dykraf/restaurant/LICENSE.md) <---- CHANGE THIS FOR REAL ###################

 * Designed by www.dykraf.com Coded by dykraf.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

/*! Table of contents
 * ============================================
 *	1. Initialization
 *		1.1 Responsive Classes initialize
 *		1.2 Preloader Handler initialize
 *		1.3 Holder Thumb initialize
 *		1.4 SlickCarousel initialize
 *		1.5 BaguetteBoxes initialize
 *		1.6 WayPoints initialize
 *		1.7 Header Footer initialize
 *		1.8 Icons Samples initialize
 *		1.9 Isotopes initialize
 *	2. Functions
 *		2.1 Responsive Classes
 *		2.2 Preloader Handler
 *		2.3 Holder Thumb
 *		2.4 SlickCarousel
 *		2.5 BaguetteBoxes
 *		2.6 WayPoints
 *		2.7 Header Footer
 *		2.8 Icons Samples
 *		2.9 Isotopes
 *	3. Document on Ready
 *		3.1 On Ready initialize
 *		3.2 On Window scroll initialize
 *	4. Document on Load
 *	5. Document on Resize
 *	6. Document on Scroll
 *	7. Mobile devices agents
 *	8. DOM Variables
 *	9. On Ready Execute
 *	10. On Load Execute
 *	11. On Resize Execute
 *	12. On Scroll Execute
 * ============================================
 */
// Set jQuery
var $ = jQuery;
window.jQuery = jQuery;

var APPSCRIPT = APPSCRIPT || {};

(function ($) {
  "use strict";

  /*! === 1. Initialization === */
  APPSCRIPT.initialize = {
    init: function () {
      /*! === 1.1 Responsive Classes initialize === */
      APPSCRIPT.initialize.responsiveClasses();
      /*! === 1.2 Preloader Handler initialize === */
      APPSCRIPT.initialize.preloaderHandler();
      /*! === 1.3 Holder Thumb initialize === */
      APPSCRIPT.initialize.holderThumb();
      /*! === 1.4 SlickCarousel initialize === */
      APPSCRIPT.initialize.slickCarousel();
      /*! === 1.5 BaguetteBoxes initialize === */
      APPSCRIPT.initialize.baguetteBoxes();
      /*! === 1.6 WayPoints initialize === */
      APPSCRIPT.initialize.wayPoints();
      /*! === 1.7 Header Footer initialize === */
      APPSCRIPT.initialize.headerFooter();
      /*! === 1.8 Icons Samples initialize === */
      APPSCRIPT.initialize.iconSamples();
      /*! === 1.9 Isotopes initialize === */
      APPSCRIPT.initialize.isotopesInit();
    },
    /*! === 2. Functions === */
    /*! === 2.1 Responsive Classes === */
    responsiveClasses: function () {
      if (typeof jRespond === "undefined") {
        console.log("responsiveClasses: jQuery jRespond not Defined.");
        return true;
      }
      var jRes = jRespond([
        {
          label: "smallest",
          enter: 0,
          exit: 479,
        },
        {
          label: "handheld",
          enter: 480,
          exit: 767,
        },
        {
          label: "tablet",
          enter: 768,
          exit: 991,
        },
        {
          label: "laptop",
          enter: 992,
          exit: 1199,
        },
        {
          label: "desktop",
          enter: 1200,
          exit: 10000,
        },
      ]);
      jRes.addFunc([
        {
          breakpoint: "desktop",
          enter: function () {
            $body.addClass("device-lg");
          },
          exit: function () {
            $body.removeClass("device-lg");
          },
        },
        {
          breakpoint: "laptop",
          enter: function () {
            $body.addClass("device-md");
          },
          exit: function () {
            $body.removeClass("device-md");
          },
        },
        {
          breakpoint: "tablet",
          enter: function () {
            $body.addClass("device-sm");
          },
          exit: function () {
            $body.removeClass("device-sm");
          },
        },
        {
          breakpoint: "handheld",
          enter: function () {
            $body.addClass("device-xs");
          },
          exit: function () {
            $body.removeClass("device-xs");
          },
        },
        {
          breakpoint: "smallest",
          enter: function () {
            $body.addClass("device-xxs");
          },
          exit: function () {
            $body.removeClass("device-xxs");
          },
        },
      ]);
    },
    /*! === 2.2 Preloader Handler === */
    preloaderHandler: function () {
      // ==============================================
      // Preloader
      // ==============================================
      // Will first fade out the loading animation
      // $("#loading-animation").fadeOut();
      // Will fade out the whole DIV that covers the website.
      // console.log($("#preloader"));
      // console.log($body);
      if ($body.hasClass("preloader")) {
        // $body.css({'overflow-y':'hidden'});
        setInterval(function () {
          return $body
            .delay(800)
            .css({ "overflow-y": "auto" })
            .removeClass("preloader");
        }, 999);
        $("#preloader").delay(600).fadeOut("slow");
      }
    },
    /*! === 2.3 Holder Thumb === */
    holderThumb: function () {
      // console.log(Holder);
      Holder.addTheme("thumb", {
        bg: "#55595c",
        fg: "#eceeef",
        text: "Thumbnail",
      });
    },
    /*! === 2.4 SlickCarousel === */
    slickCarousel: function () {
      // Index testimonial carousel
      $(".testimonial").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: false,
        prevArrow:
          '<button type="button" class="btn btn-outline-dark btn-md slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow:
          '<button type="button" class="btn btn-outline-dark btn-md slick-next"><i class="fas fa-chevron-right"></button>',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerPadding: 0,
              slidesToShow: 1,
              focusOnSelect: true,
            },
          },
        ],
      });
      $(".banner-carousel, .slick-fullscreen")
        .slick({
          speed: 1300,
          autoplay: true,
          autoplaySpeed: 2600,
          fade: true,
          arrows: true,
          dots: true,
          centerPadding: "0",
          focusOnSelect: false,
          centerMode: true,
          easing: "ease-out",
          pauseOnFocus: false,
          pauseOnHover: false,
          prevArrow:
            '<button type="button" class="slick-prev"><i class="fas fa-chevron-left fa-2x"></i></button>',
          nextArrow:
            '<button type="button" class="slick-next"><i class="fas fa-chevron-right fa-2x"></i></button>',
        })
        .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
          $(".carousel-caption").each(function () {
            $(this)
              .animate(
                {
                  visibility: "hidden",
                  opacity: 0,
                  bottom: "-1rem",
                },
                100
              )
              .delay(130)
              .animate(
                {
                  visibility: "visible",
                  opacity: 1,
                  bottom: "1.5rem",
                },
                1000
              );
          });
        })
        .on("afterChange", function (event, slick, currentSlide, nextSlide) {});
      $(".custom-carousel").slick({
        infinite: true,
        speed: 1300,
        autoplay: true,
        autoplaySpeed: 2600,
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        centerPadding: 0,
        // dots: true,
        speed: 500,
        // fade: true,
        // cssEase: 'linear',
        prevArrow:
          '<button type="button" class="slick-prev"><i class="fas fa-chevron-left fa-2x"></i></button>',
        nextArrow:
          '<button type="button" class="slick-next"><i class="fas fa-chevron-right fa-2x"></i></button>',
      });
      // Custom detail garage
      // $('.custom-carousel.owl-carousel').owlCarousel({
      //     margin:10,
      //     loop:true,
      //     responsive:{
      //         0:{
      //             items:1
      //         },
      //         600:{
      //             items:2
      //         },
      //         960:{
      //             items:4
      //         },
      //         1200:{
      //             items:4
      //         }
      //     }
      // });
      // Index half slider
      // $('.half-slider-carousel.owl-carousel').owlCarousel({
      //     items:1,
      //     loop:true
      // });
    },
    /*! === 2.5 BaguetteBoxes === */
    baguetteBoxes: function () {
      baguetteBox.run(".tz-gallery", { animation: "fadeIn" });
      baguetteBox.run(".mg-gallery", { animation: "fadeIn" });
    },
    /*! === 2.6 WayPoints === */
    wayPoints: function () {
      var waypoints = $(".waypoint-handler").waypoint(
        function (direction) {
          // Add Loader
          this.element.innerHTML = '<div class="spinner scaleout"></div>';
          // Get Column
          var columns = $(".card-columns");
          if (columns.hasClass("json-end") == false) {
            columns.addClass("json-end");
            setTimeout(function () {
              $.getJSON("assets/json/wearable.json", function (items, status) {
                if (status == "success") {
                  var html = "";
                  $.each(items, function (i, item) {
                    html +=
                      '<div class="card"><img class="card-img-top img-fluid ilist-c" src="assets/img/' +
                      item.image +
                      '" data-src="holder.js/227x160/auto" alt="Card image cap">';
                    html += '<div class="card-body">';
                    html += '<h5 class="card-title">' + item.title + "</h5>";
                    html +=
                      '<p class="card-text">' +
                      item.description +
                      '</p><ul class="list-inline">';
                    html +=
                      '<li class="list-inline-item"><a href="" class="list-item"><span class="fa fa-tag"></span> ' +
                      item.category +
                      "</a></li>";
                    html +=
                      '<li class="list-inline-item"><a href="" class="list-item"><span class="fa fa-money-bill-alt"></span> $ ' +
                      item.price +
                      "</a></li>";
                    html +=
                      '<li class="list-inline-item"><a href="' +
                      item.link +
                      '" class="list-item" target="_blank"><span class="fa fa-cart-plus"></span> Buy</a></li>';
                    html += "</ul></div></div>";
                  });
                  setTimeout(function () {
                    columns.append(html);
                    this.initialize.isotopesInit();
                  }, 1000);
                }
              });
            }, 1500);
          } else {
            this.element.innerHTML = "-- already reach the end --";
          }
        },
        {
          offset: "75%",
        }
      );
    },
    /*! === 2.7 Header Footer === */

    headerFooter: function () {
      var animEndEventNames = {
          WebkitAnimation: "webkitAnimationEnd",
          OAnimation: "oAnimationEnd",
          msAnimation: "MSAnimationEnd",
          animation: "animationend",
        },
        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed("animation")],
        // support css animations
        support = Modernizr.cssanimations;
      //$(this).on('focus',function(){
      $("#section-nav")
        .addClass("pt-page-moveFromTop pt-page-delay1000")
        .on(animEndEventName, function () {
          $(this).off(animEndEventName);
        });
      // $('#footer').addClass('pt-page-moveFromBottom pt-page-delay1000').on(animEndEventName,function(){
      //     $(this).off(animEndEventName);
      // });
      $("#cookiesCollapse")
        .addClass("pt-page-moveFromBottom pt-page-delay1000")
        .on(animEndEventName, function () {
          $(this).off(animEndEventName);
        });
    },
    /*! === 2.8 Icons Samples === */

    iconSamples: function () {
      // alert($( ".icons-samples button" ).length);
      $(".icons-samples button").each(function () {
        var label = $(this).find("span").attr("class");
        $(this).click(function () {
          $(this).parents().find("span.text-primary").hide().remove();

          $(this)
            .find("span")
            .html(
              '<span class="text-primary small align-text-top"> ' +
                label +
                "<span>"
            )
            .show();
        });
      });
    },
    /*! === 2.9 Isotopes === */
    isotopesInit: function () {
      var $grid = $(".gallery-list").isotope({
        // options
        itemSelector: ".grid-item",
        percentPosition: true,
        masonry: {
          columnWidth: ".grid-sizer",
        },
        filter: "*",
      });
      // filter items on button click
      $(".navbar-gallery").on("click", "li a", function () {
        var filterValue = $(this).attr("data-filter");
        $(".navbar-gallery li a").removeClass("active");
        $(this).addClass("active");
        $grid.isotope({ filter: filterValue });
      });
    },
  };
  /*! === 3. Document on Ready === */
  APPSCRIPT.documentOnReady = {
    /*! === 3.1 On Ready initialize === */
    init: function () {
      APPSCRIPT.initialize.init();
      //APPSCRIPT.header.init();
      //APPSCRIPT.documentOnReady.windowscroll();
    },

    /*! === 3.2 On Window scroll initialize === */
    windowscroll: function () {},
  };
  /*! === 4. Document on Load === */
  APPSCRIPT.documentOnLoad = {
    init: function () {},
  };
  /*! === 5. Document on Resize === */
  APPSCRIPT.isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        APPSCRIPT.isMobile.Android() ||
        APPSCRIPT.isMobile.BlackBerry() ||
        APPSCRIPT.isMobile.iOS() ||
        APPSCRIPT.isMobile.Opera() ||
        APPSCRIPT.isMobile.Windows()
      );
    },
  };
  /*! === 6. Document on Scroll === */
  APPSCRIPT.documentOnResize = {
    init: function () {
      // var t = setTimeout( function(){
      //     APPSCRIPT.header.topsocial();
      //     APPSCRIPT.header.fullWidthMenu();
      //     APPSCRIPT.header.overlayMenu();
      //     APPSCRIPT.initialize.fullScreen();
      //     APPSCRIPT.initialize.verticalMiddle();
      //     APPSCRIPT.initialize.maxHeight();
      //     APPSCRIPT.initialize.testimonialsGrid();
      //     APPSCRIPT.initialize.stickyFooter();
      //     APPSCRIPT.slider.sliderParallaxDimensions();
      //     APPSCRIPT.slider.captionPosition();
      //     APPSCRIPT.portfolio.arrange();
      //     APPSCRIPT.portfolio.portfolioDescMargin();
      //     APPSCRIPT.widget.tabsResponsiveResize();
      //     APPSCRIPT.widget.tabsJustify();
      //     APPSCRIPT.widget.html5Video();
      //     APPSCRIPT.widget.masonryThumbs();
      //     APPSCRIPT.initialize.dataResponsiveClasses();
      //     APPSCRIPT.initialize.dataResponsiveHeights();
      //     if( $gridContainer.length > 0 ) {
      //     if( !$gridContainer.hasClass('.customjs') ) {
      //         if( $().isotope ) {
      //         $gridContainer.isotope('layout');
      //         } else {
      //         console.log('documentOnResize > init: Isotope not defined.');
      //         }
      //     }
      //     }
      //     if( $body.hasClass('device-lg') || $body.hasClass('device-md') ) {
      //     $('#primary-menu').find('ul.mobile-primary-menu').removeClass('show');
      //     }
      // }, 500 );

      windowWidth = $window.width();
    },
  };

  var $window = $(window),
    $body = $("body"),
    $wrapper = $("#wrapper"),
    $header = $("#header"),
    //$headerWrap = $('#header-wrap'),
    //$content = $('#content'),
    //$footer = $('#footer'),
    windowWidth = $window.width(); //,
  //$goToTopEl = $('#gotoTop');
  $(document).ready(APPSCRIPT.documentOnReady.init);
  //$window.load( APPSCRIPT.documentOnLoad.init );
  $(window).on("resize", APPSCRIPT.documentOnResize.init);
})(jQuery);

console.log("gulpss", "gulp watchers, xoxoxoxoxox.........");
