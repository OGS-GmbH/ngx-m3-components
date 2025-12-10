import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { OtpInputComponent } from "../components/otp-input/otp-input.component";

/**
 * OtpInputModule is a module providing the OtpInputComponent.
 * @category Modules
 *
 * @since 1.3.0
 * @author Simon Kovtyk
 */
@NgModule({
  imports: [
    CommonModule,
    MatInputModule
  ],
  declarations: [
    OtpInputComponent
  ],
  exports: [
    OtpInputComponent
  ]
})
// eslint-disable-next-line @tseslint/no-extraneous-class
export class OtpInputModule {}
