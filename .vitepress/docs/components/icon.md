---
prev: false
next: false
---

# Icon

## Configuration

To use the Icon component in your project, simply place it inside your template and provide the icon name (and optional prefix) that your icon system requires.

Import the [`IconModule`](/reference/Modules/IconModule) in your Angular application:

```ts [example.component.ts]
import { IconModule } from "@ogs-gmbh/ngx-m3-components"; // [!code ++]

@Component({
  imports: [
    IconModule // [!code ++]
  ]
})
export const ExampleComponent {}
```

Now, you need to make sure, that your actual icon is included in your appliction bundle and doesn't get tree-shaked away by Angular's compiler. As a good reference, head to the official FortAwesome documentation about the [icon library approach](https://github.com/FortAwesome/angular-fontawesome/blob/main/docs/usage/icon-library.md).

## Usage

```ts [example.component.ts]
import { IconModule } from "@ogs-gmbh/ngx-m3-components";
import { faStar } from "@fortawesome/free-solid-svg-icons"; // [!code ++]

@Component({
  imports: [
    IconModule
  ],
  template: `
    <ogs-m3-icon icon="star" />
  `
})
export const ExampleComponent {
  library = inject(FaIconLibrary); // [!code ++]

  constructor() { [!code ++]
    this.library.addIcons(faStar); // [!code ++]
  } [!code ++]
}
```
