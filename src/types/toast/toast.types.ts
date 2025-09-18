// eslint-disable-next-line @tseslint/typedef
export const STATUS_TYPES = {
  NEUTRAL: "NEUTRAL",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
} as const;
export type StatusType = typeof STATUS_TYPES[keyof typeof STATUS_TYPES];
export interface BaseToast {
  ttl?: number;
  isSticky?: boolean;
  status?: StatusType;
}
export interface UntypedToast extends BaseToast {
  id?: string;
  kind: string;
  payload?: unknown;
}
export interface ToastOf<Payload, Discriminator extends keyof Payload = keyof Payload> extends BaseToast {
  id?: string;
  kind: Discriminator;
  payload: Payload;
}
// eslint-disable-next-line @tseslint/typedef
export const TOAST_DURATIONS = {
  LONG: 10_000,
  DEFAULT: 7000,
  SHORT: 5000
} as const;
export type ToastDuration = typeof TOAST_DURATIONS[keyof typeof TOAST_DURATIONS];
