import { Directive, HostListener } from "@angular/core";
import { KeyboardKeys } from "@ogs-gmbh/ngx-utils";

type BypassKey = {
  ctrl?: boolean;
  name: string;
};

/**
 * Directive that restricts user input to numeric characters.
 * Non-numeric key presses are blocked unless the key is included in the
 * internal bypass list (e.g., navigation keys, shortcuts).
 * @category Directives
 *
 * @since 1.2.0
 * @author Simon Kovtyk
 */
@Directive({
  selector: "input[numberInput]",
  standalone: true
})
export class NumberInputDirective {
  private _bypassKeys: BypassKey[] = [
    {
      name: KeyboardKeys.BACKSPACE
    },
    {
      ctrl: true, name: "v"
    },
    {
      ctrl: true, name: "c"
    },
    {
      ctrl: true, name: "x"
    },
    {
      ctrl: true, name: "a"
    },
    {
      ctrl: true, name: "z"
    },
    {
      name: "ArrowRight"
    },
    {
      name: "ArrowLeft"
    },
    {
      name: "Tab"
    }
  ];

  /** Handles keydown events on the host element and prevents any key that is not a valid number and not part of the allowed bypass keys. */
  @HostListener("keydown", [ "$event" ])
  public handleInput (keyboardEvent: KeyboardEvent): void {
    let bypass: boolean = false;

    for (const bypassKey of this._bypassKeys) {
      if (bypass)
        break;

      /* eslint-disable-next-line @unicorn/prefer-ternary */
      if (bypassKey.ctrl)
        bypass = bypassKey.ctrl === keyboardEvent.ctrlKey && bypassKey.name === keyboardEvent.key;
      else
        bypass = keyboardEvent.key === bypassKey.name;
    }

    if (bypass)
      return;

    const isDataNaN: boolean = Number.isNaN(Number(keyboardEvent.key));

    if (isDataNaN)
      keyboardEvent.preventDefault();
  }
}
