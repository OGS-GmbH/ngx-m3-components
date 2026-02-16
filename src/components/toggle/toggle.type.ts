/**
 * Represents the change event emitted by a "ToggleComponent".
 * @category Interfaces
 * @interface
 *
 * @since 1.1.0
 * @author Simon Kovtyk
 */
export interface ToggleChange {
  name: string | undefined;
  complete(): void;
}
