import { Directive } from "@angular/core";

/* eslint-disable @tseslint/no-extraneous-class */
@Directive({
  selector: "button[ogs-m3-icon-button],button[ogs-m3-icon-button]",
  host: {
    "[class.ogs-m3-icon-button]": "true"
  }
})
export class IconButtonDirective {}
/* eslint-enable @tseslint/no-extraneous-class */
