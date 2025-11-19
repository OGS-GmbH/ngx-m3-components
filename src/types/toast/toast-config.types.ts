import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { TOAST_INJECTION_TOKEN } from "../../tokens/toast.token";

export interface ToastRendererDef<PayloadType, Key> {
  component: unknown;
  kind: Key;
  mapInputs?(payload: PayloadType): Record<string, unknown>;
}
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
 * Positioning for the Toast based on margins in each directions to the Viewport
 */
export interface ToastOverlayPosition {
  verticalPosition: TopMargin | BottomMargin;
  horizontalPosition: LeftMargin | RightMargin;
}
export type TopMargin = { alignment: typeof VIEW_PORT_MARGINS.TOP; value: string; };
export type BottomMargin = { alignment: typeof VIEW_PORT_MARGINS.BOTTOM; value: string; };
export type LeftMargin = { alignment: typeof VIEW_PORT_MARGINS.LEFT; value: string; };
export type RightMargin = { alignment: typeof VIEW_PORT_MARGINS.RIGHT; value: string; };
// eslint-disable-next-line @tseslint/typedef
export const VIEW_PORT_MARGINS = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right"
} as const;
/**
 * Factory func to provide the global toast config
 *
 * @param config - the toast config to provide
 * @returns an EnvironmentProviders for the toast-injection-token in the Bootstrap
 */
export function provideToastConfig<Registry extends Record<string, unknown>> (
  config: Readonly<ToastConfig<Registry>>
): EnvironmentProviders {
  return makeEnvironmentProviders([ {
    provide: TOAST_INJECTION_TOKEN,
    useValue: config
  } ]);
}

