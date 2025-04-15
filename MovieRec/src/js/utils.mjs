// Mobile menu toggle and dark mode functionality
// Theme configuration
const switchTheme = () => {

    // Get root Element and data-theme value
    const rootElem = document.documentElement;
    const themeIcon = document.querySelector('#theme-toggle');
    let dataTheme = rootElem.getAttribute('data-theme'),
        newTheme;

    newTheme = (dataTheme === 'dark') ? 'light' : 'dark';

    // Set the new H
    rootElem.setAttribute('data-theme', newTheme);
};

// Toggles the mobile menu visibility
function toggleMenu() {
    const menuBtn = document.querySelector("#menu-toggle"); // Get the menu toggle button
    const menuLinks = document.querySelector('.nav-links'); // Get the navigation links container

    console.log("menuBtn:", menuBtn); // Debugging: Log the menu button element
    menuBtn.addEventListener('click', () => {
        menuLinks.classList.toggle("open"); // Toggle the "hidden" class on the navigation links
        menuBtn.classList.toggle('open'); // Toggle the "open" class on the menu button
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
}

// Generates and renders movie cards based on the provided data
export function cardTemplate(data, selector) {
    selector.innerHTML = data.map((movie) => `
    <div class="movie-card">
        <a href="/movie/?id=${movie.id}">
            <img src="${IMAGE_BASE_URL}${movie.poster_path}"
                alt="${movie.title ? movie.title : movie.name}"
                class="movie-poster"
                onerror="this.src='https://placehold.co/300x450?text=Poster+Not+Available'">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title ? movie.title : movie.name}</h3>
                <p class="movie-rating">⭐ ${movie.vote_average === undefined ? "" : movie.vote_average.toFixed(1)}</p>
            </div>
        </a>
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

