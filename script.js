document.addEventListener('DOMContentLoaded', () => {
    const characterList = document.getElementById('character-list');
    const fetchCharactersButton = document.getElementById('fetch-characters');
    
    let nextPageUrl = 'https://rickandmortyapi.com/api/character';

    const loadCharacters = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                characterList.innerHTML = ''; // Limpa os cards existentes

                data.results.forEach(character => {
                    const characterCard = document.createElement('div');
                    characterCard.classList.add('character-card');

                    characterCard.innerHTML = `
                        <img src="${character.image}" alt="${character.name}">
                        <h2>${character.name}</h2>
                        <p>Status: ${character.status}</p>
                        <p>Espécie: ${character.species}</p>
                    `;

                    characterList.appendChild(characterCard);
                });
                
                nextPageUrl = data.info.next; // Atualiza a URL da próxima página
                if (!nextPageUrl) {
                    fetchCharactersButton.style.display = 'none'; // Oculta o botão se não houver mais páginas
                }

                // Torna os cards visíveis
                characterList.classList.add('show');
            })
            .catch(error => console.error('Erro ao carregar os dados:', error));
    };

    fetchCharactersButton.addEventListener('click', () => {
        loadCharacters(nextPageUrl);
    });
});
