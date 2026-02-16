import { AfterViewInit, Directive, inject, input, InputSignal, OnDestroy } from "@angular/core";
import { ToggleComponent } from "../../public-api";
import { MatRadioChange, MatRadioGroup } from "@angular/material/radio";
import { Subscription } from "rxjs";

/**
 * Directive that enables toggling of a "MatRadioGroup" selection using an
 * external trigger element (e.g. a button, icon, or custom UI control).
 * @category Directives
 *
 * @since 1.1.0
 * @author Simon Kovtyk
 */
@Directive({
  selector: "ogs-m3-toggle[ogsMatRadioGroupTrigger]"
})
export class MatRadioGroupRefToggleTriggerDirective implements AfterViewInit, OnDestroy {
  private _toggleRef: ToggleComponent = inject(ToggleComponent);

  private _changeSubscription: Subscription | null = null;

  /** The target "MatRadioGroup" controlled by this trigger. Required. */
  public readonly trigger: InputSignal<MatRadioGroup> = input.required<MatRadioGroup>();

  public ngAfterViewInit (): void {
    this._changeSubscription = this.trigger().change.subscribe((matRadioChange: MatRadioChange): void => {
      this._toggleRef.showName(matRadioChange.value as string);
    });
  }

  public ngOnDestroy (): void {
    this._changeSubscription?.unsubscribe();
  }
}
