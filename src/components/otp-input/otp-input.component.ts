import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from "@angular/forms";
import { KeyboardKeys } from "@ogs-gmbh/ngx-utils";
import { BehaviorSubject, Subject } from "rxjs";
import { isValueIgnored, shouldIgnoreKey } from "../../helpers/otp-input.helper";

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

  protected value: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  protected isDisabled: Subject<boolean> = new Subject<boolean>();

  protected length: number[] | null = null;

  /** Disables the otp-input component */
  @Input({ transform: booleanAttribute })
  public set disabled (value: boolean) {
    this.isDisabled.next(value);
  }

  /** Sets the current input value */
  @Input({ alias: "value" })
  public set _value (value: string | null) {
    this.value.next(value);
  }

  @ViewChildren("refsInput")
  protected refsInput!: QueryList<ElementRef<HTMLInputElement>>;

  /** Defines the number of input cells */
  @Input({ alias: "length", required: true })
  // eslint-disable-next-line @tseslint/no-shadow
  public set _length (length: number) {
    this.length = Array(length).fill(length - 1)
      .map((_: number, index: number): number => index);
  }

  /** Allowed characters for this input */
  @Input()
  public accepts: string[] | undefined;

  /** Automatically focuses the cell */
  @Input()
  public autoFocus: boolean = false;

  /** Placeholder text displayed in each empty cell */
  @Input()
  public placeholder?: string | undefined;

  /** Emitted when the component is selected or focused */
  @Output()
  public readonly select: EventEmitter<void> = new EventEmitter<void>();

  private _setValueAtIndex (index: number, char: string): void {
    if (!this.value.value) {
      this._onChangeCallback?.(char);

      return void this.value.next(char);
    }

    const currentValue: string = this.value.value;

    // eslint-disable-next-line @tseslint/no-unnecessary-condition
    if (currentValue === null)
      return;

    // eslint-disable-next-line @tseslint/typedef, @unicorn/prefer-spread
    const valueAsArray = currentValue.split("");

    valueAsArray[ index ] = char;

    const value: string = valueAsArray.join("");

    this._onChangeCallback?.(value);

    return void this.value.next(value);
  }

  private _focusToIndex (index: number): void {
    const inputElement: ElementRef<HTMLInputElement> | undefined = this.refsInput.find((_: ElementRef<HTMLInputElement>, _index: number): boolean => _index === index);

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
    this.select.emit();
    this._onTouchedCallback?.();
  }

  protected handleKeyDown (keyboardEvent: KeyboardEvent, index: number): void {
    const eventTarget: HTMLInputElement = keyboardEvent.target as HTMLInputElement;

    if (keyboardEvent.key !== KeyboardKeys.BACKSPACE) {
      if (this.accepts !== undefined && shouldIgnoreKey(this.accepts, keyboardEvent.key)) return void keyboardEvent.preventDefault();

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

  /** Restores focus to a specific cell based on the given direction (`forward`, `backward`, or `current`) */
  public restoreFocus (direction?: "forward" | "backward" | "current"): void {
    if (direction === "forward") return void this._focusToNext(this._currentInputIndex);

    if (direction === "backward") return void this._focusToPrevious(this._currentInputIndex);

    this._focusToIndex(this._currentInputIndex);
  }

  /** Sets char to the cell */
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
    this.isDisabled.next(isDisabled);
  }

  public writeValue (value: string): void {
    this.value.next(value);
  }

  /** Registers a callback to notify when validation rules change */
  public registerOnValidatorChange (callback: () => void): void {
    this._onValidatorChange = callback;
  }

  /** Validates the current value against the allowed characters */
  public validate (control: AbstractControl): ValidationErrors | null {
    // eslint-disable-next-line @tseslint/no-unsafe-assignment
    const value: string = control.value;

    return this.accepts !== undefined && isValueIgnored(this.accepts, value) ? { invalid: true } : null;
  }

  public ngAfterViewInit (): void {
    if (!this.autoFocus) return;

    this.restoreFocus();
  }
}
