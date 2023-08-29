const conexao = await fetch("https://api-five-fawn.vercel.app/");
const conexaoConvertida = await conexao.json();
const deleteButton = document.querySelector('.delete');

// deleteButton.addEventListener('click', (evento) => {
//     evento.preventDefault();
//     deleteBook(evento);
// })

// function deleteBook(evento){
//     const bookSelected = swiper.activeIndex;
//     conexaoConvertida.splice(bookSelected, 1);
//     console.log(bookSelected);
// }


const changeableText = document.querySelector('#changeableText');
const changeableSlide = document.querySelector('.swiper-wrapper');

async function listaLivros(){
    conexaoConvertida.forEach(element => {
        const cardLivro = document.createElement('div');
        cardLivro.classList.add('swiper-slide');

        const imgLivro = document.createElement('img');
        imgLivro.classList.add('swiper-slide-img');
        imgLivro.src = element.imagem;
        console.log(element.imagem);

        cardLivro.appendChild(imgLivro);
        changeableSlide.appendChild(cardLivro);
    })
}

listaLivros();

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
    onloadstart: changeableText.textContent = conexaoConvertida[0].descricao,
    on: {
        slideChange: function fazer () {
            const activeSlideIndex = this.activeIndex;
            console.log(`Currently showing slide ${activeSlideIndex + 1}`);

            changeableText.textContent = conexaoConvertida[activeSlideIndex].descricao;
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