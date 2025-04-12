// import loadAlerts from "./alert.mjs";
import { cardTemplate, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const ex = new ExternalServices();

async function loadMovies() {
    try {
        const url = 'https://api.themoviedb.org/3/movie/top_rated';

        const data = await ex.fetchApi(url);
        console.log(data);

        cardTemplate(data.results, document.querySelector("#moviesGrid"));
    } catch (error) {
        console.error('Error loading movies:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadMovies);