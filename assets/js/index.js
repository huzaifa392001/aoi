// function initialization
$(window).on("load", function () {
    // $(window).scrollTop(0);
});

$(function () {
    $(window).scrollTop(0);
    gsap.registerPlugin(ScrollTrigger);
    $('[data-magnetic]').each(function () {
        new Magnetic(this);
    });
    allFunctionInit();
});

function allFunctionInit() {
    lenisSetup();
    heroAnim();
    progressBar();
    customSlider();
    revealingImg();
    servSliderFunc();
}

function lenisSetup() {
    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        smooth: true,
        mouseMultiplier: 1,
    })
    lenis.scrollTo(document.querySelector('#home'))

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf);
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            lenis.scrollTo(this.getAttribute("href"));
        });
    });
}

function preloader() {
    let loadertl = gsap.timeline({onComplete: scrollLetters()});

    loadertl
        .to('.loadingScreen', {
            delay: 4,
            autoAlpha: 0
        })
        .to(".preloader div", {
            yPercent: -100,
            stagger: 0.2,
            ease: 'Power2.out'
        })
        .to('.bannerSec .content h1 span .char', {
            x: 0,
            autoAlpha: 1,
            duration: 0.3,
            stagger: 0.1,
            scale: 1,
            ease: "circ.out",
        })
        .add(function () {
            buttonUnderlineAnim.setDirection(1);
            buttonUnderlineAnim.play();
        }, '<')
}

function heroAnim() {
    let heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.heroSec',
            scrub: 1,
            pin: true,
            pinContainer: false
        }
    })
    heroTl
        .to('.heroSec .mainHeading', {autoAlpha: 0,})
        .to('.heroSec .mainImg', {scale: 2}, "<")
        .from(".heroSec .content p", {autoAlpha: 0, y: 100}, "-=0.25")
        .from(".heroSec .content .verticleLine", {scaleY: 0})
        .to('.heroSec .mainImg', {y: -20}, "<")
}

function progressBar() {
    let sections = document.querySelectorAll('section')
    let bar = document.querySelector(".progressBar")
    let pixels = window.pageYOffset;
    let pageHeight = document.body.scrollHeight - window.innerHeight;
    let progress = (100 * pixels) / pageHeight;
    for (i = 1; i <= sections.length; i++) {
        bar.innerHTML += '<span></span>';
    }
    document.addEventListener("scroll", function () {
        document.querySelector(".progress").style.width = progress + "%";
    });
    // window.addEventListener("scroll", function() {
    //     // Calculate the position of each section
    //     let sectionPositions = [];
    //     sections.forEach(function(sectionId) {
    //         let section = document.getElementById(sectionId);
    //         let position = section.offsetTop;
    //         sectionPositions.push(position);
    //     });
    //
    //     // Calculate the percentage of the page that has been scrolled
    //     let scrollTop = window.scrollY;
    //     let docHeight = document.body.offsetHeight;
    //     let winHeight = window.innerHeight;
    //     let scrollPercent = scrollTop / (docHeight - winHeight) * 100;
    //
    //     // Update the width of the progress bar
    //     let progressBar = document.querySelector(".progress-bar");
    //     progressBar.style.width = scrollPercent + "%";
    //
    //     // Highlight the corresponding checkpoint
    //     let activeIndex = getActiveIndex(scrollTop, sectionPositions);
    //     highlightCheckpoint(activeIndex);
    // });
    //
    // function getActiveIndex(scrollTop, sectionPositions) {
    //     for (let i = sectionPositions.length - 1; i >= 0; i--) {
    //         if (scrollTop >= sectionPositions[i]) {
    //             return i;
    //         }
    //     }
    //     return 0;
    // }
    //
    // function highlightCheckpoint(index) {
    //     let checkpoints = document.querySelectorAll(".checkpoint");
    //     for (let i = 0; i < checkpoints.length; i++) {
    //         if (i == index) {
    //             checkpoints[i].classList.add("active");
    //         } else {
    //             checkpoints[i].classList.remove("active");
    //         }
    //     }
    // }

}

function revealingImg() {
}

function customSlider() {
    let img = document.querySelector('.revealingImg')

    let imgTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.insightSec',
            scrub: 0.5,
            pin: true,
            pinContainer: false,
        }
    })
    imgTl.to(img, {autoAlpha: 0, scale: 0.5})
    var $card = $('.customSlide');
    var lastCard = $(".slider-list .card").length - 1;

    $('.next').click(function () {
        var prependList = function () {
            if ($('.customSlide').hasClass('activeNow')) {
                var $slicedCard = $('.customSlide').slice(lastCard).removeClass('transformThis activeNow');
                $('.slider-list').prepend($slicedCard);
            }
        }
        $('.slider-list li').last().removeClass('transformPrev').addClass('transformThis').prev().addClass('activeNow');
        setTimeout(function () {
            prependList();
        }, 150);
    });

    $('.prev').click(function () {
        var appendToList = function () {
            if ($('.customSlide').hasClass('activeNow')) {
                var $slicedCard = $('.customSlide').slice(0, 1).addClass('transformPrev');
                $('.slider-list').append($slicedCard);
            }
        }

        $('.slider-list li').removeClass('transformPrev').last().addClass('activeNow').prevAll().removeClass('activeNow');
        setTimeout(function () {
            appendToList();
        }, 150);
    });

}

function servSliderFunc() {
    const swiper = new Swiper('.servSlider', {
        // Default parameters
        slidesPerView: 1,
        loop: true,
        parallax: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    })
}