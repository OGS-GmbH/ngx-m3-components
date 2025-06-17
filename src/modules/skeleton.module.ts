import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonComponent } from "../components/skeleton/skeleton.component";

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
