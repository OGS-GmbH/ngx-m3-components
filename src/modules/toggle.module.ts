import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ToggleComponent } from "../components/toggle/toggle.component";
import { ToggleChildComponent } from "../components/toggle/components/toggle-child.component";

/* eslint-disable @tseslint/no-extraneous-class */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ToggleComponent,
    ToggleChildComponent
  ],
  exports: [
    ToggleComponent,
    ToggleChildComponent
  ]
})
export class ToggleModule {}
/* eslint-enable @tseslint/no-extraneous-class */
