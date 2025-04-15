// const appendedURL = "https://api.themoviedb.org/3/";
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

import { formatDate, formatRuntime, formatCurrency } from "./utils.mjs";


export default class MovieDetails {
    constructor(movieId, datasource) {
        this.movieId = movieId;
        this.datasource = datasource;
        this.movie = {};
    }
    async init() {
        this.movie = await this.datasource.getData(`movie/${this.movieId}`);
        // console.log(this.movie);
        this.renderMovieHeader('.movie-header');
        this.renderMovieContent('.section');
    }

    renderMovieHeader(selector) {
        const sectionMovieHeader = document.querySelector(selector); //linear - gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url('8eifdha9GQeZAkexgtD45546XKx.jpg')

        // if (this.movie.backdrop_path)

        sectionMovieHeader.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/w1280/${this.movie.backdrop_path || this.movie.poster_path})`;
        sectionMovieHeader.style.backgroundSize = "cover";
        sectionMovieHeader.style.backgroundPosition = "center";

        const divHeader = `
        <div class="header-content ">
                    <div class="movie-poster">
                        <img src="${IMAGE_BASE_URL + this.movie.poster_path}" alt="Movie Poster">
                    </div>
                    <div class="movie-info">
                        <h1 class="movie-title">${this.movie.original_title}</h1>
                        <p class="tagline">${this.movie.tagline}</p>
                        <div class="metadata">
                            <span class="metadata-item rating">⭐ ${this.movie.vote_average.toFixed(1)}</span>
                            <span class="metadata-item">⌛ ${formatRuntime(this.movie.runtime)}</span>
                            <span class="metadata-item">📅 ${formatDate(this.movie.release_date)}</span>
                            <span class="metadata-item status">${this.movie.status}</span>
                        </div>
                        <a href="https://www.imdb.com/title/${this.movie.imdb_id}/" class="button" target="_blank">View on IMDB</a>
                        <a href="${this.movie.homepage}" class="button"
                            target="_blank">Official Website</a>
                    </div>
                </div>`;

        sectionMovieHeader.insertAdjacentHTML("afterbegin", divHeader);
    }

    renderMovieContent(selector) {
        const sectionMovieContent = document.querySelector(selector);
        const sectionContent = `
                <h2 class="section-title">Overview</h2>
                <p class="overview">${this.movie.overview}</p>

                <div class="details-grid">
                    <div class="detail-item">
                        <h3>Genres</h3>
                        <ul class="genre-list">
                            ${this.movie.genres.map(genre => `<li class="genre">${genre.name}</li>`).join('')}
                        </ul >
                    </div >

                    <div class="detail-item">
                        <h3>Production Companies</h3>
                        <div class="production-companies">
                        <div class="production-company" style="display:flex; flex-wrap:wrap;">
             ${this.movie.production_companies.map(company => company.logo_path ? `
                     <img src="https://image.tmdb.org/t/p/h60/${company.logo_path}"
                         alt="${company.name}" class="company-logo">
                         ` : '').join('')}
                         </div>
                         <!-- <div class="production-company">
                         <span>Kevin Feige Productions</span>
                            </div> -->
                        </div>
                    </div>

                    <div class="detail-item">
                        <h3>Financials</h3>
                        <p>Budget: ${formatCurrency(this.movie.budget)}</p>
                        <p>Revenue: ${formatCurrency(this.movie.revenue)}</p>
                    </div>

                    <div class="detail-item">
                        <h3>Languages</h3>
                        <ul class="language-list">
                         ${this.movie.spoken_languages.map(language => `<li class="language">${language.name}</li>`).join('')}
                        </ul>
                    </div>
                </div > `;

        sectionMovieContent.insertAdjacentHTML("afterbegin", sectionContent);

    }

    renderMovieTrailer(movieData) {
        // Add trailer section if available
        if (movieData.trailer_link) {
            const trailerSection = document.createElement('section');
            trailerSection.className = 'section trailer-section';
            trailerSection.innerHTML = `
            < h2 class="section-title" > Official Trailer</h2 >
                <div class="trailer-container">
                    <iframe class="trailer-iframe" src="${movieData.trailer_link}" allowfullscreen></iframe>
                </div>
        `;
            document.querySelector('main').appendChild(trailerSection);
        }

        // < !--Trailer Section(Would be populated if trailer link exists)-->
        //     < !-- < section class="section trailer-section" >
        //     <h2 class="section-title">Official Trailer</h2>
        //     <div class="trailer-container">
        //         <iframe class="trailer-iframe" src="YOUTUBE_EMBED_LINK" allowfullscreen></iframe>
        //     </div>
        // </section > -->
    }

}

