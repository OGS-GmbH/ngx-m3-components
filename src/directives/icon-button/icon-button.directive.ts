import { Directive } from "@angular/core";

/**
 * Directive that applies standardized styling for icon buttons.
 * Ensures consistent alignment of the icon and text inside the host button.
 * @remarks
 * This directive provides layout-related CSS, contains no runtime logic.
 * @category Directives
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
/* eslint-disable @tseslint/no-extraneous-class */
@Directive({
  selector: "button[ogs-m3-icon-button],button[ogs-m3-icon-button]",
  host: {
    "[class.ogs-m3-icon-button]": "true"
  }
})
export class IconButtonDirective {}
/* eslint-enable @tseslint/no-extraneous-class */
