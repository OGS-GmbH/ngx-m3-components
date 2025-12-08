import {
  ANGULAR_TEMPLATE_RULES_PRESET,
  ESLINT_JSON_RULES,
  ESLINT_MARKDOWN_RULES,
  getAngularTsPreset,
  JS_RULES_PRESET
} from "@ogs-gmbh/linter";
import eslintJson from "@eslint/json";
import eslintMarkdown from "@eslint/markdown";
import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticPlus from "@stylistic/eslint-plugin-plus";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import angular from "angular-eslint";

export default defineConfig(
  {
    plugins: {
      "@tseslint": tseslint.plugin,
      "@unicorn": unicorn,
      "@stylistic/js": stylisticJs,
      "@stylistic/ts": stylisticTs,
      "@stylistic/plus": stylisticPlus,
      "@markdown": eslintMarkdown,
      "@json": eslintJson,
      "@angular": angular.tsPlugin,
      "@angular-template": angular.templatePlugin
    }
  },
  {
    ignores: [
      ".angular",
      ".git",
      ".husky",
      ".idea",
      "node_modules",
      "dist",
      "README.md",
      "CHANGELOG.md",
      ".vitepress/.vitepress/cache"
    ]
  },
  {
    files: [ "**/*.ts" ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parser: tseslint.parser,
      globals: { ...globals.browser },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: getAngularTsPreset({
      selectorPrefix: "ogs-m3"
    })
  },
  {
    files: [ "**/*.html" ],
    languageOptions: {
      parser: angular.templateParser
    },
    rules: ANGULAR_TEMPLATE_RULES_PRESET
  },
  {
    files: [ "**/*.js", "**/*.mjs", "**/*.cjs" ],
    rules: JS_RULES_PRESET
  },
  {
    files: [ "**/*.md" ],
    rules: ESLINT_MARKDOWN_RULES
  },
  {
    files: [ "**/*.json" ],
    language: "@json/json",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.json5" ],
    language: "@json/json5",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.jsonc" ],
    language: "@json/jsonc",
    rules: ESLINT_JSON_RULES
  }
);

