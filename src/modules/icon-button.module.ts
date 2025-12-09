import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconButtonDirective } from "../directives/icon-button/icon-button.directive";

/**
 * IconButtonModule is a module providing the IconButtonDirective.
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
    IconButtonDirective
  ],
  exports: [
    IconButtonDirective
  ]
})
export class IconButtonModule {}
/* eslint-enable @tseslint/no-extraneous-class */
