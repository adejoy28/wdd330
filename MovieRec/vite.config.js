import { resolve } from "path";
import { defineConfig } from 'vite'
export default defineConfig({
    root: "src/",

    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                trending: resolve(__dirname, "src/trending/index.html"),
                movie: resolve(__dirname, "src/movie/index.html"),
                about: resolve(__dirname, "src/about.html"),
                contact: resolve(__dirname, "src/about.html"),
                genre: resolve(__dirname, "src/genres/index.html"),
                favorites: resolve(__dirname, "src/favorites/index.html"),


                // checkout: resolve(__dirname, "src/checkout/index.html"),
                // product: resolve(__dirname, "src/product_pages/index.html"),
                // productlisting: resolve(__dirname, "src/product_listing/index.html"),
                // wishlist: resolve(__dirname, "src/wish_list/index.html"),
            },
        },
    },
});