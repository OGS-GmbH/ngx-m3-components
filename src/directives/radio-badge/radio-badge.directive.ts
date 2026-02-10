import { AfterViewInit, Directive, ElementRef, Host, Renderer2, inject } from "@angular/core";

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

