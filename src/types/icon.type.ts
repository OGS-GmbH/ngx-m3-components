import { IconPrefix } from "@fortawesome/fontawesome-common-types";

/**
 * Configuration options for the "IconComponent".
 * @category Interfaces
 * @interface
 *
 * @since 1.1.0
 * @author Simon Kovtyk
 */
export interface IconConfiguration {
  /**
   * The FontAwesome style/weight prefix for the icon.
   * Allowed values: "fas" – solid, "far" – regular, "fal" – light, "fat" – thin and few more according to IconPrefix.
   * This determines which FontAwesome icon style to use.
   */
  prefix: IconPrefix;
}
