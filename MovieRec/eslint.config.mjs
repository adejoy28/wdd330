import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";


// import { defineConfig } from "eslint/config";
// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
//   tseslint.configs.recommended,
// ]);

export default [
  {
    // JavaScript configuration
    files: ["**/*.js"],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    // TypeScript configuration
    files: ["**/*.ts"],
    ...tseslint.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    // Common rules for all files
    files: ["**/*.{js,ts}"],
    rules: {
      // Add your custom rules here
    }
  }
];