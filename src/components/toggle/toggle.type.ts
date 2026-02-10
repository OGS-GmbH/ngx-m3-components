/**
 * Represents the delegate information emitted by a "ToggleComponent".
 * @category Interfaces
 * @interface
 *
 * @since 1.1.0
 * @author Simon Kovtyk
 */
export interface ToggleDelegate {
  name: string | undefined;
  complete(): void;
}
