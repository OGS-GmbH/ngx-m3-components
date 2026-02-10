import { Directive, inject, input, InputSignal, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { ToggleComponent } from "../../public-api";

@Directive({
  selector: "ogs-m3-toggle[ogsNativeRefTrigger]"
})
export class NativeRefToggleTriggerDirective implements OnInit, OnDestroy {
  private _renderer2: Renderer2 = inject(Renderer2);

  private _toggleRef: ToggleComponent = inject(ToggleComponent);

  private _unlistener: (() => void) | null = null;

  public readonly trigger: InputSignal<HTMLElement> = input.required<HTMLElement>();

  public readonly triggerEvent: InputSignal<string> = input<string>("click");

  public ngOnInit (): void {
    this._unlistener = this._renderer2.listen(this.trigger(), this.triggerEvent(), () => this._toggleRef.toggle());
  }

  public ngOnDestroy (): void {
    this._unlistener?.();
  }
}
