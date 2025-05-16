---
outline: [2,3]
---
# useFieldEmits <Badge type="tip" text="2.0.0+"/>
> Returns an array of all events to be emitted by a field component

## Usage
```vue
<script setup>
import { useFieldEmits } from '@kevinkosterr/vue3-form-generator'
  
const emits = defineEmits(useFieldEmits())
</script>
```

## Emits

### `onInput`
Emitted when the value of a field has been changed and the change must be passed on to the `model` object in the 
schema.

### `validated`
Emitted when the field has been validated, typically done with the `validate()` from the 
[`useFieldValidate`](/guide/composables/useFieldValidate) composable. 