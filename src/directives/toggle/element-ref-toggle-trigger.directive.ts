import { AfterViewInit, Directive, ElementRef, inject, Input, OnDestroy, Renderer2 } from "@angular/core";
import { ToggleComponent } from "../../public-api";

/**
 * Marks an element as a trigger for a toggle component using its ElementRef.
 * Typically used to detect clicks or interactions on the element and notify the associated toggle to change state.
 *
 * @remarks
 * Works as a lightweight directive to bind UI elements to toggle behavior.
 * @category Directives
 *
 * @since 1.1.0
 * @author Simon Kovtyk
 */
@Directive({
  selector: "ogs-m3-toggle[elementRefTrigger]"
})
export class ElementRefToggleTriggerDirective implements AfterViewInit, OnDestroy {
  private _renderer2: Renderer2 = inject(Renderer2);

  private _toggleRef: ToggleComponent = inject(ToggleComponent);

  private _unlistener: (() => void) | null = null;

  /** The required element that will act as the trigger for the toggle. */
  @Input({ required: true })
  public trigger!: ElementRef<HTMLElement>;

  /** The event type that triggers the toggle (default is "click"). */
  @Input({ required: false })
  public triggerEvent: string = "click";

  public ngAfterViewInit (): void {
    this._unlistener = this._renderer2.listen(this.trigger.nativeElement, this.triggerEvent, () => this._toggleRef.toggle());
  }

  public ngOnDestroy (): void {
    this._unlistener?.();
  }
}
