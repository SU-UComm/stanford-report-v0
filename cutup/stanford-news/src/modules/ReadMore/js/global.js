import Swiper from 'swiper';
/* eslint-disable no-undef */
var swiper = new Swiper('.story__read-next-swiper', {
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    },
    slidesPerView: 'auto',
    centerSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 40,
    a11y: true,
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('story-slide__visible');
                entry.target.setAttribute('aria-hidden', false);
            } else {
                entry.target.classList.remove('story-slide__visible');
                entry.target.setAttribute('aria-hidden', true);
            }
        });
    },
    {rootMargin: '100% 0px 100% 0px', threshold: 0.9},
);

const slides = document.querySelectorAll('.swiper-slide');
slides.forEach((slide) => {
    observer.observe(slide);
});
