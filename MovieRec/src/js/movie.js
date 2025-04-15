import { loadHeaderFooter, getParam, } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import MovieDetails from "./MovieDetails";


loadHeaderFooter();


const movieId = getParam('id');
const datasource = new ExternalServices();

const movie = new MovieDetails(movieId, datasource);
movie.init();