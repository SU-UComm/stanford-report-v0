import Swiper from 'swiper';
const headerSlider = document.querySelector('.basic-story__header-slider');
const swiper = new Swiper(headerSlider, {
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.basic-story__header-slider-next',
        prevEl: '.basic-story__header-slider-prev',
    },

    slidesPerView: 'auto',
    spaceBetween: 26,
    a11y: true,
});
