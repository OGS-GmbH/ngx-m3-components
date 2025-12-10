/**
 *  Predefined status types for use throughout the application. These values can be used to indicate the current state of an operation, component, or process.
 * @category Types
 * @readonly
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
// eslint-disable-next-line @tseslint/typedef
export const STATUS_TYPES = {
  NEUTRAL: "NEUTRAL",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
} as const;
/**
 * Represents all possible status values defined in `STATUS_TYPES`.
 * This type can be used for variables, function parameters, or component inputs that should only accept one of the predefined status values.
 * @category Types
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export type StatusType = typeof STATUS_TYPES[keyof typeof STATUS_TYPES];
/**
 * Base configuration for a toast notification.
 * This interface defines common properties that can be used to display temporary messages or alerts in the UI.
 * @category Interfaces
 *
 * @example
 * ```ts
 * const toast: BaseToast = {
 *   ttl: 5000,                   // Display for 5 seconds
 *   isSticky: false,             // Automatically dismiss
 *   status: STATUS_TYPES.SUCCESS // Toast type/status
 * };
 * ```
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export interface BaseToast {
  ttl?: number;
  isSticky?: boolean;
  status?: StatusType;
}
/**
 * Represents a toast notification with a flexible payload and custom type.
 * Extends `BaseToast` with additional properties for identification and custom data.
 * @category Interfaces
 *
 * @example
 * ```ts
 * const toast: UntypedToast = {
 *   id: "123",
 *   kind: "customNotification",
 *   payload: { message: "Hello, world!" },
 *   ttl: 3000,
 *   isSticky: false,
 *   status: STATUS_TYPES.NEUTRAL
 * };
 * ```
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export interface UntypedToast extends BaseToast {
  id?: string;
  kind: string;
  payload?: unknown;
}
/**
 * Represents a typed toast notification with a strongly-typed payload.
 * Extends `BaseToast` and allows specifying both the payload type and a discriminating key to categorize the toast.
 *
 * @category Interfaces
 * @typeParam Payload - The type of the payload associated with the toast.
 * @typeParam Discriminator - The key of "Payload" that determines the toast kind. Defaults to all keys of "Payload".
 *
 * @since 1.2.1
 * @author Simon Kovtyk
 */
export interface ToastOf<Payload, Discriminator extends keyof Payload = keyof Payload> extends BaseToast {
  id?: string;
  kind: Discriminator;
  payload: Payload;
}
