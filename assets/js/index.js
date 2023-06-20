// function initialization
$(window).on("load", function () {
    if (window.innerWidth > 991) {

    }
    lenisSetup();
    preloader()
});

$(function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.normalizeScroll(true);
    $('[data-magnetic]').each(function () {
        new Magnetic(this);
    });
    allFunctionInit();
});

function allFunctionInit() {
    heroAnim();
    progressBar();
    customSlider();
    // revealingImg();
    const slideSec = document.querySelector('.slideSec');
    if (slideSec) {
        HorizontalScroll('.servSlider', '.panel', '.slideSec')
    }
    const aboutSec = document.querySelector('.aboutSec');
    if (aboutSec) {
        HorizontalScroll('.aboutSlider', '.panel', '.aboutSec');
    }
    stackingCardsFunc();
    rollingText();
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

function customSlider() {
    let mm = gsap.matchMedia();
    let slide = document.querySelector('.slider-stack .slider-list li:nth-child(3)')
    let img = document.querySelector('.slider-list')
    let overlay = document.querySelector('.customSlide a')
    if (!document.querySelector('.insightSec.notAnimate') && document.querySelector('.slider-stack')) {
        let imgTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.insightSec',
                scrub: 0.5,
                pin: true,
                pinContainer: false,
                onEnter: () => {
                    document.querySelector('.slider-stack').classList.remove('activated')
                },
                onLeave: () => {
                    document.querySelector('.slider-stack').classList.add('activated')
                },
                onEnterBack: () => {
                    document.querySelector('.slider-stack').classList.remove('activated')
                },
                onLeaveBack: () => {
                    document.querySelector('.slider-stack').classList.add('activated')
                }
            }
        })
        imgTl
            .from(img, {scale: 3})
    } else {
        $('.slider-stack').addClass('activated')
    }

    let sliders = $('.slider-stack');
    sliders.each(function () {
        const slider = $(this);
        const card = slider.find('.customSlide');
        let lastCard = slider.find(".slider-list .card").length - 1;
        let next = slider.find('.next');
        let prev = slider.find('.prev');

        next.on('click', function () {
            let prependList = function () {
                if (slider.find('.customSlide').hasClass('activeNow')) {
                    let slicedCard = slider.find('.customSlide').slice(lastCard).removeClass('transformThis activeNow');
                    slider.find('.slider-list').prepend(slicedCard);
                }
            };

            slider.find('.slider-list li').last().removeClass('transformPrev').addClass('transformThis').prev().addClass('activeNow');
            setTimeout(function () {
                prependList();
            }, 150);
        });

        prev.on('click', function () {
            let appendToList = function () {
                if (slider.find('.customSlide').hasClass('activeNow')) {
                    let slicedCard = slider.find('.customSlide').slice(0, 1).addClass('transformPrev');
                    slider.find('.slider-list').append(slicedCard);
                }
            };

            slider.find('.slider-list li').removeClass('transformPrev').last().addClass('activeNow').prevAll().removeClass('activeNow');
            setTimeout(function () {
                appendToList();
            }, 150);
        });
    });

}

function servSliderFunc() {
    const swiper = new Swiper('.servSlider', {
        // Default parameters
        slidesPerView: 1,
        loop: true,
        parallax: true,
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


function HorizontalScroll(section, panel, pinTarget) {

    if (pinTarget) {
        let parent = document.querySelector(section);
        let panels = parent.querySelectorAll(panel);

        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: pinTarget,
                pin: true,
                markers: true,
                scrub: 1,
                snap: 1 / (panels.length - 1),
                end: () => "+=" + (parent.offsetWidth) * 2
            }
        });
    }
}

function stackingCardsFunc() {
    // let section = document.querySelector('.servSlider')
    //
    // let sections = gsap.utils.toArray(".panel");
    //
    // if (section) {
    //     gsap.to(sections, {
    //         xPercent: -100 * (sections.length - 1),
    //         ease: "none",
    //         scrollTrigger: {
    //             trigger: ".slideSec",
    //             pin: true,
    //             markers: true,
    //             scrub: 1,
    //             snap: 1 / (sections.length - 1),
    //             end: () => "+=" + (section.offsetWidth) * 2
    //         }
    //     });
    //
    // }

    let cardCont = document.querySelectorAll(".streetCont")


    let overlays = document.querySelectorAll(".streetViewSec .streetCont .tabsCont .tab-content .overlay")
    overlays.forEach((overlay) => {
        $(overlay).on('click', function () {
            $(this).addClass('d-none')
        })
    })
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
                    return i === 0 ? '' : $(card).removeClass("active");
                },
            }
        })
    })
}

function rollingText() {
    const headings = document.querySelectorAll(".section-heading");
    if (headings.length != 0) {
        headings.forEach((heading) => {
            const rollLeft = heading.querySelector('.rollLeft')
            const rollRight = heading.querySelector('.rollRight')


            let headingAnim = gsap.timeline({
                scrollTrigger: {
                    trigger: heading,
                    // markers: true,
                    scrub: 1,
                    start: "top bottom",
                    end: "bottom 25%"
                },
            })

            headingAnim.from(rollLeft, {xPercent: -80})
                .from(rollRight, {xPercent: 80}, "<");
        });
    }
}
