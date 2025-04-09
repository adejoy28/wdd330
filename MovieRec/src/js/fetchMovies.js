import { cardTemplate } from "./utils.mjs";

const API_URL = 'https://api.themoviedb.org/3/search/multi?query=';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODAyZjgxMTk4OTA0ZTE1N2NmZDk2NTcwNWMxMjcyYyIsIm5iZiI6MTc0MTYxMTgyNS4yNzUsInN1YiI6IjY3Y2VlMzMxZDk1ZTQxMWRkMDJhN2I0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nAJy1raaizDJybMAbnEaLOsqZwmk7Lu3mUiy4JDacyE';



async function fetchApi(request) {
    const query = API_URL + request;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    };

    const response = await fetch(query, options);
    const data = await response.json();

    console.log(data.results);

    cardTemplate(data.results, document.querySelector('#moviesGrid'));
}


fetchApi("gods");