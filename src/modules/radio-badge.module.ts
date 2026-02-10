import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RadioBadgeDirective } from "../public-api";

/* eslint-disable @tseslint/no-extraneous-class */
@NgModule({
  imports: [
    CommonModule,
    RadioBadgeDirective
  ],
  exports: [
    RadioBadgeDirective
  ]
})
export class RadioBadgeModule {}
/* eslint-enable @tseslint/no-extraneous-class */

