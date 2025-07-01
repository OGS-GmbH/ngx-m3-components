import { Directive, inject, Input, OnDestroy, Renderer2 } from "@angular/core";
import { ToggleComponent } from "../../public-api";

@Directive({
  selector: "ogs-m3-toggle[nativeRefTrigger]"
})
export class NativeRefToggleTriggerDirective implements OnDestroy {
  private _renderer2: Renderer2 = inject(Renderer2);

  private _toggleRef: ToggleComponent = inject(ToggleComponent);

  private _unlistener: (() => void) | null = null;

  @Input({ required: true })
  public trigger!: HTMLElement;

  @Input({ required: false })
  public triggerEvent: string = "click";

  constructor () {
    this._unlistener = this._renderer2.listen(this.trigger, this.triggerEvent, () => this._toggleRef.toggle());
  }

  public ngOnDestroy (): void {
    this._unlistener?.();
  }
}
