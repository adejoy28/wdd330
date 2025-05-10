// import loadAlerts from "./alert.mjs";
import { appendParams, cardTemplate, loadHeaderFooter, addToFavList, Pagination } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";


const ex = new ExternalServices();
const baseUrl = 'https://api.themoviedb.org/3/movie/top_rated';

async function loadMovies(page = 1) {
    try {
        const url = appendParams(baseUrl, { language: 'en-US', page });
        const data = await ex.fetchApi(url);

        if (!data || !data.results) {
            throw new Error('Invalid data received from API');
        }

        const pagination = new Pagination(data.page, data.total_pages, null, (newPage) => loadMovies(newPage));
        pagination.init();

        cardTemplate(data.results, document.querySelector("#moviesGrid"));
        addToFavList();

    } catch (error) {
        console.error('Error loading movies:', error);
        showNotification('Failed to load movies. Please try again later.');
    }
}



async function searchFunction(searchInput) {
    let searchTimeout;
    const DEBOUNCE_DELAY = 500; // Configurable debounce delay

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            const searchTerm = e.target.value.trim();
            if (searchTerm.length > 2) {
                try {
                    const response = await ex.getData(`search/multi?query=${searchTerm}&include_adult=false&language=en-US`);
                    if (response.results && Array.isArray(response.results)) {
                        if (response.results.length === 0) {
                            showNotification('No results found for your search.');
                        } else {
                            cardTemplate(response.results, document.querySelector("#moviesGrid"));
                        }
                    } else {
                        showNotification('No results found for your search.');
                    }
                } catch (error) {
                    console.error('Search error:', error);
                    showNotification('Search failed. Please try again.');
                }
            } else if (searchTerm.length === 0) {
                loadMovies();
            }
        }, DEBOUNCE_DELAY);
    });

}



async function surpriseMe() {
    try {
        const data = await ex.getData('/trending/movie/day');

        const totalPages = Math.min(data.total_pages);
        const randomPage = Math.floor(Math.random() * totalPages) + 1;

        // Fetch Random Page from the API
        const fetchRandomPage = await ex.getData(`/trending/movie/day?page=${randomPage}`);
        const randMoviesFromRandomPage = fetchRandomPage.results;

        if (!randMoviesFromRandomPage.length)
            throw new Error('No movies Found');

        const randomMovieIndex = Math.floor(Math.random() * randMoviesFromRandomPage.length);
        const randomMovie = randMoviesFromRandomPage[randomMovieIndex];

        console.log(randomMovie);

        window.location.href = `/movie/?id=${randomMovie.id}`;

    } catch (error) {
        console.error('Error loading movies:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter();
    loadMovies(1);

    const searchInput = document.querySelector('.search-input');

    searchFunction(searchInput);

    const surpriseMeBtn = document.querySelector('.cta-button');
    surpriseMeBtn.addEventListener('click', surpriseMe);
    // surpriseMe(); // Initialises "Surpise Me!" button



});
