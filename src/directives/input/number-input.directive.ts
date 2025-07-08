import { Directive, HostListener } from "@angular/core";
import { KeyboardKeys } from "@ogs-gmbh/ngx-utils";

@Directive({
  selector: "input[numberInput]",
  standalone: true
})
export class NumberInputDirective {
  private _bypassKeys: string[] = [ KeyboardKeys.BACKSPACE ];

  @HostListener("keydown", [ "$event" ])
  public handleInput (keyboardEvent: KeyboardEvent): void {
    if (this._bypassKeys.includes(keyboardEvent.key))
      return;

    const isDataNaN: boolean = Number.isNaN(Number(keyboardEvent.key));

    if (isDataNaN)
      keyboardEvent.preventDefault();
  }
}
