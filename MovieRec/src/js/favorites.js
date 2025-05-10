import { cardTemplate, loadHeaderFooter, getLocalStorage, setLocalStorage, showNotification } from "./utils.mjs";

loadHeaderFooter();

// Fetch Favorite Movies
async function renderFavoriteMovies() {
    const loadingElement = document.querySelector('.loading');
    const emptyStateElement = document.getElementById('emptyState');
    const moviesGridElement = document.getElementById('moviesGrid');

    if (loadingElement) {
        loadingElement.style.display = 'block';
    }

    try {
        const favMovies = getLocalStorage('favoriteMovies');

        if (!favMovies || !Array.isArray(favMovies) || favMovies.length === 0) {
            showNotification('No favorite movies found');
            if (emptyStateElement) {
                emptyStateElement.style.display = 'flex';
            }
            if (moviesGridElement) {
                moviesGridElement.innerHTML = '';
            }
            return;
        }

        if (emptyStateElement) {
            emptyStateElement.style.display = 'none';
        }

        // Parse the stored movie data
        const parsedMovies = favMovies.map(movie => {
            try {
                return typeof movie === 'string' ? JSON.parse(movie) : movie;
            } catch (error) {
                console.error('Error parsing movie data:', error);
                return null;
            }
        }).filter(movie => movie !== null);

        if (parsedMovies.length === 0) {
            showNotification('Error loading favorite movies');
            if (emptyStateElement) {
                emptyStateElement.style.display = 'flex';
            }
            if (moviesGridElement) {
                moviesGridElement.innerHTML = '';
            }
            return;
        }

        cardTemplate(parsedMovies, moviesGridElement);
        setupRemoveButtons();
    } catch (error) {
        console.error('Error fetching movies:', error);
        showNotification('Error loading favorite movies');
        if (emptyStateElement) {
            emptyStateElement.style.display = 'flex';
        }
        if (moviesGridElement) {
            moviesGridElement.innerHTML = '';
        }
    } finally {
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
}

function setupRemoveButtons() {
    const moviesGrid = document.getElementById('moviesGrid');
    if (!moviesGrid) return;

    moviesGrid.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.fav-btn');
        if (!favBtn) return;

        const movieData = favBtn.getAttribute('data-movieDetails');
        if (!movieData) return;

        try {
            const movie = JSON.parse(movieData);
            const favMovies = getLocalStorage('favoriteMovies') || [];
            const updatedFavs = favMovies.filter(m => {
                try {
                    const parsedM = typeof m === 'string' ? JSON.parse(m) : m;
                    return parsedM.id !== movie.id;
                } catch {
                    return true;
                }
            });

            setLocalStorage('favoriteMovies', updatedFavs);
            showNotification('Movie removed from favorites');
            renderFavoriteMovies();
        } catch (error) {
            console.error('Error removing movie from favorites:', error);
            showNotification('Error removing movie from favorites');
        }
    });
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
