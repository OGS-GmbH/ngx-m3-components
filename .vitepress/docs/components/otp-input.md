---
prev: false
next: false
---

# One-time-password input

## Configuration

A multi-field input component that captures user input one character at a time. To configure the OTP-input component in your project, simply import [`OtpInputModule`](/reference/Modules/OtpInputModule) or [`OtpInputComponent`](/reference/Components/OtpInputComponent).

```ts [example.component.ts]
import { OtpInputModule } from "@ogs-gmbh/ngx-m3-components"; // [!code ++]

@NgModule({
  imports: [
    OtpInputModule // [!code ++]
  ]
})
export class ExampleComponent {}
```

## Usage

In this example, we use [`KeyboardKeyArrays`](https://ogs-gmbh.github.io/ngx-utils/reference/Keyboard/KeyboardKeyArrays) from [`ngx-utils`](https://ogs-gmbh.github.io/ngx-utils/) together with the OTP-input component.

```ts [example.component.ts]
import { OtpInputModule } from "@ogs-gmbh/ngx-m3-components";
import { KeyboardKeyArrays } from "@ogs-gmbh/ngx-utils"; // [!code ++]

@NgModule({
  imports: [
    OtpInputModule
  ],
  template: `
    <ogs-m3-otp-input
      autoFocus
      [length]="password.length"
      [accepts]="acceptedKeys.LETTERS && acceptedKeys.DIGITS"
    />
  `
})
export class ExampleComponent {
  acceptedKeys = KeyboardKeyArrays.DIGITS; // [!code ++]
}
```
