import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ToggleComponent } from "../components/toggle/toggle.component";
import { ToggleChildComponent } from "../components/toggle/toggle-child.component";
import { ElementRefToggleTriggerDirective, MatRadioGroupRefToggleTriggerDirective, NativeRefToggleTriggerDirective } from "../public-api";

/**
 * ToggleModule is a module providing the ToggleComponent and its related features.
 * @category Modules
 *
 * @since 1.1.0
 * @author Simon Kovtyk
 */
/* eslint-disable @tseslint/no-extraneous-class */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ToggleComponent,
    ToggleChildComponent,
    ElementRefToggleTriggerDirective,
    MatRadioGroupRefToggleTriggerDirective,
    NativeRefToggleTriggerDirective
  ],
  exports: [
    ToggleComponent,
    ToggleChildComponent,
    ElementRefToggleTriggerDirective,
    MatRadioGroupRefToggleTriggerDirective,
    NativeRefToggleTriggerDirective
  ]
})
export class ToggleModule {}
/* eslint-enable @tseslint/no-extraneous-class */
