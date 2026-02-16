import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, InputSignal, OnDestroy, Signal, TemplateRef, viewChild } from "@angular/core";

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
  public readonly name: InputSignal<string | undefined> = input<string | undefined>();

  public readonly templateRef: Signal<TemplateRef<unknown>> = viewChild.required(TemplateRef);

  /** Reference used to clean up resources when this component is destroyed. */
  public destroyRef: DestroyRef = inject(DestroyRef);

  private _destroyHandlers: Array<() => void> | null = null;

  /**
   * Registers a callback to run when the component is destroyed
   * @param handler - The callback function to execute on component destruction
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
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
