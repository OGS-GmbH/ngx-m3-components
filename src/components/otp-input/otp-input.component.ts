import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  forwardRef,
  input,
  InputSignal,
  InputSignalWithTransform,
  output,
  OutputEmitterRef,
  signal,
  Signal,
  viewChildren,
  ViewEncapsulation,
  WritableSignal
} from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from "@angular/forms";
import { KeyboardKeys } from "@ogs-gmbh/ngx-utils";
import { isValueIgnored, shouldIgnoreKey } from "../../helpers/otp-input.helper";
import { createFixedArray } from "../../helpers/array.helper";
import { MatFormField } from "@angular/material/input";

/**
 * A multi-field input component that captures user input one character at a time.
 *
 * @category Components
 * @since 1.3.0
 * @author Simon Kovtyk
 */
@Component({
  selector: "ogs-m3-otp-input",
  templateUrl: "./otp-input.component.html",
  styleUrl: "./otp-input.component.scss",
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => OtpInputComponent)
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true
    }
  ]
})
export class OtpInputComponent implements ControlValueAccessor, Validator, AfterViewInit {
  private _onChangeCallback: ((value: string) => unknown) | null = null;

  private _onTouchedCallback: (() => unknown) | null = null;

  private _onValidatorChange: (() => unknown) | null = null;

  private _currentInputIndex: number = 0;

  protected readonly createFixedArray: typeof createFixedArray = createFixedArray;

  protected readonly innerValue: WritableSignal<string | null> = signal<string | null>(null);

  protected readonly innerIsDisabled: WritableSignal<boolean> = signal(false);

  public readonly isDisabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  public readonly value: InputSignal<string | null> = input<string | null>(null);

  public readonly length: InputSignal<number> = input.required<number>();

  protected readonly refsInput: Signal<readonly ElementRef[]> = viewChildren<ElementRef>("refsInput");

  public readonly accepts: Signal<string[] | undefined> = input<string[] | undefined>()

  public readonly autoFocus: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  public readonly placeholder: InputSignal<string | undefined> = input();

  public readonly selectChange: OutputEmitterRef<void> = output();
  
  constructor() {
    effect((): void => {
      this.innerValue.set(this.value());
    });

    effect((): void => {
      this.innerIsDisabled.set(this.isDisabled());
    });
  }

  private _setValueAtIndex (index: number, char: string): void {
    const innerValue: string | null = this.innerValue();

    if (!innerValue) {
      this._onChangeCallback?.(char);

      return void this.innerValue.set(char);
    }

    // eslint-disable-next-line @tseslint/typedef, @unicorn/prefer-spread
    const valueAsArray = innerValue.split("");

    valueAsArray[ index ] = char;

    const value: string = valueAsArray.join("");

    this._onChangeCallback?.(value);

    return void this.innerValue.set(value);
  }

  private _focusToIndex (index: number): void {
    const inputElement: ElementRef<HTMLInputElement> | undefined = this.refsInput().find((_: ElementRef<HTMLInputElement>, _index: number): boolean => _index === index);

    if (inputElement === undefined) return;

    setTimeout((): void => inputElement.nativeElement.focus(), 0);
  }

  private _focusToPrevious (currentIndex: number): void {
    this._focusToIndex(currentIndex - 1);
  }

  private _focusToNext (currentIndex: number): void {
    this._focusToIndex(currentIndex + 1);
  }

  protected handleFocus (currentInputIndex: number): void {
    this._currentInputIndex = currentInputIndex;
    this.selectChange.emit();
    this._onTouchedCallback?.();
  }

  protected handleKeyDown (keyboardEvent: KeyboardEvent, index: number): void {
    const eventTarget: HTMLInputElement = keyboardEvent.target as HTMLInputElement;

    if (keyboardEvent.key !== KeyboardKeys.BACKSPACE) {
      const accepts: string[] | undefined = this.accepts();
      if (accepts !== undefined && shouldIgnoreKey(accepts, keyboardEvent.key)) return void keyboardEvent.preventDefault();

      if (eventTarget.value) eventTarget.value = keyboardEvent.key;

      this._setValueAtIndex(index, keyboardEvent.key);
      this._focusToNext(index);
      this._onValidatorChange?.();

      return;
    }

    keyboardEvent.preventDefault();

    if (eventTarget.value) {
      this._setValueAtIndex(index, "");
      eventTarget.value = "";
      this._onValidatorChange?.();

      return;
    }

    this._focusToPrevious(index);
  }

  /* eslint-disable @jsdoc/check-line-alignment */
  /**
   * Restores focus to a specific cell based on the given direction (`forward`, `backward`, or `current`)
   * 
   * @param direction -  The direction to restore focus: "forward" to the next cell, "backward" to the previous cell, or "current" to the current cell
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  /* eslint-enable @jsdoc/check-line-alignment */
  public restoreFocus (direction?: "forward" | "backward" | "current"): void {
    if (direction === "forward") return void this._focusToNext(this._currentInputIndex);

    if (direction === "backward") return void this._focusToPrevious(this._currentInputIndex);

    this._focusToIndex(this._currentInputIndex);
  }

  /**
   * Sets char to the cell
   * @param char - The character to set in the current cell
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public setChar (char: string): void {
    // eslint-disable-next-line @tseslint/no-unnecessary-condition
    if (this._currentInputIndex === null) return;

    this._setValueAtIndex(this._currentInputIndex, char);
    this._focusToNext(this._currentInputIndex);
    this._onValidatorChange?.();
  }

  public registerOnChange (callback: (value: string) => unknown): void {
    this._onChangeCallback = callback;
  }

  public registerOnTouched (callback: () => void): void {
    this._onTouchedCallback = callback;
  }

  public setDisabledState (isDisabled: boolean): void {
    this.innerIsDisabled.set(isDisabled);
  }

  public writeValue (value: string): void {
    this.innerValue.set(value);
  }

  public registerOnValidatorChange (callback: () => void): void {
    this._onValidatorChange = callback;
  }

  /**
   * Validates the current value against the allowed characters
   * @param control - The form control to validate
   * @returns An object with an `invalid` property set to `true` if the value contains invalid characters, or `null` if the value is valid
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public validate (control: AbstractControl): ValidationErrors | null {
    // eslint-disable-next-line @tseslint/no-unsafe-assignment
    const value: string = control.value;
    const accepts: string[] | undefined = this.accepts();

    return accepts !== undefined && isValueIgnored(accepts, value) ? { invalid: true } : null;
  }

  public ngAfterViewInit (): void {
    if (!this.autoFocus()) return;

    this.restoreFocus();
  }
}
