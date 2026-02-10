import { AfterViewInit, Directive, ElementRef, inject, input, OnDestroy, Renderer2, Signal } from "@angular/core";
import { ToggleComponent } from "../../public-api";

@Directive({
  selector: "ogs-m3-toggle[ogsElementRefTrigger]"
})
export class ElementRefToggleTriggerDirective implements AfterViewInit, OnDestroy {
  private _renderer2: Renderer2 = inject(Renderer2);

  private _toggleRef: ToggleComponent = inject(ToggleComponent);

  private _unlistener: (() => void) | null = null;
  
  public readonly trigger: Signal<ElementRef<HTMLElement>> = input.required<ElementRef<HTMLElement>>()

  public readonly triggerEvent: Signal<string> = input<string>("click");

  public ngAfterViewInit (): void {
    this._unlistener = this._renderer2.listen(this.trigger().nativeElement, this.triggerEvent(), () => this._toggleRef.toggle());
  }

  public ngOnDestroy (): void {
    this._unlistener?.();
  }
}
