gsap.registerPlugin(ScrollTrigger);

// // Script for sticky header

// $(window).scroll(function() {
//     if ($(this).scrollTop() > 1) {
//         $('header').addClass("sticky");
//     } else {
//         $('header').removeClass("sticky");
//     }
// });

$(function () {
    $('.themeBtn')
        .on('mouseenter', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({top: relY, left: relX})
        })
        .on('mouseout', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({top: relY, left: relX})
        });
    // $('[href=#]').click(function(){return false});
});

// Page RoleBack to Top
$(document).ready(function () {
    $('.roleback').click(function () {
        $("html, body").animate({scrollTop: 0}, 800);
        return false;
    });
});

// Go Down
$(function () {
    $('.goDown').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(".aboutSec").offset().top
        }, 500, 'linear');
    });
});


// Script for AOS Animation Initialize
// AOS.init();


// MAIN SLIDER
function mainSlider() {
    var interleaveOffset = 0.5;
    var swiperOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        // autoplay: {
        //     delay: 3500,
        //     disableOnInteraction: false,
        // },
        autoplay: false,
        grabCursor: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            // type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
        },
        on: {
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform = "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition = speed + "ms";
                }
            },
        },
    };

    const swiper = new Swiper(".homeSlider", swiperOptions);

    // DATA BACKGROUND IMAGE
    var pageSection = $(".bg-image");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
}

mainSlider();


//gsap loader
const tl = gsap.timeline({duration: 0.10});

function preLoader(tl) {
    tl.to('.preLoader.black > img',
        {
            delay: 1,
            y: 50,
            autoAlpha: 0,
        }
    )
        .to('.preLoader.black',
            {
                yPercent: -100,
            },
        )
        .to('.preLoader.white',
            {
                yPercent: -100,
            }
        )
        .to(".preLoader",
            {
                css: {
                    display: 'none'
                }
            }
        )
}

// function initialization
$(window).on('load', function () {
    preLoader(tl);
});


// Swiper Slider for Products or Testimonials

function reviewSlider() {
    var reviewBox = new Swiper(".reviewSlider", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 25,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // pagination: {
        //     el: ".swiper-bullets",
        //     clickable: true,
        //     // type: "fraction",
        // },
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }]
    });
}

$(function () {
    reviewSlider();
});


// Script for Slick Carousel
// $('.reviewsCarousel').slick({
//     autoplay: true,
//     autoplaySpeed: 5000,
//     dots: false,
//     arrows: true,
//     infinite: true,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-double-left"></i></button>',
//     nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-double-right"></i></button>',
//     responsive: [{
//         breakpoint: 1199,
//         settings: {
//             slidesToShow: 3
//         }
//     },
//     {
//         breakpoint: 768,
//         settings: {
//             slidesToShow: 2,
//             arrows: false
//         }
//     },
//     {
//         breakpoint: 575,
//         settings: {
//             slidesToShow: 1,
//             arrows: false
//         }
//     }
//     ]
// });


// Image Reveal
// function imgRevealer() {
//     let revealContainers = document.querySelectorAll(".reveal");
//     revealContainers.forEach((container) => {
//         let image = container.querySelector("img");
//         let revelerTl = gsap.timeline({
//             scrollTrigger: {
//                 // UnComment this if you're using Locomotive
//                 // scroller: '[data-scroll-container]',
//                 trigger: container,
//                 toggleActions: "restart none none reset",
//             }
//         });

//         revelerTl.set(container, { autoAlpha: 1 });
//         revelerTl.from(container, .75, {
//             xPercent: -100,
//             ease: Power2.out
//         });
//         revelerTl.from(image, .75, {
//             xPercent: 100,
//             scale: 1.3,
//             delay: -.75,
//             ease: Power2.out
//         });
//     });
// }
// imgRevealer();