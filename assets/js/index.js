// function initialization
$(window).on("load", function () {
    $(window).scrollTop(0);
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

function heroAnim(){
    let heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.heroSec',
            scrub: 1,
            pin: true,
            pinContainer: false
        }
    })
    heroTl
        .to('.heroSec .mainHeading',{autoAlpha: 0,})
        .to('.heroSec .mainImg',{scale: 1.25},"<")
        .from(".heroSec .content p", {autoAlpha: 0, y: 100})
        .from(".heroSec .content .verticleLine",{scaleY: 0})
        // .to('.heroSec .mainImg',{yPercent: -15},"<")
}