---
outline: [2,3]
---
# useFieldAttributes <Badge type="tip" text="2.0.0+"/>
> Returns several computed properties that determine the attribute states of the field based on its schema

## Usage
```vue
<script setup>
import { toRefs } from 'vue'
import { useFieldAttributes, useFieldProps } from '@kevinkosterr/vue3-form-generator'

const props = defineProps(useFieldProps())

const { field, model } = toRefs(props)
  
const { isRequired, isDisabled } = useFieldAttributes(model.value, field.value)
</script>
```

## Returns

### `isRequired` <Badge type="info" text="Boolean"/>
Whether the field is required to be filled in, determined by the `required` property in the field schema. Defaults to `false`.

### `isDisabled` <Badge type="info" text="Boolean"/>
Whether the field is disabled, determined by the `disabled` property in the field schema. Defaults to `false`.

### `isReadonly` <Badge type="info" text="Boolean"/>
Whether the field is readonly, determined by the `readonly` property in the field schema. Defaults to `false`.

### `isVisible` <Badge type="info" text="Boolean"/>
Whether the field is visible, determined by the `visible` property in the field schema. Defaults to `true`.

### `hint` <Badge type="info" text="String"/>
Hint to display underneath the field, determined by the `hint` property in the field schema. Defaults to `''`. 
:::details Hints won't show up?
When using the `<script setup>` syntax you need to [expose](https://vuejs.org/api/sfc-script-setup#defineexpose) 
the `hint` variable to display hints underneath your field.
:::


