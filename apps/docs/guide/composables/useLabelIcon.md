---
outline: [2,3]
---
# useLabelIcon <Badge type="tip" text=">=2.7.0" />
> Determines which icon to display and the position to display it in

## Usage
```vue
<script setup>
import { useLabelIcon } from '@kevinkosterr/vue3-form-generator'
  
const { labelIcon, labelIconPosition } = useLabelIcon(props.field.labelIcon)
</script>
```

## Arguments
### `iconDefinition` <Badge type="info" text="string | ComponentPublicInstance | LabelIconDefinition" />
::: details LabelIconDefinition type
```ts
type LabelIconDefinition = {
  icon: string | ComponentPublicInstance;
  position: 'left' | 'right';
}
```
:::
Either a string webfont class, a component or `LabelIconDefinition`.

## Returns

### `labelIcon` <Badge type="info" text="ComputedRef<string | ComponentPublicInstance | null>" />
Either the icon class or icon component as determined by the `labelIcon` property of a field schema. 

### `labelIconPosition` <Badge type="info" text="ComputedRef<'left' | 'right' | null>" />
Position of the label, defaults to `left`.
