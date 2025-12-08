# Icon component

## 1. Icon Component configuration
To use the ogs-m3-icon component in your project, simply place it inside your template and provide the icon name (and optional prefix) that your icon system requires.

## 2. Provide
Import the module/component in your Angular application:

```typescript [example.ts]
import { IconComponent, IconModule } from '@ogs-gmbh/ngx-m3-components';
```

## 3. Usage
```html [example.html]
<!-- Using a static icon name -->
<!-- "icon" receives a string literal -->
<!-- "prefix" selects the FontAwesome style/weight (solid, regular, light, duotone, brands, etc. Regular, in this example) -->
<ogs-m3-icon
  icon="myIconName"
  prefix="far" />

<!-- Using Angular property binding -->
<!-- The icon name is taken dynamically from your component (data.iconName) -->
<!-- Used default prefix ("fas") -->
<ogs-m3-icon 
  [icon]="data.iconName" />
```
