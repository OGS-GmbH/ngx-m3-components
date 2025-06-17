export default {
  "*.{ts,js,mjs,cjs}": "eslint",
  "*.{css,scss}": "stylelint",
  "package.json": "npmPkgJsonLint -c ./node_modules/@ogs-gmbh/linter/package-json-open-source.rules.json"
};

