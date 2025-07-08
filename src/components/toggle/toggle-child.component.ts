import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnDestroy, TemplateRef, ViewChild } from "@angular/core";

@Component({
  selector: "ogs-m3-toggle-child",
  templateUrl: "toggle-child.component.html",
  styleUrl: "toggle-child.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleChildComponent implements OnDestroy {
  @Input({ required: false })
  public name?: string;

  @ViewChild(TemplateRef)
  public templateRef!: TemplateRef<unknown>;

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
