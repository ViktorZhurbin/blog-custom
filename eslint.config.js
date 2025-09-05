import js from "@eslint/js";
import globals from "globals";
import preact from "eslint-config-preact";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

/** @import { TSESLint } from '@typescript-eslint/utils' */

/** @type {TSESLint.FlatConfig.ConfigFile} */
export default defineConfig(
  [
    globalIgnores(["dist"]),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...preact,
  ],
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
);
