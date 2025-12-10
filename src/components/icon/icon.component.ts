import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, InputSignal, effect, inject, input } from "@angular/core";
import { ICON_DEFAULT_PREFIX_TOKEN } from "../../tokens/icon.token";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-common-types";
import { FaIconLibrary, IconDefinition } from "@fortawesome/angular-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";

/**
 * A reusable UI component for displaying icons in Angular applications.
 * Supports reactive input signals for dynamic updates.
 * @category Components
 *
 * @example
 * ```html
 * <!-- Using a static icon name -->
 * <!-- "icon" receives a string literal -->
 * <!-- "prefix" selects the FontAwesome style/weight (solid, regular, light, duotone, brands, etc. Regular, in this example) -->
 * <ogs-m3-icon
 *   icon="myIconName"
 *   prefix="far" />
 *
 * <!-- Using Angular property binding -->
 * <!-- The icon name is taken dynamically from your component (data.iconName) -->
 * <!-- Used default prefix ("fas") -->
 * <ogs-m3-icon
 *   [icon]="data.iconName" />
 * ```
 * @remarks
 * Ideal for modern Angular applications following Material Design 3 guidelines.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
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

  /**
   * The name of the icon to display.
   * A reactive input signal, required and must be provided for the component to render the icon correctly.
   */
  public readonly icon: InputSignal<IconName> = input.required<IconName>();

  /**
   * The prefix of the icon set (e.g., "fas", "far", "fab").
   * A reactive input signal should be used to specify which icon style set the component should use.
   * @defaultValue "fas"
   */
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
