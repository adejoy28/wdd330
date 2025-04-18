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
    // const currentPath = window.location.pathname.replace(/\/$/, '').split('#')[0];
    const currentPath = urlPath[0] || '';
    // console.log(currentPath);
    navLinks.forEach(navLink => {
        navLink.classList.remove('active');
        if (pageName.toLowerCase() === navLink.textContent.trim().toLowerCase()) {
            navLink.classList.add('active');
        }
    });

    // console.log(`You are on the ${pageName} page`);
    // Add any specific logic for the index page here

    // navLinks.forEach(navLink => {
    //     navLink.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         moodButtons.forEach(btn => btn.classList.remove('active'));
    //         button.classList.add('active');
    //         console.log(navLink);
    //     })
    // });


}

// Base URL for movie images
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Retrieves a query parameter value from the URL
export function getParam(param) {
    const queryString = window.location.search; // Get the query string from the URL
    const urlParams = new URLSearchParams(queryString); // Parse the query string
    return urlParams.get(param); // Return the value of the specified parameter
}

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
    console.log(favBtns);
    favBtns.forEach(favBtn => {
        favBtn.addEventListener('click', (e) => {
            // alert(2);
            // e.preventDefault();
            // addToFavList(favBtn);
            const j = favBtn.getAttribute('data-movieDetails');
            // if (getLocalStorage('favoriteMovies') >= 0) {
            const favs = getLocalStorage('favoriteMovies') || [];
            console.log(favs);
            if (!favs.includes(j)) {
                favs.push(j);
                console.log(favs);
                showNotification('Movies added to Favourites')
            } else {
                showNotification('Movies already added to Favourites')
            }
            setLocalStorage('favoriteMovies', favs);
        });
    });
}


// Generates and renders movie cards based on the provided data
export function cardTemplateRev(data, selector) {
    // console.log(typeof data);
    selector.innerHTML = data.forEach(movie => {

    });

    selector.innerHTML = data.map((movie) => {
        const parsedMovie = typeof movie === 'string' ? JSON.parse(movie) : movie;
        return `<div class="movie-card">
            <a href="/movie/?id=${parsedMovie.id}">
                <img src="${IMAGE_BASE_URL}${parsedMovie.poster_path}"
                alt="${parsedMovie.title ? parsedMovie.title : parsedMovie.name}"
                    class="movie-poster"
                    onerror="this.src='https://placehold.co/300x450?text=${parsedMovie.title ? parsedMovie.title : parsedMovie.name}'">
                <div class="movie-info">
                    <h3 class="movie-title">${parsedMovie.title ? parsedMovie.title : parsedMovie.name}</h3>
                    <p class="movie-rating">⭐ ${parsedMovie.vote_average === undefined ? "" : parsedMovie.vote_average.toFixed(1)}</p>
                </div>
            </a>
            <button id="remFavBtn"
                class="fav-btn" data-movieDetails='${JSON.stringify(movie).replaceAll(/'/g, '&#39;')}'>
                <i class="fas fa-minus text-white text-sm"></i>
            </button>
        </div>`;
    }).join(''); // Map the data to HTML and join it into a single string
}

export function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

// Generates and renders movie cards based on the provided data
export function cardTemplate(data, selector) {
    selector.innerHTML = data.map((movie) => `
    <div class="movie-card">
        <a href="/movie/?id=${movie.id}">
            <img src="${IMAGE_BASE_URL}${movie.poster_path}"
                alt="${movie.title ? movie.title : movie.name}"
                class="movie-poster"
                onerror="this.src='https://placehold.co/300x450?text=${movie.title ? movie.title : movie.name}'">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title ? movie.title : movie.name}</h3>
                <p class="movie-rating">⭐ ${movie.vote_average === undefined ? "" : movie.vote_average.toFixed(1)}</p>
            </div>
        </a>
        <button id="favBtn"
            class="fav-btn" data-movieDetails='${JSON.stringify(movie)}'>
            <i class="fas fa-plus text-white text-sm"></i>
        </button>
    </div>`).join(''); // Map the data to HTML and join it into a single string
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
export function pagination(cP, tP, cST) {
    // State management
    let currentPage = cP || 1;
    let totalPages = tP || 1;
    let isSearching = false;
    let currentSearchTerm = cST || '';

    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');

    currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Pagination button handlers
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            isSearching ?
                fetchSearchMovies(currentSearchTerm, newPage) :
                fetchPopularMovies(newPage);
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            isSearching ?
                fetchSearchMovies(currentSearchTerm, newPage) :
                fetchPopularMovies(newPage);
        }
    });

}