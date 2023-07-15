const input = document.querySelector('.pesquisa-input');
const button = document.querySelector('.pesquisa-botao');

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
                const titulo = document.createElement('h2');
                titulo.classList.add('livro-titulo');
                titulo.textContent = livro.volumeInfo.title;
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
                livroContainer.appendChild(titulo);
                livroContainer.appendChild(imagem);
                livroContainer.appendChild(descricao);
                livroContainer.appendChild(link);
                livrosContainer.appendChild(livroContainer);
            })
        })
})