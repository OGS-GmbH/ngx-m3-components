import { ICON_DEFAULT_PREFIX_TOKEN } from "../public-api";
import { IconPrefix } from "@fortawesome/fontawesome-common-types";
import { ValueProvider } from "@angular/core";

/**
 * Factory function to create a provider that sets the global default icon prefix.
 * This allows configuring a default prefix for all icons via Angular's DI system.
 * @category Providers
 * @readonly
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const provideIconDefaultPrefix = (prefix: IconPrefix): ValueProvider => ({
  provide: ICON_DEFAULT_PREFIX_TOKEN,
  useValue: prefix
});

