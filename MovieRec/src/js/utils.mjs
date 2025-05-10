// Theme configuration for Dark Mode functionality
const switchTheme = () => {
    // Get root Element and data-theme value
    const rootElem = document.documentElement;
    const themeIcon = document.querySelector('#theme-toggle');
    let dataTheme = rootElem.getAttribute('data-theme'),
        newTheme;

    newTheme = (dataTheme === 'dark') ? 'light' : 'dark';

    rootElem.setAttribute('data-theme', newTheme);
};

// Toggles the mobile menu visibility
function toggleMenu() {
    const menuLinks = document.querySelector('.nav-links'); // Get the navigation links container
    const menuBtn = document.querySelector("#menu-toggle"); // Get the menu toggle button

    menuBtn.addEventListener('click', () => {
        menuLinks.classList.toggle("open"); // Toggle the "hidden" class on the navigation links
        menuBtn.classList.toggle('open'); // Toggle the "open" class on the menu button
    });
}

// Implements wayfinding in the navigation
function wayFinderImplementation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageName = document.querySelector('#main-header').getAttribute('data-pageName');
    const urlPath = window.location.pathname.replace(/\/$/, '').split('/').filter(Boolean);
    const currentPath = urlPath[0] || '';

    navLinks.forEach(navLink => {
        navLink.classList.remove('active');
        if (pageName.toLowerCase() === navLink.textContent.trim().toLowerCase()) {
            navLink.classList.add('active');
        }
    });
}

// Base URL for movie images
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Retrieves a query parameter value from the URL
export function getParam(param) {
    const queryString = window.location.search; // Get the query string from the URL
    const urlParams = new URLSearchParams(queryString); // Parse the query string
    return urlParams.get(param); // Return the value of the specified parameter
}

// Append query parameter cvalues to the URL
export const appendParams = (url, params) => {
    const queryString = new URLSearchParams(params).toString();
    return `${url}?${queryString}`;
};


// retrieve data from localstorage
export function getLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error parsing local storage data:', error);
        return null;
    }
}

// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Renders a template into a parent element and optionally executes a callback
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template; // Set the inner HTML of the parent element
    if (callback) {
        callback(data); // Execute the callback if provided
    }
}

// Loads an HTML template from a given path
export async function loadTemplate(path) {
    const res = await fetch(path); // Fetch the template file
    const template = await res.text(); // Get the template content as text
    return template; // Return the template content
}

// Loads and renders the header and footer partials
export async function loadHeaderFooter() {
    const headerElement = document.querySelector("#main-header"); // Get the header element
    const headerPartial = await loadTemplate("../partials/header.html"); // Load the header template
    renderWithTemplate(headerPartial, headerElement); // Render the header template

    const footerElement = document.querySelector("#main-footer"); // Get the footer element
    const footerPartial = await loadTemplate("../partials/footer.html"); // Load the footer template
    renderWithTemplate(footerPartial, footerElement); // Render the footer template

    toggleMenu(); // Initialize the mobile menu toggle functionality

    const themeToggleBtn = document.querySelector('#theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        switchTheme();
        themeToggleBtn.classList.toggle('open');
    });
    wayFinderImplementation();


    // data-movieDetails
}

// Respond to the favBtns to add movies to the localStorage
export async function addToFavList() {
    const favBtns = document.querySelectorAll('.fav-btn');

    favBtns.forEach(favBtn => {
        favBtn.addEventListener('click', (e) => {
            const movieDetails = favBtn.getAttribute('data-movieDetails');
            const favs = getLocalStorage('favoriteMovies') || [];

            if (!favs.includes(movieDetails)) {
                favs.push(movieDetails);
                showNotification('Movie added to Favorites');
            } else {
                showNotification('Movie already in Favorites');
            }
            setLocalStorage('favoriteMovies', favs);
        });
    });
}

// Sanitize HTML strings to prevent XSS
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Generates and renders movie cards based on the provided data
export function cardTemplate(data, selector) {
    if (!Array.isArray(data)) {
        console.error('Invalid data provided to cardTemplate');
        return;
    }

    selector.innerHTML = data.map((movie) => {
        const title = movie.title || movie.name || 'Unknown Title';
        const posterPath = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` :
            `https://placehold.co/300x450?text=${encodeURIComponent(title)}`;
        const rating = movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : '';
        const movieData = JSON.stringify(movie).replace(/'/g, '&#39;');

        return `
        <div class="movie-card">
            <a href="/movie/?id=${movie.id}">
                <img src="${sanitizeHTML(posterPath)}"
                    alt="${sanitizeHTML(title)}"
                    class="movie-poster"
                    onerror="this.src='https://placehold.co/300x450?text=${encodeURIComponent(title)}'">
                <div class="movie-info">
                    <h3 class="movie-title">${sanitizeHTML(title)}</h3>
                    <p class="movie-rating">⭐ ${rating}</p>
                </div>
            </a>
            <button id="favBtn"
                class="fav-btn" data-movieDetails='${movieData}'>
                <i class="fas fa-plus text-white text-sm"></i>
            </button>
        </div>`;
    }).join('');
}

export function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

// To format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(amount); // Format the amount as USD currency
};

// To format runtime in hours and minutes
export const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60); // Calculate hours
    const remainingMinutes = minutes % 60; // Calculate remaining minutes
    return `${hours}h ${remainingMinutes}m`; // Return formatted runtime
};

// To format a date string
export const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options); // Format the date
};

// To paginate web pages with more content pages
export class Pagination {
    constructor(currentPage = 1, totalPages = 1, currentSearchTerm = '', fetchMovies) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.currentSearchTerm = currentSearchTerm;
        this.fetchMovies = fetchMovies;
        this.isSearching = false;

        this.prevButton = document.getElementById('prevPage');
        this.nextButton = document.getElementById('nextPage');
        this.currentPageSpan = document.getElementById('currentPage');
    }

    init() {
        this.updateUI();
        this.addEventListeners();
    }

    updateUI() {
        if (!this.currentPageSpan || !this.prevButton || !this.nextButton) {
            console.error('Pagination elements not found');
            return;
        }

        this.currentPageSpan.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
        this.prevButton.disabled = this.currentPage === 1;
        this.nextButton.disabled = this.currentPage === this.totalPages;
    }

    addEventListeners() {
        if (!this.prevButton || !this.nextButton) {
            console.error('Pagination buttons not found');
            return;
        }

        this.prevButton.addEventListener('click', () => this.goToPreviousPage());
        this.nextButton.addEventListener('click', () => this.goToNextPage());
    }

    goToPreviousPage() {
        if (this.currentPage > 1) {
            const newPage = this.currentPage - 1;
            this.currentPage = newPage;
            this.fetchMovies(newPage);
        }
    }

    goToNextPage() {
        if (this.currentPage < this.totalPages) {
            const newPage = this.currentPage + 1;
            this.currentPage = newPage;
            this.fetchMovies(newPage);
        }
    }
}