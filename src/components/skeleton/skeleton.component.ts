import { ChangeDetectionStrategy, Component } from "@angular/core";

/**
 * Represents a visual placeholder shown while content is loading.
 *
 * @category Components
 *
 * @example
 * ```typescript
 * import { SkeletonComponent } from "@ogs-gmbh/ngx-m3-components";
 * ```
 * @example
 * ```html
 * <ogs-m3-skeleton />
 * ```
 * @since 1.0.0
 * @author Simon Kovtyk
 */
/* eslint-disable @tseslint/no-extraneous-class */
@Component({
  selector: "ogs-m3-skeleton",
  templateUrl: "./skeleton.component.html",
  styleUrl: "./skeleton.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {}
/* eslint-enable @tseslint/no-extraneous-class */
