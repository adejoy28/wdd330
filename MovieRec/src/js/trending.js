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

async function searchFunction(searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            const searchTerm = e.target.value;
            if (searchTerm.length > 2) {
                try {
                    const response = await ex.getData(`search/multi?query=${searchTerm}&include_adult=false&language=en-US`);
                    console.log(response.results);
                    if (response.results && Array.isArray(response.results)) {
                        cardTemplate(response.results, document.querySelector("#moviesGrid"));
                    } else {
                        console.log("No results found for the search term.");
                    }

                } catch (error) {
                    console.error('Search error:', error);
                }
            } else if (searchTerm.length === 0) {
                // loadMovie/s();
            }
        }, 500);
    });

}


// Initialize
fetchTrendingMovies();

// Pagination will come later