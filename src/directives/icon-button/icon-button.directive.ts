import { Directive } from "@angular/core";

/* eslint-disable @tseslint/no-extraneous-class */
@Directive({
  selector: "button[mat-button][ogs-m3-icon-button],button[mat-flat-button][ogs-m3-icon-button]",
  host: {
    "[class.ogs-m3-icon-button]": "true"
  }
})
export class IconButtonDirective {}
/* eslint-enable @tseslint/no-extraneous-class */
