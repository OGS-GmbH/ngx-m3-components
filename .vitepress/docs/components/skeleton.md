---
prev: false
next: false
---

# Skeleton

## Configuration

The Skeleton component serves as a placeholder to indicate that content is loading. It automatically fills 100% of the available width and height of its parent container. A built-in shimmer animation runs continuously to show that data is being fetched or processed.

First, you need to import [`SkeletonComponent`](/reference/Components/SkeletonComponent).

```typescript [example.ts]
import { SkeletonComponent } from "@ogs-gmbh/ngx-m3-components"; // [!code ++]

@Component({
  imports: [ // [!code ++]
    SkeletonComponent // [!code ++]
  ] // [!code ++]
})
export class ExampleComponent {} // [!code ++]
```

## Usage
```ts [example.component.ts]
import { SkeletonComponent } from "@ogs-gmbh/ngx-m3-components";

@Component({
  imports: [
    SkeletonComponent
  ],
  template: `
    <ogs-m3-skeleton />
  `
})
export class ExampleComponent {}
```
