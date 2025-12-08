import { IconPrefix } from "@fortawesome/fontawesome-common-types";
import { InjectionToken } from "@angular/core";

/**
 * Injection token used to configure the global default prefix applied to icon names.
 * @category Tokens
 * @readonly
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const ICON_DEFAULT_PREFIX_TOKEN: InjectionToken<IconPrefix> = new InjectionToken<IconPrefix>("default-icon-prefix");
