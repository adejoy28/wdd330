// Mobile menu toggle
export default class TailwindUtils {
    constructor() {
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
    }
    toggleMobileMenu() {
        const menu = document.getElementById("mobile-menu");
        menu.classList.toggle("hidden");
        const btn = document.querySelector('[aria-controls="mobile-menu"]');
        btn.setAttribute("aria-expanded", !btn.getAttribute("aria-expanded"));
    }

    toggleDarkMode() {
        const html = document.documentElement;
        html.classList.toggle("dark");
        const isDark = html.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        this.updateThemeButton(isDark);
    }

    updateThemeButton(isDark) {
        const themeBtn = document.getElementById("theme-toggle");
        themeBtn.innerHTML = isDark ? "🌞" : "🌙";
        themeBtn.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }

    initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.classList.toggle(
            "dark",
            savedTheme === "dark"
        );
        this.updateThemeButton(savedTheme === "dark");
    }
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';


export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}



export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}

export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export async function loadHeaderFooter() {
    const headerElement = document.querySelector("#main-header");
    const headerPartial = await loadTemplate("../partials/header.html");
    renderWithTemplate(headerPartial, headerElement);

    const footerElement = document.querySelector("#main-footer");
    const footerPartial = await loadTemplate("../partials/footer.html");
    renderWithTemplate(footerPartial, footerElement);
}


export function cardTemplate(data, selector) {
    selector.innerHTML = data.map((movie) => `
    <div class="movie-card">
    <a href="/movie/?id=${movie.id}">
        <img src="${IMAGE_BASE_URL}${movie.poster_path}"
            alt="${movie.title ? movie.title : movie.name}"
            class="movie-poster"
            onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Not+Available'">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title ? movie.title : movie.name}</h3>
                <p class="movie-rating">⭐ ${movie.vote_average.toFixed(1)}</p>
                </div>
                </a>
                </div>`
    ).join('');
}
// <div class="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:-translate-y-2 animate-float"
//      style="animation-delay: ${index * 0.1}s">
//      <a href="">
//   <div class="relative aspect-[2/3]">
//     <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
//          alt="${movie.name}"
//          class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70" />
//     <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
//       <div>
//         <h3 class="font-bold text-white">${movie.name}</h3>
//         <div class="flex items-center text-sm text-gray-300 mt-1">
//           <span class="text-yellow-400 mr-1">
//             <i class="fas fa-star"></i> ${movie.vote_average}
//           </span>
//           <span class="mx-2">•</span>
//           <span>${movie.first_air_date}</span>
//         </div>
//     </div>
//     </div>
//   </div>
//   <button class="absolute top-3 right-3 bg-gray-900 bg-opacity-60 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-pink-500">
//     <i class="fas fa-plus text-white text-sm"></i>
//   </button>
//   </a>
// </div>`


// Utility functions
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(amount);
};

export const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
};

export const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
};
