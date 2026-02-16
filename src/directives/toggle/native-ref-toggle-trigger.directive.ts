import { Directive, inject, input, InputSignal, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { ToggleComponent } from "../../public-api";

/**
 * Directive that turns a host element into a toggle trigger for a target native HTML element.
 * The directive listens for a configured DOM event on the host and applies custom toggle logic to the referenced element.
 * @category Directives
 *
 * @since 1.1.0
 * @author Simon Kovtyk
 */
@Directive({
  selector: "ogs-m3-toggle[ogsNativeRefTrigger]"
})
export class NativeRefToggleTriggerDirective implements OnInit, OnDestroy {
  private _renderer2: Renderer2 = inject(Renderer2);

  private _toggleRef: ToggleComponent = inject(ToggleComponent);

  private _unlistener: (() => void) | null = null;

  /** Target native HTML element controlled by this trigger. Required. */
  public readonly trigger: InputSignal<HTMLElement> = input.required<HTMLElement>();

  /**
   * Name of the DOM event on the host element that activates the trigger.
   * @defaultValue "click"
   */
  public readonly triggerEvent: InputSignal<string> = input<string>("click");

  public ngOnInit (): void {
    this._unlistener = this._renderer2.listen(this.trigger(), this.triggerEvent(), () => this._toggleRef.toggle());
  }

  public ngOnDestroy (): void {
    this._unlistener?.();
  }
}
