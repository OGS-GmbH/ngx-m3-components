import { AfterViewInit, Directive, ElementRef, inject, Input, OnDestroy, Renderer2 } from "@angular/core";
import { ToggleComponent } from "../../public-api";

@Directive({
  selector: "ogs-m3-toggle[elementRefTrigger]"
})
export class ElementRefToggleTriggerDirective implements AfterViewInit, OnDestroy {
  private _renderer2: Renderer2 = inject(Renderer2);

  private _toggleRef: ToggleComponent = inject(ToggleComponent);

  private _unlistener: (() => void) | null = null;

  @Input({ required: true })
  public trigger!: ElementRef<HTMLElement>;

  @Input({ required: false })
  public triggerEvent: string = "click";

  public ngAfterViewInit (): void {
    this._unlistener = this._renderer2.listen(this.trigger.nativeElement, this.triggerEvent, () => this._toggleRef.toggle());
  }

  public ngOnDestroy (): void {
    this._unlistener?.();
  }
}
