import { SCSS_RULES_PRESET } from "@ogs-gmbh/linter";

export default {
  plugins: [ "stylelint-scss" ],
  rules: SCSS_RULES_PRESET,
  ignoreFiles: [
    ".angular/**/*",
    ".git/**/*",
    ".husky/**/*",
    ".idea/**/*",
    "node_modules/**/*",
    "dist/**/*"
  ]
};

