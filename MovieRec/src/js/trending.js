import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const extServe = new ExternalServices();



// API Configuration
// const API_URL = 'https://api.themoviedb.org/3/';
const API_URL = 'https://api.themoviedb.org/3/trending/all/';
// const API_URL = 'https://api.themoviedb.org/3/search/multi?query=';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODAyZjgxMTk4OTA0ZTE1N2NmZDk2NTcwNWMxMjcyYyIsIm5iZiI6MTc0MTYxMTgyNS4yNzUsInN1YiI6IjY3Y2VlMzMxZDk1ZTQxMWRkMDJhN2I0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nAJy1raaizDJybMAbnEaLOsqZwmk7Lu3mUiy4JDacyE';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Fetch Popular Movies
async function fetchTrendingMovies() {
    try {
        // alert(options);
        document.querySelector('.loading').style.display = 'block';


        const options = (key) => {
            return {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`
                }
            }
        }

        const query = `${API_URL}day?language=en-US`; // For all
        const response = await fetch(query, options(API_KEY));

        const data = await response.json();
        console.log(data);
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    } finally {
        document.querySelector('.loading').style.display = 'none';
    }
}

// Display Movies
function displayMovies(movies) {
    console.log(movies);
    const grid = document.getElementById('moviesGrid');
    grid.innerHTML = movies.map(movie => `
    <div class="movie-card">
    <a href="/movie/?id=${movie.id}">
        <img src="${IMAGE_BASE_URL}${movie.poster_path}"
            alt="${movie.title ? movie.title : movie.name}"
            class="movie-poster"
            onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Not+Available'">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title ? movie.title : movie.name}</h3>
                <p class="movie-rating">⭐ ${movie.vote_average.toFixed(1)}</p>
            </div>
    </a>
    </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank');
        });
    });
}

// Search Functionality
const searchInput = document.querySelector('.search-input');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        const searchTerm = e.target.value;
        if (searchTerm.length > 2) {
            try {
                const response = await fetch(
                    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`
                );
                const data = await response.json();
                displayMovies(data.results);
            } catch (error) {
                console.error('Search error:', error);
            }
        } else if (searchTerm.length === 0) {
            fetchMovies();
        }
    }, 500);
});

// Initialize
fetchTrendingMovies();

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});