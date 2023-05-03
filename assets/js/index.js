// function initialization
$(window).on("load", function () {
    lenisSetup();
    preloader()
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
    heroAnim();
    progressBar();
    customSlider();
    revealingImg();
    servSliderFunc();
    stackingCardsFunc();
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
    let loaderTl = gsap.timeline({defaults: {ease: 'Power2.out'}})

    loaderTl
        .to('.preloader svg', {
            scale: 0,
            delay: 1
        })
        .to('.preloader', {
            scaleY: 0
        })
        .from('.mainHeading', {
            y: 100,
            autoAlpha: 0
        })
        .from('.progressBarWrapper', {
            scale: 0
        })
        .from('.progressBarWrapper span', {
            x: -10,
            autoAlpha: 0,
            stagger: 0.1
        }, "-=0.25")
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
        .to('.heroSec .mainImg', {scale: 1.375}, "<")
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
    window.addEventListener("scroll", function () {
        // Calculate the position of each section
        let sectionPositions = [];
        sections.forEach((section) => {
            // let section = document.getElementById(section);
            let position = section.offsetTop;
            sectionPositions.push(position);
        })
        // sections.forEach(()=>{function(sectionId) {
        //
        // })};

        // Calculate the percentage of the page that has been scrolled
        let scrollTop = window.scrollY;
        let docHeight = document.body.offsetHeight;
        let winHeight = window.innerHeight;
        let scrollPercent = scrollTop / (docHeight - winHeight) * 100;

        // Update the width of the progress bar
        let progressBar = document.querySelector(".progress");
        $(progressBar).css("width", scrollPercent + "%");

        // Highlight the corresponding checkpoint
        let activeIndex = getActiveIndex(scrollTop, sectionPositions);
        highlightCheckpoint(activeIndex);
    });

    function getActiveIndex(scrollTop, sectionPositions) {
        for (let i = sectionPositions.length - 1; i >= 0; i--) {
            if (scrollTop >= sectionPositions[i]) {
                return i;
            }
        }
        return 0;
    }

    function highlightCheckpoint(index) {
        let checkpoints = document.querySelectorAll(".checkpoint");
        for (let i = 0; i < checkpoints.length; i++) {
            if (i == index) {
                checkpoints[i].classList.add("active");
            } else {
                checkpoints[i].classList.remove("active");
            }
        }
    }

}

function revealingImg() {
}

function customSlider() {
    let slide = document.querySelector('.slider-stack .slider-list li:nth-child(3)')
    let img = document.querySelector('.revealingImg')
    let imgTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.insightSec',
            scrub: 0.5,
            pin: true,
            pinContainer: false,
            onLeave: () => {
                imgTl.to(img, {autoAlpha: 0, ease: "none"})
            }
        }
    })
    imgTl
        .to(img, {scale: 0.45, y: 10})
        .to(img, {css: {height: "1200px"}}, "-=0.5")
    // .to(img, {autoAlpha: 0}, "<")


    let $card = $('.customSlide');
    let lastCard = $(".slider-list .card").length - 1;

    $('.next').click(function () {
        let prependList = function () {
            if ($('.customSlide').hasClass('activeNow')) {
                let $slicedCard = $('.customSlide').slice(lastCard).removeClass('transformThis activeNow');
                $('.slider-list').prepend($slicedCard);
            }
        }
        $('.slider-list li').last().removeClass('transformPrev').addClass('transformThis').prev().addClass('activeNow');
        setTimeout(function () {
            prependList();
        }, 150);
    });

    $('.prev').click(function () {
        let appendToList = function () {
            if ($('.customSlide').hasClass('activeNow')) {
                let $slicedCard = $('.customSlide').slice(0, 1).addClass('transformPrev');
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
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    })
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".servSlider",
            start: "top top",
            onEnter: () => {
                console.log(swiper.autoplay)
                swiper.autoplay.start();
            }
        }
    })
}

function stackingCardsFunc() {
    let cardCont = document.querySelectorAll(".streetCont")

    cardCont.forEach((card, i) => {
        let cardTl = gsap.timeline({
            default: {
                delay: 1,
            },
            scrollTrigger: {
                trigger: card,
                // markers: true,
                start: "top 15%",
                end: "bottom+=150 15%",
                toggleActions: "play none none reverse",
                preventOverlaps: true,
                fastScrollEnd: true,
                onEnter: () => {
                    $(card).addClass("active")
                },
                onLeave: () => {
                    $(card).removeClass("active")
                },
                onEnterBack: () => {
                    $(card).addClass("active")
                },
                onLeaveBack: () => {
                    $(card).removeClass("active")
                },
            }
        })
        // return i === 0 ? '' : cardTl.from(profileBox, {autoAlpha: 0}).from(para, {
        //     autoAlpha: 0,
        //     stagger: 0.05
        // }, "<").from(tabs, {autoAlpha: 0}, "<");
    })
}