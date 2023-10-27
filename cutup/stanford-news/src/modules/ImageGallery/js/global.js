class ImageGallery {
    constructor(target) {
        this.parent = target;
        this.imagesWrapper = target.querySelectorAll('.featured-story__gallery-images figure');
        this.images = [];
        this.trigger = target.querySelector('.featured-story__gallery-trigger');
        this.body = document.querySelector('body');

        this.handleGalleryTrigger();
        this.handleSlidesIndicator();
    }

    handleGalleryTrigger() {
        this.trigger.addEventListener('click', () => {
            this.images = this.buildImagesObject();
            this.triggerGalleryModal();
        });
    }

    handleCloseGalleryModal() {
        const parent = document.querySelector('.image-gallery__wrapper');
        const closeBtn = parent.querySelector('.image-gallery__close-btn');
        closeBtn.addEventListener('click', (e) => {
            if (e.target.classList.contains('image-gallery__close-btn')) {
                this.swiper.destroy();
                parent.remove();
                this.body.classList.remove('su-overflow-hidden');
                this.handleBodyInertAttr('remove');
            }
        });
    }

    buildImagesObject() {
        const images = [];

        this.imagesWrapper.forEach((image) => {
            const imageObject = {
                src: image.querySelector('img').getAttribute('src'),
                alt: image.querySelector('img').getAttribute('alt'),
                caption: image.querySelector('figcaption').innerHTML,
                paragraph: image.querySelector('.featured-story__gallery-item-desc').innerHTML,
            };

            images.push(imageObject);
        });
        return images;
    }

    handleBodyInertAttr(action) {
        var children = new Array();
        this.body.childNodes.forEach((child) => {
            if (child.nodeType === 1 && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
                children.push(child);
            }
        });

        children.forEach((child) => {
            child.setAttribute('inert', '');
        });

        switch (action) {
            case 'add':
                children.forEach((child) => {
                    child.setAttribute('inert', '');
                });
                break;
            case 'remove':
                children.forEach((child) => {
                    child.removeAttribute('inert');
                });
                break;
            default:
                break;
        }
    }

    handleSlidesIndicator() {
        const indicator = document.querySelector('.image-gallery__slides-indicator');
        console.log(this.imagesWrapper.length);
    }

    triggerGalleryModal() {
        const distanceFromTop = document.documentElement.scrollTop;
        this.handleBodyInertAttr('add');
        this.buildGalleryModal(distanceFromTop);
        this.InitSwiper();
        this.handleCloseGalleryModal();
        this.body.classList.add('su-overflow-hidden');
    }

    InitSwiper = () => {
        const swiper = new Swiper('.image-gallery__swiper-wrapper', {
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.basic-story__header-slider-next',
                prevEl: '.basic-story__header-slider-prev',
            },

            slidesPerView: 'auto',
            spaceBetween: 200,
            a11y: true,
        });

        this.swiper = swiper;
    };

    buildGalleryModal(distanceFromTop) {
        const container = document.createElement('div');
        container.innerHTML = `<div style="top: ${distanceFromTop}px;z-index:9999;" class="image-gallery__wrapper su-absolute su-w-full su-grid su-grid-cols-6 sm:su-grid-cols-12 su-h-screen su-top-0 su-left-0 su-bg-white dark:su-bg-black-true">
            <div class="swiper image-gallery__swiper-wrapper su-col-span-10 su-px-[20px] sm:su-px-0 sm:su-col-start-2 su-py-[45px]">
                <button class="image-gallery__close-btn su-col-span-10 su-flex su-items-center su-gap-[6px] su-col-start-2 su-font-semibold su-text-digital-blue">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.55124 12.501C6.21929 12.833 5.6811 12.833 5.34916 12.501L1.94915 9.10104C1.61721 8.7691 1.61721 8.23091 1.94915 7.89896L5.34916 4.49896C5.6811 4.16701 6.21929 4.16701 6.55124 4.49896C6.88318 4.8309 6.88318 5.3691 6.55124 5.70104L4.60228 7.65L14.4502 7.65C14.9196 7.65 15.3002 8.03056 15.3002 8.5C15.3002 8.96944 14.9196 9.35 14.4502 9.35L4.60228 9.35L6.55124 11.299C6.88318 11.6309 6.88318 12.1691 6.55124 12.501Z" fill="#006CB8"/>
                    </svg>
                    Back to story
                </button>
                <div class="swiper-wrapper su-h-auto su-mt-[80px]">
                    <div class="swiper-slide su-w-full su-flex su-flex-col md:su-flex-row su-gap-[48px] su-items-center">
                        <figure>
                            <img class="su-w-[859px] su-h-auto" src="/./mysource_files/muskrat1.png" alt="" />
                            <figcaption class="su-text-black dark:su-text-white su-text-[16px]">
                                Caption text goes here lorem ipsum dolor sit amet | Credit goes here lorem ipsum
                            </figcaption>
                        </figure>
                        <div class="su-max-w-[400px]">
                            <p>Lorem ipsum dolor sit amet, consectur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magne aliqua.</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magne aliqua.Lorem ipsum dolor sit amet,
                                consectur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magne aliqua.
                            </p>
                        </div>
                    </div>
                    
                </div>
                <div class="su-flex su-justify-between su-items-between sm:su-mt-[110px]">
                    <div class="swiper-pagination !su-top-0 !su-bottom-0 !su-w-auto su-flex su-items-center"></div>
            
                    <div class="su-w-[100px] su-flex">
                        <button
                            class="basic-story__header-slider-prev su-rounded-full su-h-[37px] su-w-[37px] disabled:su-bg-black-30 su-mr-[12px] su-bg-gradient su-flex su-items-center su-justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <path d="M11.8747 15.0416L6.33301 9.49996L11.8747 3.95829" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button
                            class="basic-story__header-slider-next su-rounded-full su-h-[37px] su-w-[37px] disabled:su-bg-black-30 su-bg-gradient su-flex su-items-center su-justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                                <path d="M7.62435 3.95837L13.166 9.50004L7.62435 15.0417" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>`;

        const imageElements = this.images.map(
            (image) => `
                <div class="swiper-slide su-w-full su-flex su-flex-col lg:su-flex-row su-gap-[48px] su-items-center">
                    <figure>
                        <img class="su-w-[859px] su-h-auto su-max-h-[45vh] lg:su-max-h-[55vh] su-object-contain" src="${image.src}" alt="${image.alt}" />
                        <figcaption class="su-text-black dark:su-text-white su-text-[16px]">
                            ${image.caption}
                        </figcaption>
                    </figure>
                    <div class="su-max-w-[400px]">
                        ${image.paragraph}
                    </div>
                </div>
            `,
        );

        container.querySelector('.swiper-wrapper').innerHTML = imageElements.join('');
        document.body.appendChild(container);
    }
}

const imageGalleries = document.querySelectorAll('.featured-story__gallery');

imageGalleries.forEach((gallery) => {
    new ImageGallery(gallery);
});
