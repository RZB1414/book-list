import data from './dados.json' assert { type: "json" };


const changeableText = document.querySelector('#changeableText');
const changeableImg = document.querySelector('.swiper-slide-imgjs');

const img = document.createElement('img');
img.classList.add('swiper-slide-img');
img.src = data[0].img;
changeableImg.appendChild(img);


var swiper = new Swiper('.bookSwiper', {
    effect: 'cards',
    perSlideOffset: 8,
    perSlideRotate: 2,
    rotate: true,
    slideShadows: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    onloadstart: changeableText.textContent = data[0].descricao,
    on: {
        slideChange: function fazer () {
            const activeSlideIndex = this.activeIndex;
            console.log(`Currently showing slide ${activeSlideIndex + 1}`);

            changeableText.textContent = data[activeSlideIndex].descricao;
            }
        }
    });

var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    mousewheel: true,
});