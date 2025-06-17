import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconButtonDirective } from "../directives/icon-button/icon-button.directive";

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
