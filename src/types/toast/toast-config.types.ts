import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { TOAST_INJECTION_TOKEN } from "../../tokens/toast.token";

/**
 * Describes how a toast should be rendered by providing a component,
 * a type identifier, and an optional mapping function for transforming the toast payload into component inputs.
 *
 * @category Interfaces
 * @typeParam PayloadType - The data passed when creating a toast.
 * @typeParam Key - A unique identifier used to distinguish toast kinds.
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export interface ToastRendererDef<PayloadType, Key> {
  component: unknown;
  kind: Key;
  mapInputs?(payload: PayloadType): Record<string, unknown>;
}
/**
 * Configuration for the toast system, including overlay behavior,
 * limits, default duration, and the renderer definitions for each toast type in the registry.
 *
 * @category Interfaces
 * @typeParam Registry - A map of toast kinds to their payload types.
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export interface ToastConfig<Registry extends Record<string, unknown>> {
  overlayPosition: ToastOverlayPosition;
  maxNumberOfToasts: number;
  toastDefaultDuration?: number;
  /**
   * Expects a matching component as well as a key for each property in the given type-registry
   */
  renderers: { [Key in keyof Registry]: ToastRendererDef<Registry[Key], Key> };
}
/**
 * Positioning for the Toast based on margins in each direction to the Viewport
 * @category Interfaces
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export interface ToastOverlayPosition {
  verticalPosition: TopMargin | BottomMargin;
  horizontalPosition: LeftMargin | RightMargin;
}
/**
 * Top margin definition used for viewport-based alignment. Specifies that the element is aligned
 * to the top and provides the margin value as a string.
 * @category Types
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export type TopMargin = { alignment: typeof VIEW_PORT_MARGINS.TOP; value: string; };
/**
 * Bottom margin definition used for viewport-based alignment. Specifies that the element is aligned
 * to the bottom and provides the margin value as a string.
 * @category Types
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export type BottomMargin = { alignment: typeof VIEW_PORT_MARGINS.BOTTOM; value: string; };
/**
 * Left margin definition used for viewport-based alignment. Specifies that the element is aligned
 * to the left and provides the margin value as a string.
 * @category Types
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export type LeftMargin = { alignment: typeof VIEW_PORT_MARGINS.LEFT; value: string; };
/**
 * Right margin definition used for viewport-based alignment. Specifies that the element is aligned
 * to the right and provides the margin value as a string.
 * @category Types
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export type RightMargin = { alignment: typeof VIEW_PORT_MARGINS.RIGHT; value: string; };
/**
 * Set of viewport margin identifiers used for positioning calculations.
 * @readonly
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
// eslint-disable-next-line @tseslint/typedef
export const VIEW_PORT_MARGINS = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right"
} as const;
/**
 * Factory func to provide the global toast config.
 * @category Providers
 * @param config - the toast config to provide
 * @returns an EnvironmentProviders for the toast-injection-token in the Bootstrap
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export function provideToastConfig<Registry extends Record<string, unknown>> (
  config: Readonly<ToastConfig<Registry>>
): EnvironmentProviders {
  return makeEnvironmentProviders([ {
    provide: TOAST_INJECTION_TOKEN,
    useValue: config
  } ]);
}
