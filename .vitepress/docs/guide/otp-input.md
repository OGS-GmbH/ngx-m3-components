# Icon-component

## 1. OTP-input Component configuration
A multi-field input component that captures user input one character at a time. To configure the OTP-input component in your project, simply place it in your template and provide the necessary inputs:

## 2. Provide
Import the module/component in your Angular application:
```typescript [example.ts]
import { OtpInputModule, OtpInputComponent } from "@ogs-gmbh/ngx-m3-components";
```

## 3. Usage
In this example, we use the keyboard functionality from the Utilities library together with the OTP-input component. You can use any keyboard implementation, or you can also use the [provided keyboard](https://ogs-gmbh.github.io/ngx-utils/guide/keyboard).

```typescript [example.ts]
import { KeyboardKeyArrays } from "@ogs-gmbh/ngx-utils";

const acceptedKeys: KeyboardKeyArrays = KeyboardKeyArrays;
```

```html [example.html]
<ogs-m3-otp-input #refPasswordInput 
                  [autoFocus]="true"
                  [length]="password.length"
                  [value]="form.get('password')?.value"
                  [accepts]="acceptedKeys.LETTERS && acceptedKeys.DIGITS" />
```
