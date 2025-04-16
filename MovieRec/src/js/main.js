// import loadAlerts from "./alert.mjs";
import { cardTemplate, loadHeaderFooter, pagination } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const ex = new ExternalServices();

async function loadMovies() {
    try {
        // const url = 'https://api.themoviedb.org/3/movie/top_rated';
        const baseUrl = 'https://api.themoviedb.org/3/movie/top_rated';
        const appendParams = (url, params) => {
            const queryString = new URLSearchParams(params).toString();
            return `${url}?${queryString}`;
        };

        const url = appendParams(baseUrl, { language: 'en-US', page: 1 });

        const data = await ex.fetchApi(url);
        // console.log(data);

        cardTemplate(data.results, document.querySelector("#moviesGrid"));
        pagination(data.page, data.total_pages);
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
                // loadMovie/s();
            }
        }, 500);
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
    loadMovies();

    const searchInput = document.querySelector('.search-input');

    searchFunction(searchInput);

    const surpriseMeBtn = document.querySelector('.cta-button');
    surpriseMeBtn.addEventListener('click', surpriseMe);
    // surpriseMe(); // Initialises "Surpise Me!" button
});
