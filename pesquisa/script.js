const input = document.querySelector('.pesquisa-input');
const button = document.querySelector('.pesquisa-botao');
const menuList = document.querySelector('.livro-menu');

button.addEventListener('click', (event) => {
    event.preventDefault();

    const text = input.value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${text}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const livros = data.items;
            const livrosContainer = document.querySelector('.livros-container');
            livrosContainer.innerHTML = '';
            livros.forEach(livro => {
                const livroContainer = document.createElement('div');
                livroContainer.classList.add('livro-container');
                const tituloContainer = document.createElement('div');
                tituloContainer.classList.add('livro-titulo-container');
                const titulo = document.createElement('h2');
                titulo.classList.add('livro-titulo');
                titulo.textContent = livro.volumeInfo.title;

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

                span.addEventListener('click', (event) => {
                    checkBox.classList.toggle('active');
                    listaMenu.style.display = checkBox.classList.contains('active') ? 'block' : 'none';
                  });

            const listaMenu = document.createElement('ul');
            listaMenu.classList.add('lista-menu');
            const itemMenu1 = document.createElement('li');
            itemMenu1.classList.add('lista-menu-item');

            const linkMenu1 = document.createElement('a');
            linkMenu1.classList.add('lista-menu-link');
            linkMenu1.href = '#';
            linkMenu1.textContent = 'Add';

            
            
            



            const itemMenu2 = document.createElement('li');
            itemMenu1.classList.add('lista-menu-item');

            const linkMenu2 = document.createElement('a');
            linkMenu2.classList.add('lista-menu-link');
            linkMenu2.href = '#';
            linkMenu2.textContent = 'Remove';
            
            itemMenu1.appendChild(linkMenu1);
            itemMenu2.appendChild(linkMenu2);
            listaMenu.appendChild(itemMenu1);
            listaMenu.appendChild(itemMenu2);


            tituloContainer.appendChild(titulo);
            tituloContainer.appendChild(divCheckbox);
            tituloContainer.appendChild(listaMenu);
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
            livroContainer.appendChild(tituloContainer);
            livroContainer.appendChild(imagem);
            livroContainer.appendChild(descricao);
            livroContainer.appendChild(link);
            livrosContainer.appendChild(livroContainer);
        })
})
})