import { AfterViewInit, Directive, ElementRef, Host, Renderer2, inject } from "@angular/core";

/**
 * Marks an element as part of a radio-style badge group.
 * Typically used to visually indicate selection state and allow only one item in the group to be active at a time.
 * @category Directives
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
@Directive({
  selector: "mat-radio-button[ogsM3RadioBadge]"
})
export class RadioBadgeDirective implements AfterViewInit {
  @Host()
  private readonly _elementRef: ElementRef = inject(ElementRef);

  private readonly _renderer2: Renderer2 = inject(Renderer2);

  public ngAfterViewInit (): void {
    this._renderer2.addClass(this._elementRef.nativeElement, "ogs-m3-radio-badge");
  }
}

