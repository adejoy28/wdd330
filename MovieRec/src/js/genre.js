import { cardTemplate, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();


const extServe = new ExternalServices();

const moodButtons = document.querySelectorAll('.mood-btn');

async function fetchTrendingMovies() {
    try {
        document.querySelector('.loading').style.display = 'block';

        const data = await extServe.getData('trending/movie/week?language=en-US&sort_by=popularity.desc');
        cardTemplate(data.results, document.getElementById('moviesGrid')); // Display movies
        // pagination(data.pages)
    } catch (error) {
        console.error('Error fetching movies:', error);
    } finally {
        document.querySelector('.loading').style.display = 'none';
    }
}


// Mood filter functionality
moodButtons.forEach(button => {
    button.addEventListener('click', async () => {
        moodButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Get the selected mood
        const mood = button.getAttribute('data-genreid'); // Default to 'All' if attribute is missing

        // Filter movies (in a real app, this would call an API)
        if (mood === 'all') {
            await fetchTrendingMovies();
        } else {
            let url = 'https://api.themoviedb.org/3/'
            const data = await extServe.getData(`discover/movie?include_adult=false&include_video=false&&with_genres=${mood}&language=en-US&page=1&sort_by=popularity.desc`);
            console.log(data.results);
            // const filteredMovies = data.results.filter(movie => movie.genre_ids.includes(parseInt(mood)));
            // console.log(filteredMovies);

            cardTemplate(data.results, document.getElementById('moviesGrid')); // Display movies
        }
    });
});

fetchTrendingMovies();


// Render filtered movies
function renderFilteredMovies(movies) {
    carousel.innerHTML = '';

    if (movies.length === 0) {
        carousel.innerHTML = `
                    <div class="no-results" style="width: 100%; text-align: center; padding: 2rem;">
                        <h3>No movies found for this category</h3>
                        <p>Try another mood filter</p>
                    </div>
                `;
        dotsContainer.innerHTML = '';
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
                    <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                    <div class="movie-overlay"></div>
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        <div class="movie-meta">
                            <span>${movie.year}</span>
                            <span class="movie-rating">⭐ ${movie.rating}</span>
                        </div>
                    </div>
                `;
        carousel.appendChild(movieCard);
    });

    // Hide dots for filtered results
    dotsContainer.innerHTML = '';
}

