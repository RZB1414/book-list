const input = document.querySelector('.pesquisa-input');
const button = document.querySelector('.pesquisa-botao');
const menuList = document.querySelector('.livro-menu');

button.addEventListener('click', evento => buscaLivros(evento));

//requisição para a API do google
async function buscaLivros(evento) {
    evento.preventDefault();
    const text = input.value;

    const conexaoGoogle = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
    const conexaoGoogleConvertida = await conexaoGoogle.json();

    const livros = conexaoGoogleConvertida.items;

    //limpa a div de livros
    const livrosContainer = document.querySelector('.livros-container');
    livrosContainer.innerHTML = '';

    //cria os elementos de cada livro
    livros.forEach(livro => {
        const livroContainer = document.createElement('div');
        livroContainer.classList.add('livro-container');
        const tituloContainer = document.createElement('div');
        tituloContainer.classList.add('livro-titulo-container');
        const titulo = document.createElement('h2');
        titulo.classList.add('livro-titulo');
        titulo.textContent = livro.volumeInfo.title;

        //cria o menu de cada livro
        const divCheckbox = document.createElement('div');
        divCheckbox.classList.add('container__checkbox');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = 'menu';
        checkBox.classList.add('container__botao');
        const label = document.createElement('label');
        label.setAttribute('for', 'menu');
        label.classList.add('container__rotulo');
        const span = document.createElement('span');
        span.classList.add('cabeçalho__menu-hamburguer');
        label.appendChild(span);
        divCheckbox.appendChild(checkBox);
        divCheckbox.appendChild(label);

        //evento para abrir o menu
        span.addEventListener('click', (event) => {
            event.preventDefault();
            checkBox.classList.toggle('active');
            listaMenu.style.display = checkBox.classList.contains('active') ? 'block' : 'none';
        });

        //cria a lista de opções do menu
        const listaMenu = document.createElement('ul');
        listaMenu.classList.add('lista-menu');
        const itemMenu = document.createElement('li');
        itemMenu.classList.add('lista-menu-item');

        //evento para adicionar o livro
        const linkMenu = document.createElement('p');
        linkMenu.classList.add('lista-menu-link');
        linkMenu.href = '#';
        linkMenu.textContent = 'Add';
        itemMenu.classList.add('lista-menu-item');

        //função para adicionar o livro
        async function addLivro(evento) {
            evento.preventDefault();

            //verifica se o livro já está na biblioteca
            const conexaoIf = await fetch('https://api-five-fawn.vercel.app/');
            const conexaoIfConvertida = await conexaoIf.json();
            const livroExiste = conexaoIfConvertida.some(livros => livro.volumeInfo.title === livros.titulo);

            if (livroExiste) {
                alert('This book is alredy in your library!');
            } else {
                //add o livro na biblioteca
                evento.preventDefault();
                const conexao = await fetch('https://api-five-fawn.vercel.app/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        titulo: livro.volumeInfo.title,
                        descricao: livro.volumeInfo.description,
                        imagem: livro.volumeInfo.imageLinks.thumbnail,
                        link: livro.volumeInfo.previewLink
                    })
                });
            }
        }

        linkMenu.addEventListener('click', evento => {
            evento.preventDefault();
            addLivro(evento)});

        //appends
        itemMenu.appendChild(linkMenu);
        listaMenu.appendChild(itemMenu);
        tituloContainer.appendChild(titulo);
        tituloContainer.appendChild(divCheckbox);
        tituloContainer.appendChild(listaMenu);

        //cria os elementos de cada livro
        const descricao = document.createElement('p');
        descricao.classList.add('livro-descricao');
        descricao.textContent = livro.volumeInfo.description;
        const imagem = document.createElement('img');
        imagem.classList.add('livro-imagem');
        imagem.src = livro.volumeInfo.imageLinks.thumbnail;
        const link = document.createElement('a');
        link.classList.add('livro-link');
        link.href = livro.volumeInfo.previewLink;
        link.textContent = 'Read more...';

        //appends
        livroContainer.appendChild(tituloContainer);
        livroContainer.appendChild(imagem);
        livroContainer.appendChild(descricao);
        livroContainer.appendChild(link);
        livrosContainer.appendChild(livroContainer);
    })
}