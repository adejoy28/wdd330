import { cardTemplate, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const extServe = new ExternalServices();



// API Configuration
// const API_URL = 'https://api.themoviedb.org/3/';
// const API_URL = 'https://api.themoviedb.org/3/';
// const API_URL = 'https://api.themoviedb.org/3/search/multi?query=';
// const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODAyZjgxMTk4OTA0ZTE1N2NmZDk2NTcwNWMxMjcyYyIsIm5iZiI6MTc0MTYxMTgyNS4yNzUsInN1YiI6IjY3Y2VlMzMxZDk1ZTQxMWRkMDJhN2I0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nAJy1raaizDJybMAbnEaLOsqZwmk7Lu3mUiy4JDacyE';

// Fetch Popular Movies
async function fetchTrendingMovies() {
    try {
        // alert(options);
        document.querySelector('.loading').style.display = 'block';

        const data = await extServe.getData('trending/movie/day?language=en-US');
        cardTemplate(data.results, document.getElementById('moviesGrid')); // Display movies

    } catch (error) {
        console.error('Error fetching movies:', error);
    } finally {
        document.querySelector('.loading').style.display = 'none';
    }
}

// Initialize
fetchTrendingMovies();

// Smooth scroll for navigation
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });