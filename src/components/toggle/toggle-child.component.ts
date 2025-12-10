import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnDestroy, TemplateRef, ViewChild } from "@angular/core";

/**
 * Represents a single child item of a `ToggleComponent`.
 * Each child can have its own template and name, and is managed by the parent toggle component.
 *
 * @category Components
 * @remarks
 * Typically not used standalone; meant to be embedded within a `ToggleComponent`.
 *
 * @since 1.1.0
 * @author Simon Kovtyk
 */
@Component({
  selector: "ogs-m3-toggle-child",
  templateUrl: "./toggle-child.component.html",
  styleUrl: "toggle-child.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleChildComponent implements OnDestroy {
  @Input({ required: false })
  public name?: string;

  @ViewChild(TemplateRef)
  public templateRef!: TemplateRef<unknown>;

  /** Reference used to clean up resources when this component is destroyed. */
  public destroyRef: DestroyRef = inject(DestroyRef);

  private _destroyHandlers: Array<() => void> | null = null;

  /** Registers a callback to run when the component is destroyed */
  public addDestroyHandler (handler: () => void): void {
    this._destroyHandlers === null
      ? this._destroyHandlers = [ handler ]
      : this._destroyHandlers.push(handler);
  }

  public ngOnDestroy (): void {
    this._destroyHandlers?.forEach((destroyHandler: () => void): void => {
      destroyHandler();
    });
  }
}
