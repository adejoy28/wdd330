import { cardTemplate, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const extServe = new ExternalServices();


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