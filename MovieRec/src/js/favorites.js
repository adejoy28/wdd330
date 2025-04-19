import { cardTemplateRev, loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();


// Fetch Popular Movies
async function renderFavoriteMovies() {
    try {
        // alert(options);
        // document.querySelector('.loading').style.display = 'block';

        const favMovies = getLocalStorage('favoriteMovies');

        console.log(favMovies);
        // const data = await extServe.getData('trending/movie/day?language=en-US');
        cardTemplateRev(favMovies, document.getElementById('moviesGrid')); // Display movies
        // await addToFavList();
    } catch (error) {
        console.error('Error fetching movies:', error);
    } finally {
        // document.querySelector('.loading').style.display = 'none';
    }
}

renderFavoriteMovies();

[{
    "adult": false,
    "backdrop_path": "/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
    "genre_ids": [18, 80],
    "id": 240,
    "original_language": "en",
    "original_title": "The Godfather Part II",
    "overview": "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
    "popularity": 20.0991,
    "poster_path": "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
    "release_date": "1974-12-20",
    "title": "The Godfather Part II",
    "video": false,
    "vote_average": 8.57,
    "vote_count": 12900
}]
