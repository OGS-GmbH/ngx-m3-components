import { ChangeDetectionStrategy, Component } from "@angular/core";

/* eslint-disable @tseslint/no-extraneous-class */
@Component({
  selector: "ogs-m3-skeleton",
  templateUrl: "./skeleton.component.html",
  styleUrl: "./skeleton.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {}
/* eslint-enable @tseslint/no-extraneous-class */
