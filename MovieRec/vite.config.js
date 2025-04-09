import { resolve } from "path";
import { defineConfig } from 'vite'
export default defineConfig({
    plugins: [
        require("@tailwindcss/postcss")(),
    ],

    root: "src/",

    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                trending: resolve(__dirname, "src/trending/index.html"),
                movie: resolve(__dirname, "src/movie/index.html"),
                // checkout: resolve(__dirname, "src/checkout/index.html"),
                // product: resolve(__dirname, "src/product_pages/index.html"),
                // productlisting: resolve(__dirname, "src/product_listing/index.html"),
                // wishlist: resolve(__dirname, "src/wish_list/index.html"),
            },
        },
    },
});