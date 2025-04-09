// import loadAlerts from "./alert.mjs";
import TailwindUtils, { cardTemplate } from "./utils.mjs";

// tailwindConfig();
// loadHeaderFooter();

// loadAlerts();

const tailwiindcss = new TailwindUtils();

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    tailwiindcss.initTheme();
    // initTheme();
    document
        .getElementById("theme-toggle")
        .addEventListener("click", tailwiindcss.toggleDarkMode);
    document
        .querySelector('#mobile-menu-btn')
        .addEventListener("click", tailwiindcss.toggleMobileMenu);
});


async function loadMovies() {
    const moviesGrid = document.querySelector('.grid');

    try {
        const url = '../json/movies.json';
        const response = await fetch(url);
        const data = await response.json();

        cardTemplate(data.movies, document.querySelector("#moviesGrid"));
    } catch (error) {
        console.error('Error loading movies:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadMovies);