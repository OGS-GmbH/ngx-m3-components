import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, InputSignal, effect, inject, input } from "@angular/core";
import { ICON_DEFAULT_PREFIX_TOKEN } from "../../tokens/icon.token";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-common-types";
import { FaIconLibrary, IconDefinition } from "@fortawesome/angular-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: "ogs-m3-icon",
  template: "",
  styleUrl: "./icon.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  private readonly _hostElementRef: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  private readonly _faIconLibrary: FaIconLibrary = inject(FaIconLibrary);

  private readonly _prefix: IconPrefix | null = inject(ICON_DEFAULT_PREFIX_TOKEN, { optional: true });

  public readonly icon: InputSignal<IconName> = input.required<IconName>();

  public readonly prefix: InputSignal<IconPrefix> = input<IconPrefix>(this._prefix ?? "fas");

  constructor () {
    effect((): void => {
      const iconName: IconName = this.icon();
      const definition: IconDefinition | null = this._faIconLibrary.getIconDefinition(this.prefix(), iconName);

      if (definition === null)
        throw new Error(`No Icon Definition for "${ iconName }" found. Make sure to add it to the Icon Library.`);

      // eslint-disable-next-line @tseslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @tseslint/typedef
      const renderedIcon = icon(definition, {});
      const iconElement: Element | null = renderedIcon.node.item(0);

      if (iconElement === null)
        return;

      iconElement.removeAttribute("class");
      this._hostElementRef.nativeElement.innerHTML = "";
      this._hostElementRef.nativeElement.append(iconElement);
      this._changeDetectorRef.markForCheck();
    });
  }
}
