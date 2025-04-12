// import loadAlerts from "./alert.mjs";
import { cardTemplate, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const ex = new ExternalServices();

async function loadMovies() {
    try {
        const url = 'https://api.themoviedb.org/3/movie/top_rated';

        const data = await ex.fetchApi(url);
        // console.log(data);

        cardTemplate(data.results, document.querySelector("#moviesGrid"));
    } catch (error) {
        console.error('Error loading movies:', error);
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
                loadMovies();
            }
        }, 500);
    });

}

document.addEventListener('DOMContentLoaded', () => {
    loadMovies();

    const searchInput = document.querySelector('.search-input');

    searchFunction(searchInput);

});
