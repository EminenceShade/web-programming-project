const animeList = document.getElementById('anime-list');
const searchInput = document.getElementById('search');

async function fetchAnime() {
    const response = await fetch('https://api.jikan.moe/v4/top/anime');
    const data = await response.json();
    displayAnime(data.data);
}

function displayAnime(animeArray) {
    animeList.innerHTML = '';
    animeArray.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
        animeCard.innerHTML = `
            <div class="anime-img-container">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="clickable-img" data-id="${anime.mal_id}">
            </div>
            <h3>${anime.title}</h3>
            <p>${anime.score} ⭐</p>
        `;
        animeList.appendChild(animeCard);
    });

    document.querySelectorAll('.clickable-img').forEach(img => {
        img.addEventListener('click', (e) => {
            const animeId = e.target.getAttribute('data-id');
            viewDetails(animeId);
        });
    });
}

function viewDetails(id) {
    localStorage.setItem('animeId', id);
    window.location.href = 'details.html';
}

function searchAnime() {
    const query = searchInput.value.toLowerCase();
    fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
        .then(res => res.json())
        .then(data => displayAnime(data.data));
}

searchInput.addEventListener('input', searchAnime);
fetchAnime();
