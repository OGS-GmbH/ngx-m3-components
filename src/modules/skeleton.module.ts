import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonComponent } from "../components/skeleton/skeleton.component";

/**
 * SkeletonModule is a module providing the SkeletonComponent.
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
    SkeletonComponent
  ],
  exports: [
    SkeletonComponent
  ]
})
export class SkeletonModule {}
/* eslint-enable @tseslint/no-extraneous-class */
