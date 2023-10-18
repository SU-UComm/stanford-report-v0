const contentCarousels = document.querySelectorAll('.basic-story__content-carousel');
contentCarousels.forEach((carousel) => {
    var swiper = new Swiper(carousel, {
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.basic-story__content-carousel-next',
            prevEl: '.basic-story__content-carousel-prev',
        },
        slidesPerView: 'auto',
        spaceBetween: 0,
        a11y: true,
    });
});
