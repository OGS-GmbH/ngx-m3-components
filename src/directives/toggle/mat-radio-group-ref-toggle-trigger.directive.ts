import { AfterViewInit, Directive, inject, Input, OnDestroy } from "@angular/core";
import { ToggleComponent } from "../../public-api";
import { MatRadioChange, MatRadioGroup } from "@angular/material/radio";
import { Subscription } from "rxjs";

@Directive({
  selector: "ogs-m3-toggle[matRadioGroupTrigger]"
})
export class MatRadioGroupRefToggleTriggerDirective implements AfterViewInit, OnDestroy {
  private _toggleRef: ToggleComponent = inject(ToggleComponent);

  private _changeSubscription: Subscription | null = null;

  @Input({ required: true })
  public trigger!: MatRadioGroup;

  public ngAfterViewInit (): void {
    this._changeSubscription = this.trigger.change.subscribe((matRadioChange: MatRadioChange): void => {
      this._toggleRef.showName(matRadioChange.value as string);
    });
  }

  public ngOnDestroy (): void {
    this._changeSubscription?.unsubscribe();
  }
}
