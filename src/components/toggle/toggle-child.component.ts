import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, InputSignal, OnDestroy, Signal, TemplateRef, viewChild } from "@angular/core";

@Component({
  selector: "ogs-m3-toggle-child",
  templateUrl: "./toggle-child.component.html",
  styleUrl: "toggle-child.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleChildComponent implements OnDestroy {
  public readonly name: InputSignal<string | undefined> = input<string | undefined>();

  public readonly templateRef: Signal<TemplateRef<unknown>> = viewChild.required(TemplateRef);

  public destroyRef: DestroyRef = inject(DestroyRef);

  private _destroyHandlers: Array<() => void> | null = null;

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
