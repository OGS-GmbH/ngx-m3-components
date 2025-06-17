import { ICON_DEFAULT_PREFIX_TOKEN } from "../public-api";
import { IconPrefix } from "@fortawesome/fontawesome-common-types";
import { ValueProvider } from "@angular/core";

export const provideIconDefaultPrefix = (prefix: IconPrefix): ValueProvider => ({
  provide: ICON_DEFAULT_PREFIX_TOKEN,
  useValue: prefix
});

