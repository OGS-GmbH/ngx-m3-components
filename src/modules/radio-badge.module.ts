import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RadioBadgeDirective } from "../public-api";

/**
 * RadioBadgeModule is a module providing the RadioBadgeDirective.
 * @category Modules
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
/* eslint-disable @tseslint/no-extraneous-class */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RadioBadgeDirective
  ],
  exports: [
    RadioBadgeDirective
  ]
})
export class RadioBadgeModule {}
/* eslint-enable @tseslint/no-extraneous-class */
