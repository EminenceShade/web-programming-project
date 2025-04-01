const animeDetails = document.getElementById('anime-details');
const animeId = localStorage.getItem('animeId');

async function fetchAnimeDetails() {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`);
    const anime = await response.json();
    displayDetails(anime.data);
}


function displayDetails(anime) {
    animeDetails.innerHTML = `
        <h1>${anime.title}</h1>
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <p>${anime.synopsis}</p>
        <p>⭐ ${anime.score} | 🎬 ${anime.episodes} Episodes | 📅 ${anime.aired.prop.from.year}</p>
        <div class="trailer-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${anime.trailer.youtube_id}" frameborder="0" allowfullscreen></iframe>
        </div>
    `;
}
fetchAnimeDetails();