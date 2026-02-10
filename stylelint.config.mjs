import { initSCSSLinter, scssConfig } from "@ogs/linter";
import { IGNORE_PATHS } from "./linter.config.mjs";

export default initSCSSLinter(
  scssConfig({
    ignore: IGNORE_PATHS,
    allowEmptyInput: true
  })
);
